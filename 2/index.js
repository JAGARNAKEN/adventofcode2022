var fs = require('fs');

console.log("starting ");

const ResultIndex = {
    Draw: 0,
    Win: 1,
    Lose: 2,
};

const TypeIndex = {
    Rock: 0,
    Paper: 1,
    Scissor: 2
};

const MatchResult = {
    Lose: 0,
    Draw: 3,
    Win: 6
};

const Types = {
    Rock: 1,
    Paper: 2,
    Scissor: 3,
};

const typesList = [Types.Rock, Types.Paper, Types.Scissor];

function typeAfterResult(typeIndex, resultIndex) {
    const listIndex = (typeIndex + resultIndex) % typesList.length;
    return typesList[listIndex];
}

function resultToIndex(result) {
    switch (result) {
        case MatchResult.Draw:
            return ResultIndex.Draw;
        case MatchResult.Lose:
            return ResultIndex.Lose;
        case MatchResult.Win:
            return ResultIndex.Win;
    }
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let decodedGames = data.split("\n")
        .map((val) => {
        return val.split(" ")
            .map((key) => {
                switch (key) {
                    case "A":
                        return TypeIndex.Rock;
                    case "B":
                        return TypeIndex.Paper;
                    case "C":
                        return TypeIndex.Scissor;
                    case "X":
                        return MatchResult.Lose;
                    case "Y":
                        return MatchResult.Draw;
                    case "Z":
                        return MatchResult.Win;
                }
            })
        });
    
    let gameResults = decodedGames.map(([setup, result]) => {
        return result + typeAfterResult(setup, resultToIndex(result));
    })

    let finalScore = gameResults.reduce((sum, val) => {
        return sum + val;
    });

    console.log(finalScore);
});