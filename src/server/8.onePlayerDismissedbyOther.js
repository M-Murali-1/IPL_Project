// 8. Find the highest number of times one player has been dismissed by another player


const fs = require("fs");
const data = require("./conversion.js");
const { match } = require("assert");
const { log } = require("console");
const deliveries = data.deliveries;
function dismissedBy() {
    let playerDismissed = {};
    deliveries.filter((element) => {
        if (element.dismissal_kind !== "" && element.batsman === element.player_dismissed) {
            return element;
        }
    })
        .map((element) => {
            return [element.batsman, element.bowler];
        })
        .forEach((element) => {
            if (playerDismissed[element] === undefined) {
                playerDismissed[element] = Number(1);
            }
            else {
                playerDismissed[element] += Number(1);
            }
        })
    let totalDismissal = Object.entries(playerDismissed).sort((a, b) => b[1] - a[1]);
    let players = totalDismissal[0][0].split(",");
    return players[0] + " is dismissed by " + players[1] + " for " + totalDismissal[0][1] + " times";
}
let value = dismissedBy();
fs.writeFileSync("../public/output/playerDismissedbyOther.json", JSON.stringify(value));
