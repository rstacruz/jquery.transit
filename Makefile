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
	@echo "==> Generating annotated source..."
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
	@echo "==> Minifying..."
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
	@echo "==> Updating distribution for v${VERSION}..."
	cp $< $@
	chmod a-w $@

dist/jquery.transit-${VERSION}.min.js: ${MINIFIED}
	cp $< $@
	chmod a-w $@

# -----
# Clean
# -----

clean:
	@echo "==> Cleaning built files..."
	rm -rf ${MINIFIED} source/

# -----

# If the site is cloned as a subdirectory of the main repo, we can just
# assume the main file is there, and fish it out with `make update`

update:
	@echo "==> Updating ${SOURCE}..."
	cp ../jquery.transit.js ${SOURCE}

# -----

.PHONY: minify source all clean dist update
