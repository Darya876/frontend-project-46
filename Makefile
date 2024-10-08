install:
	npm ci

lint:
	npx eslint .

publish:
	npm publish --dry-run

test:
	npm test --experimental-vn-modules --no-warnings

test-coverage:
	npm test -- --coverage --coverageProvider=v8

test-watch:
	npm test -- --watch
