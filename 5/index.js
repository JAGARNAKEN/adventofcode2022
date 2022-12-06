var fs = require('fs');

function doMove([moves, from, to], stacks) {
    let elems = stacks[from].splice(-moves, moves);
    stacks[to].push(...elems);
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    const splitData = data.split("\n");
    const [unprocessedStacks, instructions] = splitData.reduce((different, s) => {
        if (!s) {
            different.push([]);
        } else {
            different.at(-1).push(s);
        }

        return different
    }, [[]])

    const numberOfStacks = unprocessedStacks.at(-1).split(" ").filter((s) => {
        return s;
    }).length;

    const stacksSplit = unprocessedStacks.slice(0, -1).map((stack) => {
        const newStack = stack.split("").reduce((accStacks, s, index) => {
            if ((index+1)%4 === 0) {
                accStacks.push([]);
            } else {
                accStacks.at(-1).push(s); 
            }

            return accStacks;
        }, [[]]);
        return newStack;
    })

    const stacks = Array.from( new Array(numberOfStacks), () => { return []; });

    stacksSplit.reverse();
    stacksSplit.map((stack) => {
        stack.map(([, letter, ], index) => {
            if (letter !== " ") {
                stacks[index].push(letter);
            }
        });
    });

    const processedInstructions = instructions.map((s) => {
        const [, moves, , from, , to] = s.split(" ")
        return [parseInt(moves), parseInt(from)-1, parseInt(to)-1];
    })

    processedInstructions.map((instruction) => {
        doMove(instruction, stacks);
    })

    const topInStacks = stacks.reduce((topStacks, stack) => {
        topStacks += stack.at(-1);
        return topStacks
    }, "")

    console.log(topInStacks);
});