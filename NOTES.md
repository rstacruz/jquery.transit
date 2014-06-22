Developer notes
===============

Testing:

    open test/index.html

Making a new release:

    vim HISTORY.md       # update changelog
    bump *.json *.js     # update version number
    npm publish          # release to npm
    git release v1.0.0   # release to github/bower

v1.0.0 to do
------------

 * .transitionStop()
 * use transitionend by default (#184)
 * Update bootstrap compatibility (#143, #67)
