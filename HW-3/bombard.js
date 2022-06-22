#! /usr/bin/env node
const http = require('http');
var requests, concurrent, body, url, succ = 0, total_time = 0;
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv;


function makeBody(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function getArg(shortArg, arg, str) {
    let value;
    if (argv[shortArg])
        value = argv[shortArg];
    else if (argv[arg])
        value = argv[arg];
    if (!value)
        return undefined;
    if (!Number.isInteger(value))
        throw `${str} should be an integer`;
    value = parseInt(value);
    if (value <= 0)
        throw `${str} value should be positive`;
    return value;
}

function processArgs() {

    body = argv['b'] || argv['body']
   
    url = argv["url"];
    if (!url) {
        throw "Please, specify the url";
    }

    requests = getArg('n', 'requests', 'Number of requests');
    if (!requests) {
        throw "Please, specify the number of requests";
    }
}

function sendRequest(requestID) {
    console.time(requestID);
    const start = Date.now()
    let req = http.request('http://localhost:8080', {method: "POST"}, resp => {
        
        resp.on('data', (chunk) => {
            
        })
        resp.on('end', () => {
            total_time += Date.now() - start;
            console.timeEnd(requestID );
            succ++;
        });
        resp.on('error', () => {
            console.log("Request failed with error: ", error);
        })
    });

    if (body) {
        req.write(makeBody(5000));
        req.end();
    }
    req.on('error', (e) => {
        console.log(e);
    })
}


processArgs();

for (let i = 1; i <= requests; i++)
    sendRequest(i);

process.on('exit', () => {
    console.log("bombarded\n");
    console.log(`${requests} requests, ${succ} successful\nAverage response time: ${total_time/requests} ms.`);
})
