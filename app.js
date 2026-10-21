let http = require('http');

let routes = require('/routes.js');
let server = http.createServer(routes);

server.listen(3000, () => {
    console.log("server is running");
})