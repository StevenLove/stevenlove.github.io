import {GridObj} from "./grid";
export interface RawLog{
    date:string,
    time:string,
    pid:number,
    tid:number,
    uid?:number,
    level:string,
    tag:string,
    message:string,
}
export interface IntermediateLogObj{
    datetime?:string,
    date: string,
    time: string,
    level: string,
    tag: string,
    message: string,
    pid:number,
    tid:number,
    uid?:number,
    domain?:string,
  }
  

  // date, time, pid, tid, level (W or I or E or D), tag, msg

let date = "([0-9-]+)";
let time = "([0-9:]+)";
let pid = "([0-9]+)";
let tid = "([0-9]+)";
let uid = "([0-9]+)";
let level = "(W|I|E|D)";
let tag = "([^:]+)";
let msg = "([^\n]+)";

// let regexString = `${date} +${time} +${pid} +${tid} ${uid}? +${level} +${tag}: ${msg}`;
// let regex = new RegExp(regexString);
let regex = /([0-9-]+) +([0-9:.]+) +(\d+) +(\d+) +(\d+)? ?(.) (.+?): (.*)/;

function parseAsLogLineWithUID(matches:RegExpMatchArray){
    let date = matches[1];
    let time = matches[2];
    let pid = parseInt(matches[3]||"0");
    let tid = parseInt(matches[4]||"0");
    let uid = parseInt(matches[5]||"0");
    let level = matches[6];
    let tag = matches[7];
    let msg = matches[8];
    return {
        date:date,
        time:time,
        // datetime: date + " " + time,
        level: level,
        tag: tag,
        message: msg,
        pid: pid,
        tid: tid,
        uid: uid,
    } as RawLog;
}
function parseAsLogLineWithoutUID(matches:RegExpMatchArray){
    let date = matches[1];
    let time = matches[2];
    let pid = parseInt(matches[3]||"0");
    let tid = parseInt(matches[4]||"0");
    // no uid
    let level = matches[6];
    let tag = matches[7];
    let msg = matches[8];
    return {
        date:date,
        time:time,
        // datetime: date + " " + time,
        level: level,
        tag: tag,
        message: msg,
        pid: pid,
        tid: tid,
        uid: -1,
    } as RawLog;
}

export function parseAsLogLine(line: string): RawLog|false {
 let whole = line.match(regex);
//  console.log("whole", whole?.slice(1));
 if(whole){
    if(whole[5] && parseInt(whole[5]) > 0){
        // console.log("uid", whole[5]);
        return parseAsLogLineWithUID(whole);
    }else{
        // console.log("no uid", whole);
        return parseAsLogLineWithoutUID(whole);
    }
 }else{
    return false;
 }
}

export function parseAsCodeSection(logline:string):string|false{
  let whole = logline.match(/^--------- beginning of (\S+)/);
  if(whole){
    return whole[1] as string;
  }
  return "";
}

