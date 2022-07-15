const http = require('http');

const requestListener = function (req, res) {
    setTimeout(() => {
        let data = "";
        req.on('data', (chunk) => {
            data += chunk;
        })
        req.on('end', () => {
            console.log("The request with body: ", data);
        })

        res.writeHead(200);
        res.end('Hello, World!');
    }, 100);
}

const server = http.createServer(requestListener);
server.listen(8080, () => {
    console.log("Started on port 8080")
});