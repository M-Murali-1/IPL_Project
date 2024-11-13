const fs = require("fs");

const matches = JSON.parse(fs.readFileSync("../public/output/matches.json"));
const deliveries = JSON.parse(fs.readFileSync("../public/output/deliveries.json"));

function seasonsTotal() {
    let seasons =[];
    matches.forEach((element) => {
        if(!seasons.includes(element.season)) {
            seasons.push(element.season);
        }
    });
    return seasons.sort((a,b)=>a-b);
}
let seasons = seasonsTotal();
//console.log(seasons);


function teamsAll() {
    let teams = [];
    matches.forEach((element)=>{
        if (!teams.includes(element.team1)) {
            teams.push(element.team1);
        }
        if (!teams.includes(element.team2)) {
            teams.push(element.team2);
        }
    })
    return teams.sort();
}
let teams = teamsAll();
//console.log(teams);

module.exports.matches = matches;
module.exports.deliveries = deliveries;
module.exports.teams = teams;
module.exports.seasons = seasons;
