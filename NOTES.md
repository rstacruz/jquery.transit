Developer notes
===============

Testing:

    open test/index.html

Making a new release:

    vim HISTORY.md       # update changelog
    bump *.json *.js     # update version number
    npm publish          # release to npm
    git release v1.0.0   # release to github/bower

Managing the site
-----------------

Make `site/`:

    git clone git@github.com:rstacruz/jquery.transit.git -b gh-pages ./site

Update:

    cd site
    make update   # update from files
    make          # update the site
    make dist     # make dist/ files (uh, should be deprecated)

v1.0.0 to do
------------

 * .transitionStop()
 * use transitionend by default (#184)
 * Update bootstrap compatibility (#143, #67)
 * Redesign the site
