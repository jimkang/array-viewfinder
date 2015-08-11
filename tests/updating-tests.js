var test = require('tape');
var createViewfinder = require('../array-viewfinder');

test('Updating tests', function updating(t) {
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  var viewfinder = createViewfinder({
    array: array,
    viewSize: 3,
    // There's arrays for which it is not possible to have a meaningful 
    // valueEqualityFn.
    valueEqualityFn: strictEq
  });

  function strictEq(a, b) {
    return a === b;
  }

  viewfinder.update(array.concat([10, 11, 12]));
  t.deepEqual(
    viewfinder.getWholeArray(),
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    'Gets array with added elements.'
  );

  viewfinder.goToIndex(12);
  t.deepEqual(viewfinder.view(), [12], 'Can view new element.');
  
  viewfinder.update(array.concat([10, 11, 12, 13, 14, 15, 16]));
  t.deepEqual(
    viewfinder.view(), [12, 13, 14], 'Appended elements show in current view.'
  );

  viewfinder.update(array);
  t.deepEqual(
    viewfinder.view(),
    [9],
    'After element at which index pointed is removed, index is at next closest place.'
  );

  viewfinder.update([0, 1, 2, 3, 4]);
  t.deepEqual(
    viewfinder.view(),
    [4],
    'After index element is removed from end, index is at next closest place.'
  );

  viewfinder.update(array);
  t.deepEqual(
    viewfinder.view(),
    [4, 5, 6],
    'After elements are inserted after index, index points to same place.'
  );

  viewfinder.update([-3, -2, -1].concat(array));
  t.deepEqual(
    viewfinder.view(),
    [4, 5, 6],
    'After elements are inserted before index, index points to same element.'
  );

  viewfinder.update(array.reverse());
  t.deepEqual(
    viewfinder.view(),
    [4, 3, 2],
    'After sorting, index points to same element.'
  );

  t.end();
});

test('Empty array', function emptyArray(t) {
  viewfinder = createViewfinder({
    array: [],
    viewSize: 3,
    valueEqualityFn: strictEq
  });

  function strictEq(a, b) {
    t.ok(a !== undefined, 'Comparator was not passed undefined.')
    t.ok(b !== undefined, 'Comparator was not passed undefined.')
    return a === b;
  }

  viewfinder.update([10, 11, 12]);
  t.deepEqual(
    viewfinder.getWholeArray(),
    [10, 11, 12],
    'Gets array with added elements.'
  );


  viewfinder.update([]);
  t.deepEqual(
    viewfinder.getWholeArray(),
    [],
    'Gets an empty array.'
  );

  t.end();
});
