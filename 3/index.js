var fs = require('fs');

const letters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

fs.readFile('input.txt', 'utf-8', (err, data) => {
    const rowAndCharSplit = data.split("\n").map((s) => {
        return s.split("");
    });
    const halfSplit = rowAndCharSplit.map((list) => {
        const half = list.length/2;
        const firstHalf = list.slice(0, half);
        const secondHalf = list.slice(half);
        return [firstHalf, secondHalf];
    }) 

    const inSets = halfSplit.map(([firstHalf, secondHalf]) => {
        return [new Set(firstHalf), new Set(secondHalf)];
    })

    const overlap = inSets.map(([firstSet, secondSet]) => {
        return [...firstSet].filter((inFirst) => secondSet.has(inFirst));
    })

    const overlapPoints = overlap.map((overlap) => {
        return overlap.reduce((sum, val) => {
            return sum + letters.indexOf(val);
        }, 0)
    })

    const sum = overlapPoints.reduce((sum, val) => {
        return sum + val;
    }, 0)

    console.log(sum);
})
