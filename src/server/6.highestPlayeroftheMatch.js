// 6. Find a player who has won the highest number of Player of the Match awards for each season

const fs = require("fs");
const data = require("./conversion.js");
const matches = data.matches;
const seasons = data.seasons;

let itr;
function HighestPlayer() {
    let highestPlayerMatch = {};
    for (itr = 0; itr < seasons.length; itr++) {

        let matchPlayer = {};
        matches.filter((element) => {
            return element.season === seasons[itr];
        })
            .map((element) => {
                return element.player_of_match;
            })
            .forEach(element => {
                if (matchPlayer[element] === undefined) {
                    matchPlayer[element] = Number(1);
                }
                else {
                    matchPlayer[element] += Number(1);
                }
            });
        let perYear =  Object.entries(matchPlayer).sort((a, b) => b[1] - a[1])[0];
        highestPlayerMatch[seasons[itr]] ={};
        highestPlayerMatch[seasons[itr]]["Player"] =perYear[0];
        highestPlayerMatch[seasons[itr]]["Awards"] = perYear[1];
    }
    return highestPlayerMatch;
}

let highestPlayerMatch = HighestPlayer();

fs.writeFileSync("../public/output/highestPlayerMatch.json", JSON.stringify(highestPlayerMatch, null, 2));