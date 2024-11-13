//5. Find the number of times each team won the toss and also won the match

const fs = require("fs");
const data = require("./conversion.js");
const matches = data.matches;
const teams = data.teams;

let itr;
let tossMatchWon ={};
for(itr=0;itr<teams.length;itr++) {
    let perTeam = matches.filter((element)=>{
        if(element.toss_winner===teams[itr] && element.winner===teams[itr])
            return element;
    })
    tossMatchWon[teams[itr]]=perTeam.length;

}


fs.writeFileSync("../public/output/tossandMatchWon.json",JSON.stringify(tossMatchWon,null,2));

