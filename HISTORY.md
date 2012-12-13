v1.0.0 - Dec 14, 2012
---------------------

Many, many thanks to the many [contributors] who made this release happen!

### Fixes:

  * Fix support for jQuery 1.8, IE 10, Firefox 16. (#93, #82, #85, #81, #76, #77, #70, #92)
  * Unprefixed CSS properties are now used if your browser supports them.
  * Account for prefix-free transition end for Mozilla. (#97)
  * Callbacks should now be called even if duration is `0`. (#37)

### Internal fixes:

  * New test suite.
  * In building the website, use `fl-rocco` instead of `docco`. This removes the dependency. (#50)

v0.1.3 - Feb 14, 2012
---------------------

### Fixed:
  * Fix JS error with undefined `next` function. (#21)
  * Using `delay: 0` now works. Closes (#20)
  * More robust checking of 3D transition support. (#19)
  * Stop rotateX/rotateY/etc from stopping other transitions when it's not
    supported.  (#15)

### Added:
  * Support Firefox 10 3D transitions. (#19)

### Changed:
  * Allow disabling using the transitionEnd property.
  (`$.transit.useTransitionEnd = true`)
  * Use the more reliable timers by default. (`useTransitionEnd` now defaults to
      `false`)

v0.1.2 - Jan 24, 2012
---------------------

Thanks to code contributors @ppcano, @jeduan, @steckel, @weotch, and everyone 
who reported issues.

### Fixed:
  * IE8 error about .indexOf. (#12, #8)
  * Fix z-layer scaling in Safari. (#9, #10)
  * Fix scale elements being unclickable in WebKits. (#9, #10)
  * Fix support for `queue: false`. (#13)
  * Clean up transitions when done. (#14)
  * Fix disappearing scaled elements in Chrome. (#11)
  * Fix a bug where the default duration and easing can sometimes not be used.

### Changed:
  * Make code compatible with jsHint. (#6)

v0.1.1 - Nov 18, 2011
---------------------

### Fixed:
  * Only animate what is needed (ie, don't use 'transition-property: all').

v0.1.0 - Nov 14, 2011
---------------------

Initial official release.

[contributors]: https://github.com/rstacruz/jquery.transit/contributors
