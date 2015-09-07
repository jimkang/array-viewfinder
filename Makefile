test:
	node tests/basictests.js
	node tests/updating-tests.js
	node tests/view-sizing-tests.js
	node tests/get-index-of-element-tests.js

pushall:
	git push origin master && npm publish
