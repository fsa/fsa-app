deploy: build rsync

build:
	npm run build
rsync:
	rsync -aHv build/client/ www@leon:/var/www/app.fsa.su/build/client/
