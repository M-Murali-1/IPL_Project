// 2.Number of matches won per team per year in IPL.

const fs = require("fs");
const data = require("./conversion.js");
const matches = data.matches;
const seasons = data.seasons;
const teams = data.teams;

let itr1,itr2;
let totalMatches = {};

for(itr1=0;itr1<seasons.length;itr1++) {
    let seasonMatches ={};
    for(itr2=0;itr2<teams.length;itr2++) {
        let countTeam = matches.filter(element=>{
            if(element.season==seasons[itr1] && element.winner == teams[itr2]) {
                return element;
            }
        })
        .reduce((acc,element)=>{
            return acc+1;
        },0);
        if(countTeam==0)
            continue;
        seasonMatches[teams[itr2]]=countTeam;  
    }
    totalMatches[seasons[itr1]]=seasonMatches;
}
console.log(totalMatches);


fs.writeFileSync("../public/output/NoofMatchesWonByTeamPerYear.json",JSON.stringify(totalMatches,null,2));
