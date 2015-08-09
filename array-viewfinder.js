function createArrayViewFinder(createOpts) {
  var array;
  var viewSize;
  var index = 0;

  if (createOpts) {
    array = createOpts.array;
    viewSize = createOpts.viewSize;
  }

  function getWholeArray() {
    return array;
  }

  function view() {
    debugger;
    return array.slice(index, index + viewSize);
  }

  function goToIndex(newIndex) {
    debugger;
    if (newIndex >= array.length) {
      newIndex = array.length - 1;
    }
    if (newIndex < 0) {
      newIndex = 0;
    }
    index = newIndex;
  }

  function shift(delta) {
    goToIndex(index + delta);
    return view();
  }

  function resizeView(newSize) {
    if (newSize < 1) {
      newSize = 1;
    }
    viewSize = newSize;
  }

  function getViewSize() {
    return viewSize;
  }

  return {
    getWholeArray: getWholeArray,
    view: view,
    goToIndex: goToIndex,
    shift: shift,
    resizeView: resizeView,
    getViewSize: getViewSize
  };
}

module.exports = createArrayViewFinder;
