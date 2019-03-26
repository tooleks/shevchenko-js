install:
	cp -n ./.env.example ./.env
	npm install
	npm link ../

start:
	./node_modules/.bin/pm2 start ecosystem.json --no-daemon

start-daemon:
	./node_modules/.bin/pm2 start ecosystem.json

restart-daemon:
	./node_modules/.bin/pm2 restart ecosystem.json --update-env

stop-daemon:
	./node_modules/.bin/pm2 stop ecosystem.json
	./node_modules/.bin/pm2 delete ecosystem.json