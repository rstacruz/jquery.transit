# Everything will be generated from this.
SOURCE ?= jquery.transit.js

# Where the SOURCE will be compressed to.
MINIFIED ?= jquery.transit.min.js

# The version string (eg, "v0.9.9") -- used for building distributions
VERSION := $(shell cat ${SOURCE} | grep version: | sed "s/.*\"\(.*\)\".*/\1/")

STATUS := @echo "\n\033[32m---->\033[0m"

# -------
# Default
# -------

all: \
	source minify

# --------------------
# Annotation via Rocco
# --------------------

source: \
	source/index.html

source/index.html: ${SOURCE}
	@which rocco >/dev/null || (echo " ! Error: You need Rocco to build an annotated source document. Try: 'gem install fl-rocco'" && exit 1)
	${STATUS} Generating annotated source...
	mkdir -p source/
	rocco $< > /dev/null
	mv $(patsubst %.js, %.html, $<) $@

# ---------------
# JS minification
# ---------------

minify: \
	${MINIFIED}

${MINIFIED}: ${SOURCE}
	@which yuicompressor >/dev/null || (echo " ! Error: You need YUI compressor to minify .css files. Try: 'gem install yui-compressor'" && exit 1)
	${STATUS} Minifying...
	@rm -f $@
	yuicompressor $< > $@
	chmod a-w $@

# ------------------------------
# Creating distribution versions
# ------------------------------

dist: \
	source minify \
	dist/jquery.transit-${VERSION}.js \
	dist/jquery.transit-${VERSION}.min.js

dist/jquery.transit-${VERSION}.js: ${SOURCE}
	${STATUS} Updating distribution for v${VERSION}...
	cp $< $@
	chmod a-w $@

dist/jquery.transit-${VERSION}.min.js: ${MINIFIED}
	cp $< $@
	chmod a-w $@

# -----
# Clean
# -----

clean:
	${STATUS} Cleaning built files...
	rm -rf ${MINIFIED} source/

# -----

# If the site is cloned as a subdirectory of the main repo, we can just
# assume the main file is there, and fish it out with `make update`

update:
	${STATUS} Updating from main repo...
	cp ../jquery.transit.js ${SOURCE}

	${STATUS} Updating tests...
	rm -rf test/
	cp -R ../test/ ./test/

cachebust:
	perl -p -i -e "s/\?v=[0-9]+/?v=`echo $$RANDOM`/" index.html

# -----

.PHONY: minify source all clean dist update cachebust
