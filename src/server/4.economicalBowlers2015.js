// 4.Top 10 economical bowlers in the year 2015

const fs = require("fs");
const data = require("./conversion.js");
const matches = data.matches;
const teams = data.teams;
const deliveries = data.deliveries;

function economicalBowler() {
    let bowlers2015=[];
    let matId2015 = matches.filter((element)=>{
        if(element.season==2015) {
            return element;
        }
    })
    .map((element)=>{
        return element.id;
    });

    let individualBall = deliveries.filter((element)=>{
        if(matId2015.includes(element.match_id)) {
            return element;
        }
    })
    .map(element=>{
        return [element.bowler,Number(element.batsman_runs),Number(element.wide_runs)+Number(element.noball_runs)]
    });

    // console.log(individualBall);

    let individualBowler = [];
    individualBall.forEach((element)=> {
        if(individualBowler[element[0]]===undefined) {
            individualBowler[element[0]]={};
            individualBowler[element[0]]["runs"]=Number(element[1])+Number(element[2]);
            if(element[2]==0) {
                individualBowler[element[0]]["balls"]=Number(1);
            }
            else {
                individualBowler[element[0]]["balls"]=Number(0);
            }
        }
        else {
            individualBowler[element[0]]["runs"]+=Number(element[1])+Number(element[2]);
            if(element[2]==0) {
                individualBowler[element[0]]["balls"]+=Number(1);
            }
        }
    })
    let bowlerEconomy = Object.entries(individualBowler).map((element)=>{
        let runs = element[1]["runs"];
        let balls = element[1]["balls"];
        let overs = (Math.floor(balls/6))+(balls%6)/10;
        let economy = (runs/overs).toFixed(2);
        return [element[0],economy];
    })
    bowlerEconomy.sort((element1,element2)=>element1[1]-element2[1]);
    return bowlerEconomy.slice(0,10);

}

let bowlerEconomy = economicalBowler();
console.log(bowlerEconomy);


fs.writeFileSync("../public/output/economicalBowlers2015.json",JSON.stringify(Object.fromEntries(bowlerEconomy),null,2));

