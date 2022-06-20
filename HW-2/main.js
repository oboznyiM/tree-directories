const TreeBuilder = require('../HW-1/tree.js');
const fs = require("fs");
const path = require("path");
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

let getName = path.basename;

let getChildren = async function (obj) {
    let result;
    return new Promise((resolve, reject) => {
        fs.readdir(obj, (err, res) => {
           resolve(res);
        });
    })
}

function getDirectory() {
    if (argv["_"].length == 0)
        throw "Please, specify the directory";
    if (argv["_"].length > 1)
        throw "Please, specify a single directory";
    return argv["_"][0];
}

function getDepth() {
    let depth;
    if (argv["d"])
        depth = argv["d"];
    else if (argv["depth"])
        depth = argv["depth"];
    if (!depth)
        return undefined;
    if (!Number.isInteger(depth))
        throw "Depth should be an integer";
    depth = parseInt(depth);
    if (depth <= 0)
        throw "Depth should be positive";
    return depth;
}

function run() {
    const directory = getDirectory();
    const depth = getDepth();
    if (depth) {
        TreeBuilder.treeFile(directory, getName, getChildren, depth).then(res => console.log(res));
    }   
    else {
        TreeBuilder.treeFile(directory, getName, getChildren).then(res => console.log(res));
    }
}

run();