include .env.local

deploy: build rsync

build:
	npm run build

rsync:
	rsync -aHv build/client/ ${DEPLOY_PATH}

.PHONY: build