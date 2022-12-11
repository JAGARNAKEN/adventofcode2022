
var fs = require('fs');

function numberOfEdgeTrees(grid) {
    let numberOfRows = grid.length
    let numberOfColumns = grid[0].length

    let overlap = 4

    return numberOfRows * 2 + numberOfColumns * 2 - overlap;
}

function checkRowForward(row, rowIndex) {
    let visibleTrees = []
    let highestTreeForRow = row[0];
    for (let columnIndex = 1; columnIndex < row.length - 1; columnIndex++) {
        const tree = row[columnIndex];
        if (tree > highestTreeForRow) {
            highestTreeForRow = tree;
            visibleTrees.push([rowIndex, columnIndex]);
        }
    }
    return visibleTrees
}

function checkRowBackwards(row, rowIndex) {
    let visibleTrees = []
    let highestTreeForRow = row.at(-1);
    for (let columnIndex = row.length-1; 0 < columnIndex; columnIndex--) {
        const tree = row[columnIndex];
        if (tree > highestTreeForRow) {
            highestTreeForRow = tree;
            visibleTrees.push([rowIndex, columnIndex]);
        }
    }
    return visibleTrees
}

function numberOfVisibleTreesInGrid(grid) {
    let visibleTrees = [];
    let highestTreesForColumns = grid[0];
    let visibleColumnTrees = [];
    // Check column forward
    grid.map((row, rowIndex) => {
        if (rowIndex === 0 || rowIndex === grid.length - 1) {
            // Skip first and last row since they are edge rows
            return;
        }
        // Check rows
        visibleTrees.push(...checkRowForward(row, rowIndex));
        visibleTrees.push(...checkRowBackwards(row, rowIndex));

        row.map((treeHeight, columnIndex) => {
            if (columnIndex === 0 || columnIndex === row.length - 1) {
                return;
            }

            if (treeHeight > highestTreesForColumns[columnIndex]) {
                highestTreesForColumns[columnIndex] = treeHeight;
                visibleColumnTrees.push([rowIndex, columnIndex]);
            }
        })
    })

    visibleTrees.push(...visibleColumnTrees);

    // Check column backwards
    highestTreesForColumns = grid.at(-1);
    visibleColumnTrees = [];

    grid.reduceRight((prevValue, row, rowIndex) => {
        if (rowIndex === 0 || rowIndex === grid.length - 1) {
            // Skip first and last row since they are edge rows
            return;
        }
        // Check column forward
        row.map((treeHeight, columnIndex) => {
            if (columnIndex === 0 || columnIndex === row.length - 1) {
                return;
            }

            if (treeHeight > highestTreesForColumns[columnIndex]) {
                highestTreesForColumns[columnIndex] = treeHeight;
                visibleColumnTrees.push([rowIndex, columnIndex]);
            }
        })
    }, 0)


    return visibleTrees.concat(visibleColumnTrees);
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let splitData = data.split("\n");
    let grid = splitData.map((line) => {
        return line.split("").map((s) => {
            return parseInt(s);
        });
    });

    console.log(grid);

    let treesOnEdge = numberOfEdgeTrees(grid);
    let treesInGrid = numberOfVisibleTreesInGrid(grid);

    let numberOfTreesInGrid = new Set([...treesInGrid.map((val) => val.toString())]).size;

    console.log("Total visible trees", numberOfTreesInGrid + treesOnEdge);
});