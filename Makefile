install:
	npm ci
publish:
	npm publish --dry-run
lint:
	npx eslint .
test-coverage:
	npm test -- --coverage --coverageProvider=v8
test: 
	npm test

test-coverage:
	NODE_OPTIONS=--experimental-vm-modules npx jest --coverage
	
.PHONY: test