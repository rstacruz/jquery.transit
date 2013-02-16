(function() {

    var lastID = 0;

    $('.example').live('play', function() {
      var $example = $(this).closest('.example');
      $example.trigger('reset');

      $example.addClass('playing');

      var $box = $example.find('.box:not(.ghost)');
      var $ghost = $box.clone().addClass('ghost').appendTo($example.find('.area'));
      var $pre = $example.find('pre');

      var id = $example.attr('id');
      if (!id) {
        id = 'example-'+(++lastID);
        $example.attr('id', id);
      }

      var code = $pre.text();
      code = code.replace(/\$\('\.box'\)/g, '$("#'+id+' .box:not(.ghost)")');

      eval(code);
    });

    $('.example').live('reset', function() {
      var $example = $(this).closest('.example');
      var $ghost = $example.find('.ghost');

      if ($ghost.length) {
        $example.find('.box:not(.ghost)').remove();
        $example.find('.ghost').removeClass('ghost');
      }

      $example.removeClass('playing');
    }); 

    var isMobile = (!! window.navigator.userAgent.match(/iPod|iPad|iPhone/));

    // For iPad and such, tap to play
    if (isMobile) {
      $('.example').live('click', function() {
        $('.example.playing').trigger('reset');
        $(this).trigger('play');
      });
    }

    // For desktops, hover
    else {
      $('.example')
        .live('mouseenter', function() { $(this).trigger('play'); })
        .live('mouseleave', function() { $(this).trigger('reset'); });
    }


    // Equalizer:
    // Ensure things line up on any browser width.
    $(window).on('resize reequalize', function() {
      $('.translations.examples')
        .equalize({ reset: true, children: '.code' })
        .equalize({ reset: true, children: 'h3' });

      $('.two-d.examples')
        .equalize({ reset: true, children: '.code' })
        .equalize({ reset: true, children: 'h3' });

      $('.three-d.examples')
        .equalize({ reset: true, children: '.code' })
        .equalize({ reset: true, children: 'h3' });

      $('.any-property.examples')
        .equalize({ reset: true, children: '.code' });

      $('.easing .examples')
        .equalize({ reset: true, children: '.in' });
    });

    $(function() {
      $(window).trigger('reequalize');
    });

    // Export
    window.App = {
      isMobile: isMobile
    };

})();
