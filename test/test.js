(function($) {
  /* Simple test framework of sorts */


  function addTestEvents ($test) {
    $test.bind('mouseenter play', function() {
      var $test = $(this).closest('.test');
      $test.trigger('reset');
      var $box = $test.find('.box:not(.ghost)');
      var $ghost = $box.clone().addClass('ghost').appendTo($test.find('.area'));
  
      $test.data('code').fn($box, $test);
    });
  
    $test.bind('mouseleave reset', function() {
      var $test = $(this).closest('.test');
      var $ghost = $test.find('.ghost');
      if ($ghost.length) {
        $test.find('.box:not(.ghost)').remove();
        $test.find('.ghost').removeClass('ghost');
      }
    });
  }
  
  $(document).ready(function () {
    $('.play-all').bind('click', function() {
      $('.test').trigger('play');
    });
  });

  function test(name, fn) {
    var i = $('.tests .test').length;
    var $test = $('<div class="test"><h3></h3><div class="area"><div class="box"></div></div><pre class="code"></pre></div>');

    var m = fn.toString().match(/\{([\s\S]*)\}$/);
    var code = m[1];
    code = code.replace(/^\s*|\s*$/g, '');
    code = code.replace(/\n {4}/g, "\n");
    name = name.replace(/\(.*\)/, function(n) { return "<em>"+n.substr(1,n.length-2)+"</em>"; });

    $test.attr('id', 'test-'+i);
    $test.find('h3').html(name);
    $test.find('pre').text(code);
    $test.data('code', {fn: fn});
      addTestEvents($test);

    $('.tests').append($test);
  }

  function group(name) {
    $('.tests').append($('<h4 class="group-heading">').text(name));
  }

  // Show versions
  $(function() {
    $('#jquery-version').html(
      'jQuery: v' + $.fn.jquery + '<br>' +
      'Transit: v' + $.transit.version
    );
  });

  window.group = group;
  window.test  = test;

})(jQuery);
