const TreeBuilder = require('./tree.js');

const exampleJSON = {
    name: "1",
    items: [
        {
            name: "2",
            items: [
                {
                    name: "4",
                    items: [
                        {
                            name: "9"
                        }
                    ]
                },
                {
                    name: "5"
                }
            ]
        },{
            name: "3",
            items: [
                {
                    name: "6",
                    items: [
                        {
                            name: "7"
                        },
                        {
                            name: "8"
                        }
                    ]
                }
            ]
        }
    ]
}


TreeBuilder.tree(exampleJSON).then(res => console.log(res))