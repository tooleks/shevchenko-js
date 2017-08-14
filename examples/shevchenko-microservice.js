const shevchenko = require("shevchenko");
const http = require("http");

const port = process.env.port || 8000;

const server = http.createServer((request, response) => {
    const chunks = [];
    request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
        response.setHeader("Content-Type", "application/json");
        try {
            const body = JSON.parse(Buffer.concat(chunks));
            const result = shevchenko(body.person, body.caseName);
            response.end(JSON.stringify(result));
        } catch (error) {
            response.statusCode = 422;
            response.end(JSON.stringify(error.message));
        }
    });
});

server.listen(port, (error) => {
    if (error) return console.log("An error was occurred.", error);
    console.log(`Server is listening on ${port} port.`)
});
