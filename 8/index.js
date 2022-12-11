
var fs = require('fs');

function upwardScore(grid, posRowIndex, posColumnIndex) {
    let posTreeHeight = grid[posRowIndex][posColumnIndex];
    let treesInView = 0;

    for (let rowIndex = posRowIndex - 1; 0 <= rowIndex; --rowIndex) {
        const tree = grid[rowIndex][posColumnIndex];
        if (tree < posTreeHeight) {
            treesInView++;
        } else {
            return ++treesInView;
        }
    }

    return treesInView;
}

function downwardScore(grid, posRowIndex, posColumnIndex) {
    let posTreeHeight = grid[posRowIndex][posColumnIndex];
    let treesInView = 0;

    for (let rowIndex = posRowIndex + 1; rowIndex < grid[0].length; rowIndex ++) {
        const tree = grid[rowIndex][posColumnIndex];
        if (tree < posTreeHeight) {
            treesInView++;
        } else {
            return ++treesInView;
        }
    }

    return treesInView;
}

function leftScore(grid, posRowIndex, posColumnIndex) {
    let posTreeHeight = grid[posRowIndex][posColumnIndex];
    let treesInView = 0;

    for (let columnIndex = posColumnIndex - 1; 0 <= columnIndex; --columnIndex) {
        const tree = grid[posRowIndex][columnIndex];
        if (tree < posTreeHeight) {
            treesInView++;
        } else {
            return ++treesInView;
        }
    }

    return treesInView;
}

function rightScore(grid, posRowIndex, posColumnIndex) {
    let posTreeHeight = grid[posRowIndex][posColumnIndex];
    let treesInView = 0;

    for (let columnIndex = posColumnIndex + 1; columnIndex < grid.length; columnIndex ++) {
        const tree = grid[posRowIndex][columnIndex];
        if (tree < posTreeHeight) {
            treesInView++;
        } else {
            return ++treesInView;
        }
    }

    return treesInView;
}

function calculatePositionScore(grid, posRowIndex, posColumnIndex) {
    return upwardScore(grid, posRowIndex, posColumnIndex)
        * downwardScore(grid, posRowIndex, posColumnIndex)
        * leftScore(grid, posRowIndex, posColumnIndex)
        * rightScore(grid, posRowIndex, posColumnIndex);
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let splitData = data.split("\n");
    let grid = splitData.map((line) => {
        return line.split("").map((s) => {
            return parseInt(s);
        });
    });

    let highestScore = 0;
    grid.map((row, rowIndex) => {
        row.map((val, columnIndex) => {
            const positionScore = calculatePositionScore(grid, rowIndex, columnIndex);
            if (positionScore > highestScore) {
                highestScore = positionScore;
            }
        })
    })

    console.log("Highest score", highestScore);
})