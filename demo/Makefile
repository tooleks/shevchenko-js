link:
	cd ../ && npm link && cd ./demo && npm link shevchenko
start:
	npm start
start-prod:
	make link
	./node_modules/.bin/pm2 start './ecosystem.json'
restart-prod:
	make link
	./node_modules/.bin/pm2 restart './ecosystem.json'
stop-prod:
	./node_modules/.bin/pm2 stop './ecosystem.json'