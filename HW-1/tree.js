///box characters
const ctx = {
    vertical: '\u2502',
    horizontal: '\u2500',
    start: '\u2514',
    verticalStart: '\u251C'
}

const INF = 100;

let defaultGetName = (obj) => obj["name"];
let defaultGetChildren = (obj) => obj["items"];

function filterResult(res) {

    ///remove unneccessary |, smooth the picture by replacing some characters
    for (let i = res.length - 1; i>= 0; i--) {
        res[i] = res[i].split('').map((el, ind) => {
            if (el == ctx.vertical && (i + 1 == res.length || 
                                        (res[i + 1][ind] != ctx.vertical && res[i + 1][ind] != ctx.start && res[i + 1][ind] != ctx.verticalStart)))
                return ' ';
            if (el == ctx.start && i + 1 != res.length && 
                                        (res[i + 1][ind] == ctx.vertical || res[i + 1][ind] == ctx.start || res[i + 1][ind] == ctx.verticalStart))
                return ctx.verticalStart;
            return el;
        }).join("");
    }
    return res;
}

function buildTree(obj, getName, getChildren, maxDepth, isFile=false, depth = 1) {
    if (depth > maxDepth)
        return [];
    let res = [];
    let line = "";
    if (depth > 1) {
        line  = (ctx.vertical + "   ").repeat(depth - 2);
        line += ctx.start + ctx.horizontal + ctx.horizontal + ' ';
    }
    line += getName(obj);
    res.push(line);
    return Promise.resolve(getChildren(obj)).then(async function (items) {
        if (!items)
            return res;
        for (item of items) {
            treeSon = await buildTree(isFile ? obj + '/' + item : item, getName, getChildren, maxDepth, isFile, depth + 1)
            res = res.concat(treeSon);
        }
        return res;
    })

}

function tree(obj, getName = defaultGetName, getChildren = defaultGetChildren) {
    return buildTree(obj, getName, getChildren).then(res => {
        return filterResult(res).join("\n");
    });
}

function treeFile(obj, getName = defaultGetName, getChildren = defaultGetChildren, maxDepth=INF) {
    return buildTree(obj, getName, getChildren, maxDepth, true).then(res => {
        return filterResult(res).join("\n");
    });
}

module.exports = {
    tree: tree,
    treeFile: treeFile
}