const http = require("node:http");
let { StringDecoder } = require("node:string_decoder");
const url = require("node:url");
const handlers = require("./handlers");
const config = require("./config");

const server = http.createServer((req, res) => {
    // Get the url and parse it
    let parsedUrl = url.parse(req.url, true);
    //Get the path

    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, "");

    //Get the query string as object
    let query = parsedUrl.query;

    //Get the HTTP method
    let method = req.method.toLocaleUpperCase();

    //Get Header object
    let headers = req.headers;

    //Get payload ,if any
    let decoder = new StringDecoder("utf-8");
    let buffer = "";
    req.on("data", (data) => {
        buffer += decoder.write(data);
    });

    req.on("end", () => {
        buffer += decoder.end();

        choosenHandler = handlers[trimmedPath] ? handlers[trimmedPath] : handlers.notFound;

        let data = {
            trimmedPath,
            query,
            method,
            headers,
            buffer,
        };

        choosenHandler(data, (statusCode, payload) => {
            statusCode = typeof statusCode == "number" ? statusCode : 200;
            payload = typeof payload == "object" ? payload : {};
            //Send the response
            res.setHeader("Content-Type", "application/json");
            res.writeHead(statusCode);
            //Send the response
            res.end(JSON.stringify(payload));
            console.log(`Returning this response: ${JSON.stringify(payload)} ${statusCode}`);
        });
    });

    //Log the request
});

const PORT = config.port;
const mode = config.name;

server.listen(PORT, () => {
    console.log(`The server is listening on port ${PORT} ${mode} mode`);
});
