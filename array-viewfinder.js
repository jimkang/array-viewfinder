function createArrayViewFinder(createOpts) {
  var array;
  var viewSize;
  var index = 0;
  var elementsAreEqual;

  if (createOpts) {
    array = createOpts.array;
    viewSize = createOpts.viewSize;
    elementsAreEqual = createOpts.valueEqualityFn;
  }

  function getWholeArray() {
    return array;
  }

  function view() {
    return array.slice(index, index + viewSize);
  }

  function goToIndex(newIndex) {
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

  function update(newArray) {
    var indexElement = array[index];
    array = newArray;
    var restoredIndex = getIndexOfElement(indexElement, index);
    if (restoredIndex !== undefined) {
      goToIndex(restoredIndex);
    }
    else {
      goToIndex(index);
    }
  }

  // Searches by checking increasingly further to the left and right of 
  // startIndex until it hits the ends.
  function getIndexOfElement(element, startIndex,
    lastSearchedDirection, lastJumpSize, leftSearchComplete, rightSearchComplete) {

    if (!lastSearchedDirection) {
      lastSearchedDirection = 1;
    }
    if (!lastJumpSize) {
      lastJumpSize = 0;
    }
    if (leftSearchComplete === undefined) {
      leftSearchComplete = false;
    }
    if (rightSearchComplete === undefined) {
      rightSearchComplete = false;
    }

    if (elementsAreEqual === undefined) {
      return startIndex;
    }
    else {
      if (startIndex > -1 && startIndex < array.length &&
        elementsAreEqual(element, array[startIndex])) {

        return startIndex;
      }
      else {
        var nextSearchDirection;
        var nextJumpSize;
        debugger;
        if (leftSearchComplete && rightSearchComplete) {
          return undefined;
        }
        else if (leftSearchComplete) {
          nextJumpSize = 1;
          nextSearchDirection = 1;
        }
        else if (rightSearchComplete) {
          nextJumpSize = 1;
          nextSearchDirection = -1;
        }
        else {
          nextJumpSize = lastJumpSize + 1;
          nextSearchDirection = -lastSearchedDirection;
        }

        var nextIndex = startIndex + nextSearchDirection * nextJumpSize;

        if (nextIndex <= 0) {
          leftSearchComplete = true;
          nextIndex = startIndex + lastJumpSize + 1;
        }
        if (nextIndex >= array.length - 1) {
          rightSearchComplete = true;
          nextIndex = startIndex - lastJumpSize - 1;
        }

        console.log('nextIndex', nextIndex);

        return getIndexOfElement(
          element, nextIndex, nextSearchDirection, nextJumpSize,
          leftSearchComplete, rightSearchComplete
        );
      }
    }
  }

  return {
    getWholeArray: getWholeArray,
    view: view,
    goToIndex: goToIndex,
    shift: shift,
    resizeView: resizeView,
    getViewSize: getViewSize,
    update: update
  };
}

module.exports = createArrayViewFinder;
