var fs = require('fs');

fs.readFile('input.txt', 'utf-8', (err, data) => {
    const splitData = data.split("");
    let markerLength = 14;

    const toExamine = splitData.splice(0, markerLength);

    let index = markerLength;
    while (splitData.length > 0) {
        const unique = new Set(toExamine);
        if (unique.size === markerLength) {
            break;
        }

        toExamine.splice(0, 1);
        toExamine.push(...splitData.splice(0, 1));
        index++;
    }

    console.log(index);
});