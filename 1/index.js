var fs = require('fs');

console.log("starting ");

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let splitData = data
        .split("\n")
        .reduce((split, s) => {
            if (s) {
                split.at(-1).push(parseInt(s));
            } else {
                split.push([]);
            }

            return split;
        }, [[]])
        .map((val) => {
            return val
                .reduce((sum, val) => {
                    return sum + val;
                }, 0)
        })
        .sort((a, b) => {
            return b - a;
        })
        .slice(0, 3)
        .reduce((sum, val) => {
            return sum + val;
        }, 0);

    console.log(splitData);
});