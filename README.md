array-viewfinder
==================

array-viewfinder maintains a view into an array for you. This is sort of like a cursor and sort of like array paging, except:

- It supports changing the view size (how many elements you can see at once).
- It supports keeping your place when you change the array.

Installation
------------

    npm install array-viewfinder

Usage
-----

    var createViewfinder = require('array-viewfinder');

    var viewfinder = createViewfinder({
      array: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      viewSize: 3,
      valueEqualityFn: strictEq
    });

    function strictEq(a, b) {
      return a === b;
    }

    console.log(viewfinder.view()); // Output: [0, 1, 2]

    viewfinder.shift(3);
    console.log(viewfinder.view()); // Output: [3, 4, 5]

    viewfinder.resizeView(6);
    console.log(viewfinder.view()); // Output: [3, 4, 5, 6, 7, 8]

    viewfinder.update([-10, -2, 3, 7, 25, 1000]);
    console.log(viewfinder.view()); // Output: [3, 7, 25, 1000]

`valueEqualityFn` is a function that takes two parameters and returns whether or not they are equal. When the viewfinder's array is updated to one with new contents, it uses `valueEqualityFn` to identify an equivalent element when looking to retain the place in the array for the view. In array in which elements cannot be identified uniquely, it may not be possible to provide a meaningful `valueEqualityFn` or to meaningfully retain a place in the array after an update.

Without `valueEqualityFn`, the viewfinder will retain the index into the array it had before the update, regardless of changes to what that index points at after the update.

Tests
-----

Run tests with `make test`.

License
-------

The MIT License (MIT)

Copyright (c) 2015 Jim Kang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
