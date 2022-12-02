var fs = require('fs');

console.log("starting ");

// Lose = 0
// Draw = 3
// Win = 6

// Rock = 1
// Paper = 2
// Scicor = 3

const MatchResult = {
    Lose: 0,
    Draw: 3,
    Win: 6
};

const Types = {
    // Rock: "Rock",
    // Paper: "Paper",
    // Scissor: "Scissor",
    Rock: 1,
    Paper: 2,
    Scissor: 3,
};

function rockGame(opponent) {
    switch (opponent) {
        case Types.Rock:
            return MatchResult.Draw  + Types.Rock;
        case Types.Paper:
            return MatchResult.Win  + Types.Paper;
        case Types.Scissor:
            return MatchResult.Lose + Types.Scissor;
    }
}

function paperGame(opponent) {
    switch (opponent) {
        case Types.Rock:
            return MatchResult.Lose  + Types.Rock;
        case Types.Paper:
            return MatchResult.Draw  + Types.Paper;
        case Types.Scissor:
            return MatchResult.Win + Types.Scissor;
    }
}

function scissorGame(opponent) {
    switch (opponent) {
        case Types.Rock:
            return MatchResult.Win  + Types.Rock;
        case Types.Paper:
            return MatchResult.Lose  + Types.Paper;
        case Types.Scissor:
            return MatchResult.Draw + Types.Scissor;
    }
}

fs.readFile('input.txt', 'utf-8', (err, data) => {
    let decodedGames = data.split("\n").map((val) => {
        return val.split(" ")
            .map((key) => {
                switch (key) {
                    case "A":
                    case "X":
                        return Types.Rock;
                    case "B":
                    case "Y":
                        return Types.Paper;
                    case "C":
                    case "Z":
                        return Types.Scissor;
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