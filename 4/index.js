var fs = require('fs');

function rangeFromGroup(group) {
    let range = [];
    for (let index = group[0]; index <= group[1]; index++) {
        range.push(index);
    };
    return range;
}

function completeSetOverlap(firstSet, secondSet) {
    const overlap = [...firstSet].filter((inFirst) => {
        return secondSet.has(inFirst);
    })

    return overlap.length > 0 ? true : false;
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    const rowAndGroupSplit = data.split("\n").map((s) => {
        return s.split(",");
    })

    const groupWithRange = rowAndGroupSplit.map(([first, second]) => {
        const firstGroup = first.split("-").map((s) => {
            return parseInt(s);
        });

        const secondGroup = second.split("-").map((s) => {
            return parseInt(s);
        });

        return [rangeFromGroup(firstGroup), rangeFromGroup(secondGroup)];
    })

    const groupWithSet = groupWithRange.map(([first, second]) => {
        return [new Set(first), new Set(second)];
    })

    const numberOfOverlaps = groupWithSet.reduce((sum, [first, second]) => {
        if (completeSetOverlap(first, second)) {
            return sum + 1;
        };

        return sum;
    }, 0)

    console.log(numberOfOverlaps)
});