deploy: build rsync

build:
	npm run build

rsync:
	rsync -aHv build/client/ www@leon:/var/www/fsa.su/react/build/client/

.PHONY: build