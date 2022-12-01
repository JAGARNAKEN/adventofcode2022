var fs = require('fs');

console.log("starting ");

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let splitData = data.split("\n");

    let maxList = []; 
    let currentValue = 0;

    splitData.forEach((s) => {
        if (s) {
            currentValue += parseInt(s);
        } else {
            maxList.push(currentValue)
            currentValue = 0;
        }
    })
    maxList.push(currentValue)

    maxList.sort((a, b) => {
        return b - a;
    });

    let topThree = maxList.slice(0, 3);

    console.log("Final ", topThree);
    console.log("Sum", topThree.reduce((sum, current) => {
        return sum += current;
    }));


});