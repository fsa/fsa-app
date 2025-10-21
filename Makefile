deploy: build rsync

build:
	npm run build

rsync:
	rsync -aHv dist/ www@leon:/var/www/app.fsa.su/dist/

.PHONY: build