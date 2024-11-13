//1.Number of matches played per year for all the years in IPL.
const fs = require("fs");
const data = require("./conversion.js");
const matches = data.matches;
const seasons = data.seasons;

let itr;
let yearWise ={};
for(itr = 0;itr<seasons.length;itr++) {
    let seasonTotal = matches.filter((element)=>{
        return element.season==seasons[itr];
    })
    .reduce((acc,element)=>{
        return acc+1;
    },0);
    yearWise[seasons[itr]]=seasonTotal;
}


fs.writeFileSync("../public/output/totalMatchesPerYear.json",JSON.stringify(yearWise,null,2));