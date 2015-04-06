## v0.9.12 - July 17, 2014

 * Fix browserify builds by using the correct jQuery. ([@dminkovsky], [#201])
 * Fix properties resetting after a transition. ([#204], [#205])

## v0.9.11 - June 23, 2014

 * Add support for `scaleX` and `scaleY`. ([@YousefED], [#192])
 * Add support for npm.
 * Add support for RequireJS and CommonJS.
 * Fix transitionend support for IE10, Chrome, and many others. ([@wambotron], [#103])

Also:

 * Fix `.transition({...}, {queue: false})` not being honored. ([@YousefED], [#192])
 * Remove some redundant code. ([@Bongo], [#165])
 * Docs: Update to support the new docco. ([@francismakes], [#175])
 * Add `easeInCubic` easing. ([@emagnier], [@willblackmore], [#161], [#142])
 * Add test cases for jQuery 2.0+. ([@hankhero], [#155])

The version `0.9.10` was not officially released as it was published prematurely
to npm.

## v0.9.9 - Dec 14, 2012

Many, many thanks to the many [contributors] who made this release happen! This 
is a pre-release of 1.0.

### Fixes and additions:

  * Fix support for jQuery 1.8, IE 10, Firefox 16, Android Jellybean.
  ([#48], [#62], [#63], [#69], [#70], [#71], [#72], [#76], [#77], [#80], [#81], [#82], [#85], [#86], [#90], [#92], [#93])
  * Compatibility with Twitter Bootstrap has been fixed. ([#67])
  * Unprefixed CSS properties are now used if your browser supports them.
  * Account for prefix-free transition end for Mozilla. ([#97])
  * Callbacks should now be called even if duration is `0`. ([#37])
  * Doing `.css('transition', 'transform 1s')` should now properly vendor-prefix 'transform'. ([#84])
  * Added Penner easing splines. ([#44])

### Internal fixes:

  * New test suite.
  * In building the website, use `fl-rocco` instead of `docco`. This removes the dependency. ([#50])

## v0.1.3 - Feb 14, 2012

### Fixed:
  * Fix JS error with undefined `next` function. ([#21])
  * Using `delay: 0` now works. Closes ([#20])
  * More robust checking of 3D transition support. ([#19])
  * Stop rotateX/rotateY/etc from stopping other transitions when it's not
    supported.  ([#15])

### Added:
  * Support Firefox 10 3D transitions. ([#19])

### Changed:
  * Allow disabling using the transitionEnd property.
  (`$.transit.useTransitionEnd = true`)
  * Use the more reliable timers by default. (`useTransitionEnd` now defaults to
      `false`)

## v0.1.2 - Jan 24, 2012

Thanks to code contributors [@ppcano], [@jeduan], [@steckel], [@weotch], and everyone 
who reported issues.

### Fixed:
  * IE8 error about .indexOf. ([#12], [#8])
  * Fix z-layer scaling in Safari. ([#9], [#10])
  * Fix scale elements being unclickable in WebKits. ([#9], [#10])
  * Fix support for `queue: false`. ([#13])
  * Clean up transitions when done. ([#14])
  * Fix disappearing scaled elements in Chrome. ([#11])
  * Fix a bug where the default duration and easing can sometimes not be used.

### Changed:
  * Make code compatible with jsHint. ([#6])

## v0.1.1 - Nov 18, 2011

### Fixed:
  * Only animate what is needed (ie, don't use 'transition-property: all').

## v0.1.0 - Nov 14, 2011

Initial official release.

[contributors]: https://github.com/rstacruz/jquery.transit/contributors

[#201]: https://github.com/rstarcuz/jquery.transit/issues/201
[@dminkovsky]: https://github.com/dminkovsky

[#204]: https://github.com/rstacruz/jquery.transit/issues/204
[#205]: https://github.com/rstacruz/jquery.transit/issues/205
[#192]: https://github.com/rstacruz/jquery.transit/issues/192
[#103]: https://github.com/rstacruz/jquery.transit/issues/103
[#192]: https://github.com/rstacruz/jquery.transit/issues/192
[#165]: https://github.com/rstacruz/jquery.transit/issues/165
[#175]: https://github.com/rstacruz/jquery.transit/issues/175
[#161]: https://github.com/rstacruz/jquery.transit/issues/161
[#142]: https://github.com/rstacruz/jquery.transit/issues/142
[#155]: https://github.com/rstacruz/jquery.transit/issues/155
[#48]: https://github.com/rstacruz/jquery.transit/issues/48
[#62]: https://github.com/rstacruz/jquery.transit/issues/62
[#63]: https://github.com/rstacruz/jquery.transit/issues/63
[#69]: https://github.com/rstacruz/jquery.transit/issues/69
[#70]: https://github.com/rstacruz/jquery.transit/issues/70
[#71]: https://github.com/rstacruz/jquery.transit/issues/71
[#72]: https://github.com/rstacruz/jquery.transit/issues/72
[#76]: https://github.com/rstacruz/jquery.transit/issues/76
[#77]: https://github.com/rstacruz/jquery.transit/issues/77
[#80]: https://github.com/rstacruz/jquery.transit/issues/80
[#81]: https://github.com/rstacruz/jquery.transit/issues/81
[#82]: https://github.com/rstacruz/jquery.transit/issues/82
[#85]: https://github.com/rstacruz/jquery.transit/issues/85
[#86]: https://github.com/rstacruz/jquery.transit/issues/86
[#90]: https://github.com/rstacruz/jquery.transit/issues/90
[#92]: https://github.com/rstacruz/jquery.transit/issues/92
[#93]: https://github.com/rstacruz/jquery.transit/issues/93
[#67]: https://github.com/rstacruz/jquery.transit/issues/67
[#97]: https://github.com/rstacruz/jquery.transit/issues/97
[#37]: https://github.com/rstacruz/jquery.transit/issues/37
[#84]: https://github.com/rstacruz/jquery.transit/issues/84
[#44]: https://github.com/rstacruz/jquery.transit/issues/44
[#50]: https://github.com/rstacruz/jquery.transit/issues/50
[#21]: https://github.com/rstacruz/jquery.transit/issues/21
[#20]: https://github.com/rstacruz/jquery.transit/issues/20
[#19]: https://github.com/rstacruz/jquery.transit/issues/19
[#15]: https://github.com/rstacruz/jquery.transit/issues/15
[#19]: https://github.com/rstacruz/jquery.transit/issues/19
[#12]: https://github.com/rstacruz/jquery.transit/issues/12
[#8]: https://github.com/rstacruz/jquery.transit/issues/8
[#9]: https://github.com/rstacruz/jquery.transit/issues/9
[#10]: https://github.com/rstacruz/jquery.transit/issues/10
[#9]: https://github.com/rstacruz/jquery.transit/issues/9
[#10]: https://github.com/rstacruz/jquery.transit/issues/10
[#13]: https://github.com/rstacruz/jquery.transit/issues/13
[#14]: https://github.com/rstacruz/jquery.transit/issues/14
[#11]: https://github.com/rstacruz/jquery.transit/issues/11
[#6]: https://github.com/rstacruz/jquery.transit/issues/6
[@YousefED]: https://github.com/YousefED
[@wambotron]: https://github.com/wambotron
[@YousefED]: https://github.com/YousefED
[@Bongo]: https://github.com/Bongo
[@francismakes]: https://github.com/francismakes
[@emagnier]: https://github.com/emagnier
[@willblackmore]: https://github.com/willblackmore
[@hankhero]: https://github.com/hankhero
[@ppcano]: https://github.com/ppcano
[@jeduan]: https://github.com/jeduan
[@steckel]: https://github.com/steckel
[@weotch]: https://github.com/weotch
