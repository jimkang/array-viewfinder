test:
	node tests/basictests.js

pushall:
	git push origin master && npm publish

ifndef PROJECTNAME
init-project:
	$(error PROJECTNAME is not set. Usage: make init-project PROJECTNAME=your-name)
else
init-project:
	rm -rf .git
	find . -type f -print0 | xargs -0 sed -i '' s/array-viewfinder/$(PROJECTNAME)/g'
	git init
endif
