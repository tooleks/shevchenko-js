const http = require("http");
const shevchenko = require("shevchenko");

const port = process.env.port || 8000;

const server = http.createServer((request, response) => {
    response.setHeader("Content-Type", "application/json");
    if (request.method === "POST") {
        const chunks = [];
        request.on("data", (chunk) => chunks.push(chunk));
        request.on("end", () => {
            try {
                const body = JSON.parse(Buffer.concat(chunks));
                const result = shevchenko(body.person, body.caseName);
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
    if (error) return console.log("An error has occurred.", error);
    console.log(`Server is listening on ${port} port.`)
});
