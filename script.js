(function() {

    var lastID = 0;

    $('.example').live('mouseenter play', function() {
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

    $('.example').live('mouseleave reset', function() {
      var $example = $(this).closest('.example');
      var $ghost = $example.find('.ghost');

      if ($ghost.length) {
        $example.find('.box:not(.ghost)').remove();
        $example.find('.ghost').removeClass('ghost');
      }

      $example.removeClass('playing');
    }); 

})();
