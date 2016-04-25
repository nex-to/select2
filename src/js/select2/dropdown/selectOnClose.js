define([

], function () {
  function SelectOnClose () { }

  SelectOnClose.prototype.bind = function (decorated, container, $container) {
    var self = this;

    decorated.call(this, container, $container);

    container.on('close', function () {
      self._handleSelectOnClose();
    });
  };

  SelectOnClose.prototype._handleSelectOnClose = function () {
    var $highlightedResults = this.getHighlightedResults();

    // Only select highlighted results
    if ($highlightedResults.length < 1) {
      return;
    }

    var data = $highlightedResults.data('data');

    // Don't re-select already selected resulte
    if (
      (data.element != null && data.element.selected) ||
      (data.element == null && data.selected)
    ) {
      return;
    }

    // Bugfix
    var event;
    // do not readd last item although
    // it was removed by click on 'x'
    if (event && event.srcElement.classList
      .contains('select2-selection__choice__remove'))
    {
      this.trigger('blur', {
        data: data
      });
      return;
    }

    // Do not readd item which just
    // got edited by backspace
    if (data && data.removedByChoice) {
      return;
    }

    // ignore click outside of select2 and
    // do not add selected item unless
    // it's type text!
    if (data && data.selected !== undefined &&
      !data.selected &&
      event.buttons !== undefined) {
      return;
    }
    // End bugfix

    this.trigger('select', {
        data: data
    });
  };

  return SelectOnClose;
});
