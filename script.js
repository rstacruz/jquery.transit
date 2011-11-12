(function() {
  var i = 0;
  $("article button").live('click', function(e) {
    e.preventDefault();

    var $parent = $(this).closest('article');
    var id      = $parent.attr('id');

    // Restore in it's old glory.
    if (!$parent.data('html')) {
      $parent.data('html', $parent.html());
    } else {
      $parent.html($parent.data('html'));
    }

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
    code = code.replace(/\$\(['"](.*?)['"]\)/g, '$("#'+id+' $1:not(.ghost)")');

    // Duplicate the boxes.
    $parent.find('.field>*').each(function() {
      $(this).before($(this).clone().addClass('ghost', true));
    });

    // Run it.
    eval(code);

    // Restore it eventually.
    var timer = window.setTimeout(function() {
      $parent.html($parent.data('html'));
    }, 3000);
    $parent.data('timer', timer);
  });
})();
