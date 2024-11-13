//9.Find the bowler with the best economy in super overs


const fs = require("fs");
const data = require("./conversion.js");
const deliveries = data.deliveries;
function superOverEconomical() {
    let individualBowler = {};
    deliveries.filter((element) => {
        if (element.is_super_over === "1") {
            return element;
        }
    })
    .map((element) => {
        return [element.bowler, Number(element.batsman_runs), Number(element.wide_runs) + Number(element.noball_runs)]
    })
    .forEach((element) => {
        if (individualBowler[element[0]] === undefined) {
            individualBowler[element[0]] = { "runs": 0, "balls": 0 };
        }
        individualBowler[element[0]]["runs"] += (Number(element[1]) + Number(element[2]));
        if (element[2] === 0) {
            individualBowler[element[0]]["balls"] = individualBowler[element[0]]["balls"] + Number(1);
        }
    });

    let bowlerEconomy = Object.entries(individualBowler).map((element) => {
        let runs = element[1]["runs"];
        let balls = element[1]["balls"];
        let overs = (Math.floor(balls / 6)) + (balls % 6) / 10;
        let economy = (runs / overs).toFixed(2);
        return [element[0], economy];
    })
    bowlerEconomy.sort((element1, element2) => element1[1] - element2[1]);
    return bowlerEconomy[0];
}
let economicalBowler = superOverEconomical();
fs.writeFileSync("../public/output/superOverEconomicalBowler.json",JSON.stringify({"Super Over Economical Bowler":economicalBowler},null,2));