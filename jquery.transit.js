/*!
 * jQuery Transit - CSS3 transitions and transformations
 * Copyright(c) 2011 Rico Sta. Cruz <rico@ricostacruz.com>
 * MIT Licensed.
 *
 * http://ricostacruz.com/jquery.transit
 * http://github.com/rstacruz/jquery.transit
 */

(function($) {
  // ## $.cssEase
  // List of easing aliases that you can use with `$.fn.transition`.
  $.cssEase = {
    'in':     'ease-in',
    'out':    'ease-out',
    'in-out': 'ease-in-out',
    'snap':   'cubic-bezier(0,1,.5,1)'
  };

  // ## 'transform' CSS hook
  // Allows you to use the `transform` property in CSS.
  // 
  //     $("#hello").css({ transform: "rotate(90deg)" });
  //
  //     $("#hello").css('transform');
  //     //=> { rotate: '90deg' }
  //
  $.cssHooks.transform = {
    // The getter returns a `Transform` object.
    get: function(elem) {
      return $(elem).data('transform');
    },

    // The setter accepts a `Transform` object or a string.
    set: function(elem, value) {
      var transform = value;
      if (transform.__proto__ != Transform.prototype)
        transform = new Transform(transform);

      var str = transform.toString();
      elem.style[     'OTransform'] = str;
      elem.style[    'msTransform'] = str;
      elem.style[   'MozTransform'] = str;
      elem.style['webkitTransform'] = transform.toWebkitString();
      elem.style[      'transform'] = str;

      $(elem).data('transform', transform);
    }
  };

  // ## Other CSS hooks
  // Allows you to rotate, scale and translate.
  registerCssHook('scale');
  registerCssHook('translate');
  registerCssHook('rotate');
  registerCssHook('perspective');
  registerCssHook('skewX');
  registerCssHook('skewY');
  registerCssHook('x', true);
  registerCssHook('y', true);

  // ## Transform class
  // This is the main class of a transformation property that powers
  // `$.fn.css({ transform: '...' })`.
  //
  // This is, in essence, a dictionary object with key/values as `-transform`
  // properties.
  //
  //     var t = new Transform("rotate(90) scale(4)");
  //
  //     t.rotate             //=> "90deg"
  //     t.scale              //=> "4,4"
  //
  // Setters are accounted for.
  //
  //     t.set('rotate', 4)
  //     t.rotate             //=> "4deg"
  //
  // Convert it to a CSS string using the `toString()` and `toWebkitString()`
  // functions.
  //
  //     t.toString()         //=> "rotate(90deg) scale(4,4)"
  //     t.toWebkitString()   //=> "rotate(90deg) scale3d(4,4,0)"
  //
  function Transform(str) {
    if (typeof str === 'string') this.parse(str);
    return this;
  };

  Transform.prototype = {
    // ### setFromString()
    // Sets a property from a string.
    //
    //     t.setFromString('scale', '2,4');
    //     // Same as set('scale', '2', '4');
    //
    setFromString: function(prop, val) {
      var args = (typeof val === 'string') ? val.split(',') : [val];
      args.unshift(prop);

      this.__proto__.set.apply(this, args);
    },

    // ### set()
    // Sets a property.
    //
    //     t.set('scale', 2, 4);
    //
    set: function(prop) {
      var args = Array.prototype.slice.apply(arguments, [1]);
      if (this.setter[prop]) {
        this.setter[prop].apply(this, args);
      } else {
        this[prop] = args.join(',');
      }
    },

    setter: {
      // ### rotate
      //
      //     .css({ rotate: 30 })
      //     .css({ rotate: "30" })
      //     .css({ rotate: "30deg" })
      //
      rotate: function(v) {
        var val = unit(v, 'deg');

        this.rotate = val;
      },

      // ### scale
      //
      //    .css({ scale: 9 })      //=> "scale(9,9)"
      //    .css({ scale: '3,2' })  //=> "scale(3,2)"
      //
      scale: function(x, y) {
        if (y === undefined) y = x;
        this.scale = x + "," + y;
      },

      // ### skewX + skewY
      skewX: function(x) {
        this.skewX = unit(x, 'deg');
      },

      skewY: function(y) {
        this.skewY = unit(y, 'deg');
      },

      // ### x / y
      // Translations. Notice how this keeps the other value.
      //
      //     .css({ x: 4 })       //=> "translate(4px, 0)"
      //     .css({ y: 10 })      //=> "translate(4px, 10px)"
      //
      x: function(x) {
        this.set('translate', x, null);
      },

      y: function(y) {
        this.set('translate', null, y);
      },

      // ### translate
      // Notice how this keeps the other value.
      //
      //     .css({ translate: '2, 5' })    //=> "translate(2px, 5px)"
      //
      translate: function(x, y) {
        if (this._translateX === undefined) this._translateX = 0;
        if (this._translateY === undefined) this._translateY = 0;

        if (x !== null) this._translateX = x;
        if (y !== null) this._translateY = y;

        this.translate = this._translateX + "," + this._translateY;
      }
    },

    // ### parse()
    // Parses from a string. Called on constructor.
    parse: function(str) {
      var self = this;
      str.replace(/([a-z]+)\((.*?)\)/g, function(x, prop, val) {
        self.setFromString(prop, val);
      });
    },

    // ### toString()
    // Converts to a `transition` CSS property string.
    toString: function() {
      var re = [];
      for (i in this)
        if ((this.hasOwnProperty(i)) && (i[0] !== '_'))
          re.push(i + "(" + this[i] + ")");

      return re.join(" ");
    },

    // ### toWebkitString()
    // Converts to a `-webkit-transition` CSS property string.
    toWebkitString: function() {
      var re = [];

      for (i in this) {
        if ((this.hasOwnProperty(i)) && (i[0] !== '_')) {
          if ((i === 'scale') || (i === 'translate'))
            re.push(i + "3d(" + this[i] + ",0)");
          else
            re.push(i + "(" + this[i] + ")");
        }
      }

      return re.join(" ");
    }
  };

  // ## $.fn.transition
  // Works like $.fn.animate(), but uses CSS transitions.
  //
  //     $("...").transition({ opacity: 0.1, scale: 0.3 });
  //
  //     // Specific duration
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500);
  //
  //     // With duration and easing
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in');
  //
  //     // With callback
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, function() { ... });
  //
  //     // With everything
  //     $("...").transition({ opacity: 0.1, scale: 0.3 }, 500, 'in', function() { ... });
  //
  //     // Alternate syntax
  //     $("...").transition({
  //       opacity: 0.1,
  //       duration: 200,
  //       delay: 40,
  //       easing: 'in',
  //       complete: function() { /* ... */ }
  //      });
  //
  $.fn.transition = function(properties, duration, easing, callback) {
    var self  = this;
    var delay = 0;

    // Account for `.transition(properties, callback)`.
    if (typeof duration === 'function') {
      callback = duration;
      duration = null;
    }

    // Account for `.transition(properties, duration, callback)`.
    if (typeof easing === 'function') {
      callback = easing;
      easing = null;
    }

    // Alternate syntax.
    if (properties.easing) {
      easing = properties.easing;
      delete properties.easing;
    }

    if (properties.duration) {
      duration = properties.duration;
      delete properties.duration;
    }

    if (properties.complete) {
      callback = properties.complete;
      delete properties.complete;
    }

    // Account for aliases (`in` => `ease-in`).
    if ($.cssEase[easing]) easing = $.cssEase[easing];

    // Set defaults. (`400` duration, `ease` easing)
    if (duration == null) duration = $.fx.speeds._default;
    if (easing == null) easing = 'ease';

    duration = toMS(duration);

    // Build the `transition` property.
    var transition = 'all';
    transition += ' ' + duration + ' ' + easing;

    // Delay may be part of the properties.
    if (properties.delay) {
      delay = toMS(properties.delay);
      transition += ' ' + delay;
      delete properties.delay;
    }

    // Save the old transitions of each element so we can restore it later.
    var oldTransitions = {};

    // Apply transitions.
    this.each(function() {
      oldTransitions[this] = getVendorProperty(this, 'Transition');

      setVendorProperty(this, 'Transition', transition);
      $(this).css(properties);
    });

    // Prepare the callback.
    var cb = function() {
      self.each(function() {
        setVendorProperty(this, 'Transition', oldTransitions[this]);
      });
      if (typeof callback === 'function') callback.apply(self);
    };
    
    i = parseInt(duration) + parseInt(delay);
    window.setTimeout(cb, i);
  };

  function registerCssHook(prop, isPixels) {
    // For certain properties, the 'px' should not be implied.
    if (!isPixels) $.cssNumber[prop] = true;

    $.cssHooks[prop] = {
      get: function(elem) {
        var t = $(elem).css('transform');
        if (t) return t[prop];
      },

      set: function(elem, value) {
        var t = $(elem).css('transform') || new Transform;
        t.setFromString(prop, value);

        $(elem).css({ transform: t });
      }
    };
  }

  // ### unit(number, unit)
  // Ensures that number `number` has a unit. If no unit is found, assume the
  // default is `unit`.
  //
  //     unit(2, 'px')          //=> "2px"
  //     unit("30deg", 'rad')   //=> "30deg"
  //
  function unit(i, unit) {
    if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/)))
      return i;
    else
      return "" + i + unit;
  }

  // ### toMS(duration)
  // Converts given `duration` to a millisecond string.
  //
  //     toMS('fast')   //=> '400ms'
  //     toMS(10)       //=> '10ms'
  //
  function toMS(duration) {
    var i = duration;

    // Allow for string durations like 'fast'.
    if ($.fx.speeds[i]) i = $.fx.speeds[i];

    return unit(i, 'ms');
  }

  // ### setVendorProperty(element, property, value)
  // Sets a CSS property to `element` and accounts for vendor prefixes.
  //
  function setVendorProperty(element, prop, val) {
    element.style[     'O' + prop] = val;
    element.style[    'ms' + prop] = val;
    element.style[   'Moz' + prop] = val;
    element.style['webkit' + prop] = val;
    element.style[prop] = val;
  }

  function getVendorProperty(element, prop) {
    return element.style[prop] ||
      element.style[     'O' + prop] ||
      element.style[    'ms' + prop] ||
      element.style[   'Moz' + prop] ||
      element.style['webkit' + prop];
  }
})(jQuery);
