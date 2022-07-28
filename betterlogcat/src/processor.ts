import * as lib from './lib';
import {GridObj} from './grid';
import { IntermediateLogObj,parseAsCodeSection,parseAsLogLine } from './parsing';
import { isLocalURL } from 'next/dist/shared/lib/router/router';
// import * as ss from "string-similarity"

/* 
split the string into lines
track which code section we are in
keep parse errors
 */
function firstPass(l:string):IntermediateLogObj[]{
     // split one giant string into an array of lines
     let lines:string[] = [];
     lib.time("split lines",()=>lines = l.split("\n"));
     // track which section we are in (main|system|radio|...)
     let sectionName = "unknown"

     let allLogs = [] as IntermediateLogObj[];

     lines.forEach((line,idx,arr)=>{
        let l = parseAsLogLine(line)
        if(l){
          let il = l as IntermediateLogObj;
          il.domain = sectionName;
          allLogs.push(il);
        }else{
          let s = parseAsCodeSection(line);
          if(s){
            sectionName = s;
          }else{
            allLogs.push({
                date: "",
                time: "Parse Error",
                level: "",
                tag: "",
                message: line,
                pid: 0,
                tid: 0,
                uid: 0,
                domain: sectionName,
            } as IntermediateLogObj);
            console.log("unhandled line",line);
          }
        }
      })
    return allLogs;
}

/* 
filter out verity logs
filter duplicates
*/
function secondPass(input:IntermediateLogObj[]):IntermediateLogObj[]{
    let out = [] as IntermediateLogObj[];
    // logs = logs.filter(l=>!l.message.match(/Failed to measure fs-verity, errno 1:.*/));
    input.forEach(l=>{
        if(l.message.match(/Failed to measure fs-verity, errno 1:.*/)){
            return;
        }
        let mostRecent = out[out.length-1];
        if(mostRecent && lib.areSimilar(l.message,mostRecent.message)){
            mostRecent.message = "(x2)" + mostRecent.message;
            return;
        }
        out.push(l);
    })
    return out;
}

function thirdPass(input:IntermediateLogObj[]):GridObj[]{
    let out = [] as GridObj[];
    input.forEach((l,idx,arr)=>{
        let g = convertIntermediateLogToGrid(l);
        if(idx>0){
            let prev = arr[idx-1] as IntermediateLogObj;
            let msElapsed = (new Date(l.date+" "+l.time).getTime() - new Date(prev.date+" "+prev.time).getTime())
            // let g = convertIntermediateLogToGrid(l);
            let opacity = Math.min(msElapsed/200,0.5);
            g.datecolor = "rgba(100,100,0,"+opacity+")";
            g.datetime = l.date+" "+l.time + "(+"+msElapsed+"ms)";
            // l.datetime = "+"+msElapsed+"ms";
        }
        out.push(g)
    })
    return out;
}

function processTextWithMultiplePasses(l:string):GridObj[]{
    let x:IntermediateLogObj[] = [];
    let g = [] as GridObj[];
    lib.time("first pass",()=>x = firstPass(l));
    lib.time("second pass",()=>x = secondPass(x));
    lib.time("third pass",()=>g = thirdPass(x));
    return g;
}

function processTextWithOnePass(l:string):GridObj[]{
    // split one giant string into an array of lines
    let lines:string[] = [];
    lib.time("split lines",()=>lines = l.split("\n"));
    // track which section we are in (main|system|radio|...)
    let sectionName = "unknown"

    let allLogs: IntermediateLogObj[] = [];
    let taggedLogs:Record<string,IntermediateLogObj[]> = {};


    lines.forEach((line,idx,arr)=>{
      let l = parseAsLogLine(line)
      if(l){
        let il = l as IntermediateLogObj;
        // filter out lines that are unimportant
        if(il.message.match(/Failed to measure fs-verity, errno 1:.*/)){
          console.log("REMOVE",il.message);
          return;
        }

        taggedLogs[il.tag] = taggedLogs[il.tag] || [];
        (taggedLogs[il.tag] as IntermediateLogObj[]).push(il);




        // let prev = (allLogs[allLogs.length-1]);
        // if(prev){
        //   let prevDateTime = (prev.date + " " + prev.time);
        //   il.datetime = (il.date+" "+il.time)
        //   // .split("").map((c,i)=>{
        //   //   if(c == prevDateTime.charAt(i)){
        //   //     return "-";
        //   //   }else{
        //   //     return c;
        //   //   }
        //   // }).join("")

        //   // il.datetime = "+" + (new Date(il.datetime).getTime() - new Date(prevDateTime).getTime())/1000
          
        // }
        il.domain = sectionName;
        // allLogs.push(il);
      }else{
        let s = parseAsCodeSection(line);
        if(s){
          sectionName = s;
          // currentSection = sections[s] = [];
        }else{
          console.log("unhandled line",line);
        }
      }
    })

    Object.keys(taggedLogs).forEach(tag=>{

      let out:IntermediateLogObj[] = [];
      let removedLines = 0;
      
      
      taggedLogs[tag]?.forEach(
        l=>{
          if(!lib.similarToAnyInIntermediateLogObj(l.message,out)){
            // if(tag=="ACDB-LOADER")console.log("not similar",l.message);
            out.push(l);
          }else{
            // if(tag=="ACDB-LOADER")console.log("similar",l.message);
            removedLines++;
          }
        }
      )
      console.log("removed",removedLines,"lines from",tag);
      // console.log("taggedLogs",tag,taggedLogs[tag]);
      out.forEach(l=>allLogs.push(l))
      
      
      // let logs = taggedLogs[tag];
      // if(!logs){
      //   return
      // }else{
      //   taggedLogs[tag] = logs.reduce((acc,curr)=>{
      //     return acc;
      //   },[])
      // }

        

        // allLogs.push(il)
      // })
      // allLogs.push
    });

    return allLogs.map(convertIntermediateLogToGrid);


    

    // console.log(sections);


    // let processed:LogObj[] = [];
    // let filtered:LogObj[] = [];

    // console.log("processing...");

    // // const filter = (l:LogObj) => l.level=="E";
    // const filter = (l:LogObj) => true;
    // lib.time("process lines",()=>processed = lines.map(parseAsLogLine));
    // lib.time("filter lines",()=>filtered = processed.filter(filter));

    /* noop convert log objs to grid objs */
    // lib.time("convert to grid objs",()=>{
    //   allLogs = lines.map(l=>{
    //     return parseAsLogLine(l) as grid.GridObj;
    //   });
    // })
    
    // lib.time("set row data",()=>{
    //   setRowData(allLogs);
    // })
    // setRowData(sections[firstSectionName] as LogObj[]);
}

export function processText(l:string):GridObj[]{
    return processTextWithMultiplePasses(l);
}




function convertIntermediateLogToGrid(log:IntermediateLogObj):GridObj{
    return {
        datetime: log.datetime || (log.date + " " + log.time),
        level: log.level,
        tag: log.tag,
        message: log.message,
        pid: log.pid,
        tid: log.tid,
        domain: log.domain || "",
    }
}