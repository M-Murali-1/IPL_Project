// 7.Find the strike rate of a batsman for each season
const fs = require("fs");
const data = require("./conversion.js");
const deliveries = data.deliveries;
const matches = data.matches;
const seasons = data.seasons;


let itr;
let batter = "V Kohli";
function strikeRatePerYear() {
    let strikeRatePerSeason = {};
    for (itr = 0; itr < seasons.length; itr++) {
        let mat_id = matches.filter((element) => {
            if (element.season === seasons[itr])
                return element;

        })
            .map((element) => {
                return element.id;
            });
        let score = deliveries.filter((element) => {
            if (mat_id.includes(element.match_id) && element.batsman == batter) {
                return element;
            }
        })
            .map((element) => {
                return element.batsman_runs;
            });
        let total = score.reduce((acc, element) => {
            return acc += Number(element);
        }, 0);
        let balls = score.length;
        strikeRatePerSeason[seasons[itr]] = {};
        strikeRatePerSeason[seasons[itr]]["Runs"] = total;
        strikeRatePerSeason[seasons[itr]]["Balls"] = balls;
        strikeRatePerSeason[seasons[itr]]["StrikeRate"] = ((total / balls) * 100).toFixed(2);
    }
    return strikeRatePerSeason;
}
let strikeRatePerSeason = strikeRatePerYear();

fs.writeFileSync("../public/output/strikeRatePerYear.json",JSON.stringify(strikeRatePerSeason,null,2));