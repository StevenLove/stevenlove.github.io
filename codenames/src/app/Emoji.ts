import * as _ from "lodash";
declare var require: any;
let emojiLibrary = require("emoji-named-characters");

console.log("emoji loaded");
// document.write('<script src="https://twemoji.maxcdn.com/twemoji.min.js"></script>');
    
var faces = _.range(128513,128592);
var transport = _.range(128640,128704)	
var food = _.range(parseInt("1F354",16),parseInt("1F373",16));
var activities = _.range(parseInt("1F3A3",16),parseInt("1F3CA",16));
var critters = _.range(parseInt("1F40C",16),parseInt("1F43E",16));
var morefaces = _.range(parseInt("1F466",16),parseInt("1F488",16));
var actionPacked = _.range(parseInt("1F525",16),parseInt("1F529",16))

var ultron:Array<any> = [];

// console.log(emojiLibrary);

// ultron = ultron.concat(faces);

ultron = ultron.concat(morefaces);		
// ultron = _.shuffle(ultron);		
ultron = ultron.concat(critters);		
// ultron = _.shuffle(ultron);		
ultron = ultron.concat(activities);		
// ultron = _.shuffle(ultron);		
// ultron = ultron.concat(transport);		
// ultron = _.shuffle(ultron);
ultron = ultron.concat(food);
// ultron = _.shuffle(ultron);
let removals:Array<any> = [
    "1F3C5","1F3B0","1F3A6","1F6BB","1F6BD","1F379","1F37A","1F37B","1F377","1F459","1F4A9",'1F489','1F46C','1F46D'
]
removals = removals.map(v=>parseInt(v,16));
ultron = _.compact(_.without(ultron,...removals))

ultron = ultron.map(code => {
    return code.toString(16);
})

let exclude = [
    "9⃣",
    "8⃣",
    "7⃣",
    "6⃣",
    "5⃣",
    "4⃣",
    "3⃣",
    "2⃣",
    "1⃣",
    "0⃣",
]

const keycapCode = "20e3";
const emojiPresentationCode = "fe0f";
const hasCode = (char,code) => {
    return [0,1,2].find(index=>{
        let point = char.codePointAt(index);
        // console.log("point",point);
        if(point == undefined) return false;
        let hex = point.toString(16);
        console.log("hex",hex);
        return (hex == code)
    }) != undefined;
}
const char2Codes = char => {
    let codes = [];
    let i = 0;
    let point = char.codePointAt(i);
    while(point != undefined){
        codes.push(point.toString(16));
        ++i;
        point = char.codePointAt(i);
    }
    return codes;
}
const hasCodeStartingWith1f1 = char => {
    let codes = char2Codes(char);
    let found = codes.find(code=>{
        return code.slice(0,3) == '1f1';
    })
    return found != undefined;
}
const shouldInclude = emoji => {
    let char = emoji.character;
    let types = emoji.types;
    console.log(char);
    let hasBadCodes = [keycapCode,emojiPresentationCode].find(code=>{
        return hasCode(char,code);
    }) != undefined;
    let hasGoodTypes = ["noun","adjective"].find(type=>{
        return types.includes(type);
    }) != undefined;
    return !hasBadCodes && hasGoodTypes && !hasCodeStartingWith1f1(char);
}


let map = Object.keys(emojiLibrary).reduce((acc,curr)=>{
    let char = emojiLibrary[curr].character;
    if(!shouldInclude(emojiLibrary[curr])){
        return acc;
    }
    // if(!types.includes("noun")){
    //     return acc;
    // }
    let description = curr;
    acc[char] = description; //{description:description,code:emojiLibrary[curr].};
    return acc;
},{});

let list = Object.keys(map);
console.log("list of emoji",emojiLibrary);

// let list = Object.keys(emojiLibrary).map(key=>emojiLibrary[key].character);
// let emojiMap = {}; 
// list.forEach(emoji=>{
//     emojiMap[emojiLibrary[emoji]]
// })
// console.log("list",map);
const getName = emoji => {
    return map[emoji];
}

export const Emoji = {
    ultron:ultron,
    list:list,
    // list:list,
    getName:getName
    // library:emojiLibrary
}