deploy:
	rsync -aHv build/client/ www@leon:/var/www/app.fsa.su/build/client/
