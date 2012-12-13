# [jQuery Transit](http://ricostacruz.com/jquery.transit)
#### Super-smooth CSS3 transformations and transitions for jQuery

jQuery Transit is a plugin for to help you do CSS transformations and 
transitions in jQuery.

Refer to the [jQuery Transit website](http://ricostacruz.com/jquery.transit) for 
examples.

Usage
-----

Just include this script after jQuery. Requires jQuery 1.4+.

``` html
<script src='jquery.js'></script>
<script src='jquery.transit.js'></script>
```

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

__[Move.js](https://github.com/visionmedia/move.js)__ (recommended!)

 * Pros: no jQuery dependency, great syntax.
 * Cons (at time of writing): no iOS support (doesn't use `translate3d`), some
   IE bugs, no 3D transforms, no animation queue.

__[jQuery animate 
enhanced](https://github.com/benbarnett/jQuery-Animate-Enhanced)__

* Pros: transparently overrides `$.fn.animate()` to provide CSS transitions 
  support.
* Cons: transpalently overrides `$.fn.animate()`. No transformations support.

__[jQuery 2D transformations](https://github.com/heygrady/transform/)__

* Pros: Tons of transformations.
* Cons: No CSS transition support; animates via `fx.step`.

__[jQuery CSS3 rotate](http://plugins.jquery.com/project/Rotate)__

* Pros: simply provides rotation.
* Cons: simply provides rotation. No transitions support.

Acknowledgements
----------------

© 2011, Rico Sta. Cruz. Released under the [MIT 
License](http://www.opensource.org/licenses/mit-license.php).

jQuery Transit is authored and maintained by [Rico Sta. Cruz][rsc] with help 
from it's [contributors][c]. It is sponsored by my startup, [Sinefunc, Inc][sf].

 * [My website](http://ricostacruz.com) (ricostacruz.com)
 * [Sinefunc, Inc.](http://sinefunc.com) (sinefunc.com)
 * [Github](http://github.com/rstacruz) (@rstacruz)
 * [Twitter](http://twitter.com/rstacruz) (@rstacruz)

[rsc]: http://ricostacruz.com
[c]:   http://github.com/rstacruz/jquery.transit/contributors
[sf]:  http://sinefunc.com
