# [jQuery Transit](http://ricostacruz.com/jquery.transit)
#### Super-smooth CSS3 transformations and transitions for jQuery

jQuery Transit is a plugin for to help you do CSS transformations and 
transitions in jQuery.

Refer to the [website](http://ricostacruz.com/jquery.transit) for full 
reference.

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
$("#box").css({ scale: 2 });                // Scale up 2x (200%)
$("#box").css({ x: '30px' });               // Move right 30px
$("#box").css({ x: 30 });
$("#box").css({ y: '60px' });               // Move down 30px
$("#box").css({ y: 60 });
$("#box").css({ translate: '60px,30px' });  // Move right 60px, and down 30px
$("#box").css({ rotate: '30deg' });         // Rotate 30 degrees clockwise
$("#box").css({ rotate: 30 });
$("#box").css({ skewX: '30deg' });          // Skew horizontally by 30 degrees
$("#box").css({ skewX: 30 });
```

Animating
---------

You can animate with CSS3 transitions using `$.fn.transition()`. It works 
exactly like `$.fn.animate()`, except it uses CSS3 transitions.

``` javascript
$("#box").transition({ opacity: 0.1, scale: 0.3 });
```

You can provide duration, and easing.

``` javascript
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500);
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 'fast');
```

You can provide easing as `in`, `out`, `linear`, `snap` or anything else 
supported by CSS3.

``` javascript
// With duration and easing
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
```

You can provide a callback to be executed after.

``` javascript
// With callback
$("#box").transition({ opacity: 0.1, scale: 0.3 }, function() {
  /* ... */
});

// With everything
$("#box").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() {
  /* ... */
});
```
