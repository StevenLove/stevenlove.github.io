import * as ss from "string-similarity"
import { IntermediateLogObj } from "./parsing";

/* Function to copy text from the clipboard */
export function copyFromClipboard():Promise<string> {
    return new Promise((resolve,reject)=>{
        navigator.clipboard.readText().then(resolve,reject);
    });
}

/* Function to time how long a function takes */
 function timeFunction<T>(label:string,method:Function){
    let start = Date.now();
    method();
    let end = Date.now();
    console.log(`${label||"Function"} took ${(end-start)}ms (function)`);
}

/* Function to time how long a promise takes */
 function timePromise<T>(label:string,promise:Promise<T>):void {
    let start = Date.now();
    promise.finally(()=>{
        console.log(`${label||"Promise"} took ${Date.now()-start}ms (promise)`);
    });
}

export function timeToColor(ms:number):string {
    let msString = (ms.toString(16))
    // .slice(0,-1)
    .padStart(8,"0");
    // console.log(msString);
    let r = parseInt(msString.slice(-8,-6),16);
    let g = parseInt(msString.slice(-6,-4),16);
    let b = parseInt(msString.slice(-4,-2),16);
    let a = parseInt(msString.slice(-2),16);
    // console.log("rgb",r,g,b,a);
    if(b%2===0){a = 256-a;}
    if(g%2===0){b = 256-b;}
    if(r%2===0){g = 256-g;}
    return `rgba(${r},${g},${b},${a/255})`;
}
// window.timeToColor = timeToColor;

function timeWithLabel<T>(label:string,promiseOrMethod:Promise<T>|Function):void {
    // console.log(`${label}`);
    if(promiseOrMethod instanceof Function){
        timeFunction(label,promiseOrMethod);
    }else if(promiseOrMethod instanceof Promise){
        timePromise(label,promiseOrMethod);
    }else{
        console.error("Invalid argument to time 2 ",promiseOrMethod);
    }
}

export function areSimilar(s1:string,s2:string):boolean {
    return ss.compareTwoStrings(s1,s2)>0.7;
}
export function similarToAnyIn(str:string,arr:string[]):boolean {
    return arr.some(s=>areSimilar(str,s) && str!==s);
}
export function similarToAnyInIntermediateLogObj(str:string,arr:IntermediateLogObj[]):boolean {
    return arr.some(s=>areSimilar(str,s.message));
}
// globalThis.ss = ss;
// window.ss = ss;
// window.areSimilar = areSimilar;

/* function to determine if arg is a string */
function isString(arg:any):arg is string {
    return typeof arg === "string";
}

export function time<T>(arg0:string|Promise<T>|Function,arg1?:Promise<T>|Function):void {
    if(isString(arg0)){
        timeWithLabel(arg0,arg1 as (Function|Promise<T>));
    }else if(arg0 instanceof Promise){
        timeWithLabel("",arg0);
    }else if(arg0 instanceof Function){
        timeWithLabel("",arg0);
    }else{
        console.error("Invalid argument to time 1 ",arg0,arg1);
    }
}
