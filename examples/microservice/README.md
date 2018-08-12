## shevchenko microservice

### Installation

Run the following command to install the application dependencies.

```bash
npm install
```

### Usage

Run the following command to start the application.

```bash
npm start
```

Run the following command (in another terminal window) to verify the installation.

```bash
curl -X POST \
  http://localhost:3000/ \
  -H 'content-type: application/json' \
  -d '{"anthroponym":{"gender":"male","lastName":"Шевченко","firstName":"Тарас","middleName":"Григорович"},"caseName":"vocative"}'
```
