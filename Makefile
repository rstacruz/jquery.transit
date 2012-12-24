# Everything will be generated from this.
SOURCE ?= dist/jquery.transit.js

# Where the SOURCE will be compressed to.
MINIFIED ?= dist/jquery.transit.min.js

# The version string (eg, "v0.9.9") -- used for building distributions
VERSION := $(shell cat ${SOURCE} | grep version: | sed "s/.*\"\(.*\)\".*/\1/")

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
	mkdir -p source/
	rocco $< > /dev/null
	mv dist/jquery.transit.html $@

# ---------------
# JS minification
# ---------------

minify: \
	${MINIFIED}

${MINIFIED}: ${SOURCE}
	@which yuicompressor >/dev/null || (echo " ! Error: You need YUI compressor to minify .css files. Try: 'gem install yui-compressor'" && exit 1)
	@rm -f $@
	yuicompressor $< > $@
	chmod a-w $@

# ------------------------------
# Creating distribution versions
# ------------------------------

dist: \
	dist/jquery.transit-${VERSION}.js \
	dist/jquery.transit-${VERSION}.min.js

dist/jquery.transit-${VERSION}.js: ${SOURCE}
	cp $< $@
	chmod a-w $@

dist/jquery.transit-${VERSION}.min.js: ${MINIFIED}
	cp $< $@
	chmod a-w $@

# -----
# Clean
# -----

clean:
	rm -rf ${MINIFIED} source/

# -----

.PHONY: minify source all clean dist
