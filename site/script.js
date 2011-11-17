(function() {
  var i = 0;
  $("article button").live('click', function(e) {
    e.preventDefault();
    var $parent = $(this).closest('article');
    $parent.trigger('jiggle');
    $parent.trigger('restore');
  });

  $("article .hover").live('mouseover', function(e) {
    $(this).closest('article').trigger('jiggle');
  });

  $("article .hover").live('mouseout', function(e) {
    $(this).closest('article').trigger('restore');
  });

  $("article").live('restore', function(e) {
    var $this = $(this);
    $this.removeClass('highlight');
    if ($this.find('.ghost').length) {
      $this.find('.box').remove();
      $this.find('.ghost').removeClass('ghost').addClass('box');
    }
  });

  $("article").live('jiggle', function(e) {
    var $this = $(this);
    var id      = $this.attr('id');

    $this.addClass('highlight');

    // Assign an ID if it doesn't have one.
    if (!id) {
      id = 'item_'+(i++);
      $this.attr('id', id);
    }

    // Extract the code.
    var code = $this.find('pre').text();
    code = code.replace(/\$\(['"](.*?)['"]\)/g, '$("#'+id+' $1:not(.ghost)")');

    // Duplicate the boxes to make ghosts.
    if (!$this.is('.noghost')) {
      $this.find('.field>*').each(function() {
        $(this).before($(this).clone().removeClass('box').addClass('ghost'));
      });
    }

    // Run it.
    eval(code);
  });
})();
