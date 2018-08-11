"use strict";

const http = require("http");
const shevchenko = require("../dist/shevchenko.cjs");

const port = process.env.PORT || 8000;

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");
    if (request.method === "POST") {
        const chunks = [];
        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", () => {
            try {
                const body = JSON.parse(Buffer.concat(chunks));
                const result = shevchenko(body.anthroponym, body.caseName);
                response.end(JSON.stringify(result));
            } catch (error) {
                response.statusCode = 422;
                response.end(JSON.stringify(error.message));
            }
        });
    } else {
        response.statusCode = 405;
        response.end(JSON.stringify("Method Not Allowed"));
    }
});

server.listen(port, (error) => {
    if (error) {
        console.log("An error has occurred.", error);
        return;
    }
    console.log(`Server is listening on ${port} port.`);
});
