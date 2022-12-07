var fs = require('fs');

const Types = {
    Rock: 1,
    Paper: 2,
    Scissor: 3,
};

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let splitData = data.split("\n");

    let openDirs = [];
    let allSizes = {};

    splitData.map((row) => {
        let splitRow = row.split(" ");

        if (splitRow[1] === "cd") {
            if (splitRow[2] === "..") {
                openDirs.pop();
            }  else {
                let dir = splitRow[2];
                let dirAndPath = openDirs.toString() + "," + dir;
                openDirs.push(dirAndPath);
                if (!(dirAndPath in allSizes)) {
                    allSizes[dirAndPath] = 0;
                }
            }
        } else if (parseInt(splitRow[0])) {
            let size = parseInt(splitRow[0]);
            openDirs.forEach((dir) => {
                allSizes[dir] += size;
            })
        }
    })

    const threshold = 100000;
    let sumUnderThreshold = Object.values(allSizes).reduce((sum, val) => {
        if (val < threshold) {
            return sum + val;
        }

        return sum;
    }, 0);

    console.log(sumUnderThreshold);
})