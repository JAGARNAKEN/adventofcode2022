var fs = require('fs');

console.log("starting ");
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

function rockGame(opponent) {
    switch (opponent) {
        case MatchResult.Draw:
            return MatchResult.Draw + Types.Rock;
        case MatchResult.Win:
            return MatchResult.Win + Types.Paper;
        case MatchResult.Lose:
            return MatchResult.Lose + Types.Scissor;
    }
}

function paperGame(opponent) {
    switch (opponent) {
        case MatchResult.Lose:
            return MatchResult.Lose  + Types.Rock;
        case MatchResult.Draw:
            return MatchResult.Draw  + Types.Paper;
        case MatchResult.Win:
            return MatchResult.Win + Types.Scissor;
    }
}

function scissorGame(opponent) {
    switch (opponent) {
        case MatchResult.Win:
            return MatchResult.Win  + Types.Rock;
        case MatchResult.Lose:
            return MatchResult.Lose  + Types.Paper;
        case MatchResult.Draw:
            return MatchResult.Draw + Types.Scissor;
    }
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let decodedGames = data.split("\n").map((val) => {
        return val.split(" ")
            .map((key) => {
                switch (key) {
                    case "A":
                        return Types.Rock;
                    case "B":
                        return Types.Paper;
                    case "C":
                        return Types.Scissor;
                    case "X":
                        return MatchResult.Lose;
                    case "Y":
                        return MatchResult.Draw;
                    case "Z":
                        return MatchResult.Win;
                }
            })
    });
    
    let gameResults = decodedGames.map((game) => {
        switch (game[0]) {
            case Types.Rock:
                return rockGame(game[1]) 
            case Types.Paper:
                return paperGame(game[1]) 
            case Types.Scissor:
                return scissorGame(game[1]) 
        }
    })

    let finalScore = gameResults.reduce((sum, val) => {
        return sum + val;
    });

    console.log(finalScore);
});