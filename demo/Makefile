link:
	cd ../ && npm link && cd ./demo && npm link shevchenko

start: link
	npm start

start-prod: link
	./node_modules/.bin/pm2 start './ecosystem.json'

restart-prod: link
	./node_modules/.bin/pm2 restart './ecosystem.json'

stop-prod:
	./node_modules/.bin/pm2 stop './ecosystem.json'