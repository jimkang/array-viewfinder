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
  t.deepEqual(viewfinder.setIndex(7), [7, 8, 9], 'Sets index.');
  t.deepEqual(viewfinder.setIndex(9), [9], 'Sets index to end.');
  t.deepEqual(viewfinder.setIndex(10), [9], 'Does not set index past end.');
  t.deepEqual(viewfinder.setIndex(-10), [9], 'Does not set index past start.');
  t.deepEqual(viewfinder.setIndex(0), [0, 1, 2], 'Sets index to start.');

  t.deepEqual(viewfinder.view(), [0, 1, 2], 'Current view is correct.');
  t.deepEqual(viewfinder.shift(1), [1, 2, 3], 'Shifts correctly.');
  t.deepEqual(viewfinder.view(), [1, 2, 3], 'View is correct post-shift.');
  t.deepEqual(viewfinder.shift(3), [4, 5, 6], 'Shifts correctly.');
  t.deepEqual(viewfinder.shift(-2), [2, 3, 4], 'Shifts backward.');
  t.deepEqual(viewfinder.shift(-5), [0, 1, 2], 'Does not shift past start.');
  t.deepEqual(viewfinder.shift(4), [4, 5, 6], 'Shifts correctly.');

  t.deepEqual(viewfinder.resizeView(6), [4, 5, 6, 7, 8, 9], 'Expands view.');
  t.deepEqual(
    viewfinder.view(), [4, 5, 6, 7, 8, 9], 'View is correct post-expansion.'
  );
  t.equal(viewfinder.getViewSize(), 6, 'View size is correct.');
  t.deepEqual(
    viewfinder.resizeView(100000), [4, 5, 6, 7, 8, 9], 'Expands view.'
  );
  t.deepEqual(
    viewfinder.shift(-4), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 'Shifts after expand.'
  );
  t.deepEqual(viewfinder.resizeView(1), [4], 'Contracts view.');
  t.deepEqual(
    viewfinder.resizeView(-100000), [4], 'Does not contract below size of 1.'
  );
  t.deepEqual(viewfinder.resizeView(2), [4, 5], 'Expands view.');

  t.deepEqual(
    viewfinder.shift(1000), [9], 'Does not shift start of view past end.'
  );
  t.deepEqual(
    viewfinder.shift(-2), [7, 8], 'Shifts backward.'
  );
  t.deepEqual(viewfinder.view(), [7, 8], 'View is correct post-shift.');

  t.end();
});
