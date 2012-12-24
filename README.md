Setup
-----

It's advised that you clone the site into `site/` of the main repo;

``` bash
$ git clone git://github.com/rstacruz/jquery.transit.git site/ -b gh-pages
```

Updating Transit
----------------

Releasing a new version? Assuming the site is checked out into `site/` of the 
main repo, you can do this to update to a new version in one go:

``` bash
# Fetch an updated version from ../ and do the stuff below.
$ make update dist
```

### More _make_ stuff

Manually change `dist/jquery.transit.js`, then you can do the following GNU make 
things:

``` bash
# Updates corresponding files (annotations, compressed version)
# from jquery.transit.js.
$ make all

# Does above, and creates jquery.transit-x.x.x.js files.
# Use this when you release a new version.
$ make dist
```

Live preview server
-------------------

To preview the site while you're working on it:

``` bash
$ python -m SimpleHTTPServer
```

Deploying
---------

    $ git push
