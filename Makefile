# Everything will be generated from this.
SOURCE ?= jquery.transit.js

# Where the SOURCE will be compressed to.
MINIFIED ?= jquery.transit.min.js

# The version string (eg, "v0.9.9") -- used for building distributions
VERSION := $(shell cat ${SOURCE} | grep version: | sed "s/.*\"\(.*\)\".*/\1/")

STATUS := @echo "\n\033[32m->\033[0m"

all: annotate minify

# Annotations
# -----------

annotate: source/index.html

source/index.html: ${SOURCE}
	${STATUS} Generating annotated source...
	rm -rf source
	npm install
	./node_modules/.bin/docco $< > /dev/null
	mv docs source
	mv source/*.html source/index.html

# JS minification
# ---------------

minify: \
	${MINIFIED}

${MINIFIED}: ${SOURCE}
	${STATUS} Minifying...
	@rm -f $@
	npm install
	./node_modules/.bin/uglifyjs -m < $< > $@
	chmod a-w $@

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
