var fs = require('fs');

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

    const currentSpace = 70000000 - allSizes[",/"];
    const spaceToFree =  30000000 - currentSpace;
    let candidateDirectories = Object.entries(allSizes).filter(([, val]) => {
        return val > spaceToFree;
    });
    console.log(candidateDirectories);

    const smallestDir = candidateDirectories.reduce((minValue, [, size]) => {
        if (size < minValue) {
            return size
        }
        return minValue;
    }, Number.MAX_VALUE);

    console.log(smallestDir);


})