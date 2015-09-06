var test = require('tape');
var createViewfinder = require('../array-viewfinder');
var range = require('d3-arrays').range;

test('View after sizing tests', function basicTests(t) {
  var viewfinder = createViewfinder({
    array: range(0, 100),
    viewSize: 10,
    valueEqualityFn: simpleEq
  });

  t.deepEqual(viewfinder.view(), range(0, 10), 'Initial view is correct.');

  viewfinder.update(range(0, 110));
  t.deepEqual(viewfinder.view(), range(0, 10), 'View is correct after update.');

  viewfinder.update(range(-10, 110));
  t.deepEqual(viewfinder.view(), range(0, 10), 'View is correct after update.');

  t.end();
});


function simpleEq(a, b) {
  return a === b;
}
