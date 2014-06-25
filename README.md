# [jQuery Transit](http://ricostacruz.com/jquery.transit)
#### Super-smooth CSS3 transformations and transitions for jQuery

jQuery Transit is a plugin for to help you do CSS transformations and 
transitions in jQuery.

Refer to the [jQuery Transit website](http://ricostacruz.com/jquery.transit) for 
examples.

Usage
-----

Just include [jquery.transit.js] after jQuery. Requires jQuery 1.4+.

``` html
<script src='jquery.js'></script>
<script src='jquery.transit.js'></script>
```

It is also available via [bower] and [npm].

    $ bower install --save jquery.transit
    $ npm install --save jquery.transit

[bower]: http://bower.io/search/?q=jquery.transit
[npm]: http://npmjs.org/package/jquery.transit
[jquery.transit.js]: https://github.com/rstacruz/jquery.transit/blob/master/jquery.transit.js

Transformations
---------------

You can set transformations as you would any CSS property in jQuery.
(Note that you cannot `$.fn.animate()` them, only set them.)

``` javascript
$("#box").css({ x: '30px' });               // Move right
$("#box").css({ y: '60px' });               // Move down
$("#box").css({ translate: [60,30] });      // Move right and down
$("#box").css({ rotate: '30deg' });         // Rotate clockwise
$("#box").css({ scale: 2 });                // Scale up 2x (200%)
$("#box").css({ scale: [2, 1.5] });         // Scale horiz and vertical
$("#box").css({ skewX: '30deg' });          // Skew horizontally
$("#box").css({ skewY: '30deg' });          // Skew vertical
$("#box").css({ perspective: 100, rotateX: 30 }); // Webkit 3d rotation
$("#box").css({ rotateY: 30 });
$("#box").css({ rotate3d: [1, 1, 0, 45] });
```

Relative values are supported.

``` javascript
$("#box").css({ rotate: '+=30' });          // 30 degrees more
$("#box").css({ rotate: '-=30' });          // 30 degrees less
```

All units are optional.

``` javascript
$("#box").css({ x: '30px' });
$("#box").css({ x: 30 });
```

Multiple arguments can be commas or an array.

``` javascript
$("#box").css({ translate: [60,30] });
$("#box").css({ translate: ['60px','30px'] });
$("#box").css({ translate: '60px,30px' });
```

Getters are supported. (Getting properties with multiple arguments returns
arrays.)

``` javascript
$("#box").css('rotate');     //=> "30deg"
$("#box").css('translate');  //=> ['60px', '30px']
```

Animating - `$.fn.transition`
-----------------------------

    $('...').transition(options, [duration], [easing], [complete])

You can animate with CSS3 transitions using `$.fn.transition()`. It works 
exactly like `$.fn.animate()`, except it uses CSS3 transitions.

``` javascript
$("#box").transition({ opacity: 0.1, scale: 0.3 });
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500);                         // duration
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 'fast');                      // easing
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');                   // duration+easing
$("#box").transition({ opacity: 0.1, scale: 0.3 }, function() {..});             // callback
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() {..});  // everything
```

You can also pass *duration* and *easing* and *complete* as values in `options`, just like in `$.fn.animate()`.

``` javascript
$("#box").transition({
  opacity: 0.1, scale: 0.3,
  duration: 500,
  easing: 'in',
  complete: function() { /* ... */ }
});
```

Tests
-----

Transit has a unique test suite. Open `test/index.html` to see it. When 
contibuting fixes, be sure to test this out with different jQuery versions and 
different browsers.

Alternatives
------------

__[Velocity.js](https://velocityjs.org)__ (recommended!)

 * Pros: optimized for situations with hundreds of simultaneous transitions. Lots of extra features.

__[Move.js](https://github.com/visionmedia/move.js)__

 * Pros: no jQuery dependency, great syntax.
 * Cons (at time of writing): no iOS support (doesn't use `translate3d`), some
   IE bugs, no 3D transforms, no animation queue.

__[jQuery animate 
enhanced](https://github.com/benbarnett/jQuery-Animate-Enhanced)__

* Pros: transparently overrides `$.fn.animate()` to provide CSS transitions 
  support.
* Cons: transparently overrides `$.fn.animate()`. No transformations support.

__[jQuery 2D transformations](https://github.com/heygrady/transform/)__

* Pros: Tons of transformations.
* Cons: No CSS transition support; animates via `fx.step`.

__[jQuery CSS3 rotate](http://plugins.jquery.com/project/Rotate)__

* Pros: simply provides rotation.
* Cons: simply provides rotation. No transitions support.

Support
-------

__Bugs and requests__: submit them through the project's issues tracker.<br>
[![Issues](http://img.shields.io/github/issues/rstacruz/jquery.transit.svg)]( https://github.com/rstacruz/jquery.transit/issues )

__Questions__: ask them at StackOverflow with the tag *jquery-transit*.<br>
[![StackOverflow](http://img.shields.io/badge/stackoverflow-jquery--transit-brightgreen.svg)]( http://stackoverflow.com/questions/tagged/jquery-transit )

__Chat__: join us at gitter.im.<br>
[![Chat](http://img.shields.io/badge/gitter-rstacruz / jquery.transit-brightgreen.svg)]( https://gitter.im/rstacruz/jquery.transit )

Thanks
------

**jQuery Transit** © 2011-2014+, Rico Sta. Cruz. Released under the [MIT License].<br>
Authored and maintained by Rico Sta. Cruz with help from [contributors].

> [ricostacruz.com](http://ricostacruz.com) &nbsp;&middot;&nbsp;
> GitHub [@rstacruz](https://github.com/rstacruz) &nbsp;&middot;&nbsp;
> Twitter [@rstacruz](https://twitter.com/rstacruz)

[MIT License]: http://mit-license.org/
[contributors]: http://github.com/rstacruz/jquery.transit/contributors

[![npm version](https://img.shields.io/npm/v/jquery.transit.png)](https://npmjs.org/package/jquery.transit "View this project on npm")
