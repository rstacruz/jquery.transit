Updating Transit
----------------

Pag naka-clone yung `gh-pages` sa loob ng working dir ng main repo, pwede rin 
to:

    # Fetch an updated version from ../ and do the stuff above
    $ make update all dist

### Advanced

Manually change `dist/jquery.transit.js`, then you can do the following GNU make 
things:

    # Updates corresponding files (annotations, compressed version)
    # from jquery.transit.js.
    $ make

    # Creates jquery.transit-x.x.x.js files.
    # Use this when you release a new version.
    $ make dist

