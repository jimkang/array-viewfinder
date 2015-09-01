var test = require('tape');
var createViewfinder = require('../array-viewfinder');

test('Basic tests', function basicTests(t) {
  var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  viewfinder = createViewfinder({
    array: array,
    viewSize: 3
  });

  t.deepEqual(viewfinder.getWholeArray(), array, 'Gets whole array.');

  t.deepEqual(viewfinder.view(), [0, 1, 2], 'Current view is correct.');

  viewfinder.goToIndex(7);
  t.deepEqual(viewfinder.view(), [7, 8, 9], 'Sets index.');

  viewfinder.goToIndex(9);  
  t.deepEqual(viewfinder.view(), [9], 'Sets index to end.');

  viewfinder.goToIndex(10);
  t.deepEqual(viewfinder.view(), [9], 'Does not set index past end.');

  t.equal(viewfinder.getIndex(), 9, 'Gets current index.');

  viewfinder.goToIndex(-10);
  t.deepEqual(viewfinder.view(), [0, 1, 2], 'Does not set index past start.');

  viewfinder.goToIndex(0);
  t.deepEqual(viewfinder.view(), [0, 1, 2], 'Sets index to start.');

  t.deepEqual(viewfinder.view(), [0, 1, 2], 'Current view is correct.');
  t.deepEqual(viewfinder.shift(1), [1, 2, 3], 'Shifts correctly.');
  t.deepEqual(viewfinder.view(), [1, 2, 3], 'View is correct post-shift.');
  t.deepEqual(viewfinder.shift(3), [4, 5, 6], 'Shifts correctly.');
  t.deepEqual(viewfinder.shift(-2), [2, 3, 4], 'Shifts backward.');
  t.deepEqual(viewfinder.shift(-5), [0, 1, 2], 'Does not shift past start.');
  t.deepEqual(viewfinder.shift(4), [4, 5, 6], 'Shifts correctly.');

  viewfinder.resizeView(6);
  t.deepEqual(viewfinder.view(), [4, 5, 6, 7, 8, 9], 'Expands view.');
  t.equal(viewfinder.getViewSize(), 6, 'View size is correct.');

  viewfinder.resizeView(100000);
  t.deepEqual(viewfinder.view(), [4, 5, 6, 7, 8, 9], 'Expands view.');
  t.deepEqual(
    viewfinder.shift(-4), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'Shifts after expand.'
  );

  viewfinder.resizeView(1);
  t.deepEqual(viewfinder.view(), [0], 'Contracts view.');

  viewfinder.resizeView(-100000);
  t.deepEqual(viewfinder.view(), [0], 'Does not contract below size of 1.');

  viewfinder.resizeView(2);
  t.deepEqual(viewfinder.view(), [0, 1], 'Expands view.');

  t.deepEqual(
    viewfinder.shift(1000), [9], 'Does not shift start of view past end.'
  );
  t.deepEqual(
    viewfinder.shift(-2), [7, 8], 'Shifts backward.'
  );

  t.end();
});

test('Empty array', function emptyArray(t) {
  viewfinder = createViewfinder({
    array: [],
    viewSize: 3
  });

  t.deepEqual(viewfinder.getWholeArray(), [], 'Gets whole array.');

  t.deepEqual(viewfinder.view(), [], 'Current view is correct.');

  viewfinder.goToIndex(10);
  t.deepEqual(viewfinder.view(), [], 'Does not set index past end.');

  viewfinder.goToIndex(-10);
  t.deepEqual(viewfinder.view(), [], 'Does not set index past start.');

  viewfinder.goToIndex(0);
  t.deepEqual(viewfinder.view(), [], 'Sets index to start.');

  t.deepEqual(viewfinder.shift(1), [], 'Shifts correctly.');

  t.end();
});
