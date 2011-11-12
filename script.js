(function() {
  var i = 0;
  $("article button").live('click', function(e) {
    e.preventDefault();

    var $parent = $(this).closest('article');
    var id      = $parent.attr('id');

    // Restore in it's old glory.
    var restore = function() {
      $parent.find('.box').remove();
      $parent.find('.ghost').removeClass('ghost').addClass('box');
    };

    if ($parent.find('.ghost').length) restore();

    // Abort an old timer.
    var timer = $parent.data('timer');
    if (timer) { clearTimeout(timer); }

    // Assign an ID if it doesn't have one.
    if (!id) {
      id = 'item_'+(i++);
      $parent.attr('id', id);
    }

    // Extract the code.
    var code = $parent.find('pre').text();
    code = code.replace(/\$\(['"](.*?)['"]\)/g, '$("#'+id+' $1")');

    // Duplicate the boxes to make ghosts.
    $parent.find('.field>*').each(function() {
      $(this).before($(this).clone().removeClass('box').addClass('ghost'));
    });

    // Run it.
    eval(code);

    // Restore it eventually.
    var timer = window.setTimeout(restore, 3000);
    $parent.data('timer', timer);
  });
})();
