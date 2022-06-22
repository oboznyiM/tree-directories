const http = require('http');



function sendRequest(requestID) {
    console.time(requestID);
    const options = {
        hostname: 'google.com',
        port: 8080,
        method: 'GET',
    };
    
    http.get('http://localhost:8080', resp => {
        resp.on('data', (chunk) => {
            
        })
        resp.on('end', () => {
            console.timeEnd(requestID );
        })
    })
}

for (let i = 0; i < 1000; i++)
    sendRequest(i);

