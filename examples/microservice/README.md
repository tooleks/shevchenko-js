# shevchenko-js microservice

## Requirements

Docker 17.10, Docker Compose 1.14

## Usage

Run the following command to start the microservice.

```bash
docker-compose up
```

Run the following command (in another terminal window) to verify the installation.

```bash
curl -X POST \
  http://localhost:3000/ \
  -H 'content-type: application/json' \
  -d '{"anthroponym":{"gender":"male","lastName":"Шевченко","firstName":"Тарас","middleName":"Григорович"},"caseName":"vocative"}'
```
