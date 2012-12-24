VERSION := $(shell cat dist/jquery.transit.js | grep version: | sed "s/.*\"\(.*\)\".*/\1/")

all: source minify

# Aliases
# -------

minify: dist/jquery.transit.min.js

source: source/index.html

dist: \
	dist/jquery.transit-${VERSION}.js \
	dist/jquery.transit-${VERSION}.min.js

# Routines
# --------

source/index.html: dist/jquery.transit.js
	@which rocco >/dev/null || (echo " ! Error: You need Rocco to build an annotated source document. Try: 'gem install fl-rocco'" && exit 1)
	mkdir -p source/
	rocco $< > /dev/null
	mv dist/jquery.transit.html $@

dist/jquery.transit.min.js: dist/jquery.transit.js
	@which yuicompressor >/dev/null || (echo " ! Error: You need YUI compressor to minify .css files. Try: 'gem install yui-compressor'" && exit 1)
	@rm -f $@
	yuicompressor $< > $@
	chmod a-w $@

dist/jquery.transit-${VERSION}.js: dist/jquery.transit.js
	cp $< $@
	chmod a-w $@

dist/jquery.transit-${VERSION}.min.js: dist/jquery.transit.min.js
	cp $< $@
	chmod a-w $@

# Clean
# -----

clean:
	rm -rf dist/jquery.transit.min.js source/

# -----

.PHONY: minify source all clean dist
