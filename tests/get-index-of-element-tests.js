var test = require('tape');
var createViewfinder = require('../array-viewfinder');
var range = require('d3-arrays').range;

test('getIndexOfElement tests', function getIndexOfElementTests(t) {
  var viewfinder = createViewfinder({
    array: range(-20, 110),
    viewSize: 10,
    valueEqualityFn: simpleEq
  });

  viewfinder.goToIndex(10);
  t.equal(viewfinder.getIndexOfElement(0, 10), 20, 'Finds index of value 0.');

  t.end();
});


function simpleEq(a, b) {
  return a === b;
}
