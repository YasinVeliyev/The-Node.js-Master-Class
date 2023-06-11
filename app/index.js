const http = require("node:http");
let { StringDecoder } = require("node:string_decoder");
const url = require("node:url");

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
        //Send the response
        res.end("Hello World\n");
        console.log(`Request received with this payload: ${buffer}`);
    });

    //Log the request
    console.log(
        `Method :${method}\nPath : ${trimmedPath}\nQuery:${JSON.stringify(query)}\nHeaders:${JSON.stringify(headers)}`
    );
});

server.listen(3000, () => {
    console.log("The server is listening on port 3000 now");
});
