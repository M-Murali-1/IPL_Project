// 3.Extra runs conceded per team in the year 2016

const fs = require("fs");
const data = require("./conversion.js");
const matches = data.matches;
const teams = data.teams;
const deliveries = data.deliveries;

function extraRuns() {
    let result ={};
    let matId2016 = matches.filter((element)=>{
        if(element.season==2016) {
            return element;
        }
    })
    .map((element)=>{
        return element.id;
    });
    for(itr=0;itr<teams.length;itr++) {
        let extraPerTeam = deliveries.filter((element)=>{
            if(matId2016.includes(element.match_id) && element.batting_team === teams[itr]) {
                return element;
            }
        })
        .reduce((acc,element)=>{
            return acc+Number(element.extra_runs);
        },0);
        if(extraPerTeam==0) {
            continue;
        }
        result[teams[itr]]=extraPerTeam;
    }
    return result;
}
let result = extraRuns();


fs.writeFileSync("../public/output/extraRuns2016.json",JSON.stringify(result,null,2));

