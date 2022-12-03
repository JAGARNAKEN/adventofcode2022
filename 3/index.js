var fs = require('fs');

const letters = " abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

function calculateScoreForGroup(groupList) {
    const inSets = groupList.map((group) => {
        return new Set(group);
    });

    const overlap = [...inSets[0]].filter((inFirst) => inSets[1].has(inFirst)).filter((inFirst) => inSets[2].has(inFirst));

    const overlapScore = overlap.reduce((sum, letter) => {
        return sum + letters.indexOf(letter);
    }, 0)

    return overlapScore
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    const rowAndCharSplit = data.split("\n").map((s) => {
        return s.split("");
    });

    let elfCount = 0;
    const groups = rowAndCharSplit.reduce((groupList, list) => {
        groupList.at(-1).push(list);

        elfCount += 1;
        if (elfCount%3 === 0) {
            groupList.push([])
            elfCount = 0;
        }

        return groupList
    }, [[]]).slice(0, -1); // Remove last empty list


    const groupScores = groups.map((group) => {
        return calculateScoreForGroup(group);
    });

    const totalScore = groupScores.reduce((sum, val) => {
        return sum + val;
    })

    console.log(totalScore)

})
