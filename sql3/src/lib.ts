export function memoize(method:Function) {
    let cache:Record<string,any> = {};
    
    return async function(...args:any[]) {
        // let args = JSON.stringify(arguments);
        let argString = stringifyEvenWithRegex(arguments);
        // let time = Date.now();
        if(cache[argString]){
            console.log("cache hit",argString,cache[argString]);
        }else{
            cache[argString] = method.apply(this, arguments);
        }
        return cache[argString];
    };
}


function stringifyEvenWithRegex(obj:any):string {
    if(obj.hasOwnProperty('callee')){
        obj = Array.from(obj);
    }
    if(Array.isArray(obj)){
        return "["+obj.map(stringifyEvenWithRegex).join(",")+"]";
    }
    else if (obj instanceof RegExp) {
        return obj.toString();
    }
    return JSON.stringify(obj);
}

export function debounce(method:Function,time:number){
    let timeout:NodeJS.Timeout;
    return async function(...args:any[]) {
        clearTimeout(timeout);
        return new Promise((res,rej)=>{
            timeout = setTimeout(()=>{
                res(method.apply(this,arguments));
            },time);
        })
        
    }
}

// export const FILTERS = {
//     "onlyHasLetters": function(str:string):boolean{return /^[a-z]+$/i.test(str)},
//     "noDupes":function(v:any,i:Number,a:Array<any>){return a.indexOf(v)===i}
//   }

// export function timeoutPromise<T extends any>(ms:number,promise:Promise<T>):Promise<T>{
//     /* wrap a promise and reject it if it takes too long */
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             console.log("TIMED OUT PROMISE");
//             reject("timeout");
//         },ms);
//         promise.then(resolve,reject);
//     });
// }

// let times:Record<string,number> = {};
// export function timeStart(name:string){
//     // if(!times[name]){
//         times[name] = Date.now();
//     // }else{
//     //     let diff = Date.now()-times[name]
//     //     console.log(name,"took",diff/1000,"seconds");
//     // }
// }
// export function timeEnd(name:string){
//     let diff = Date.now()-times[name]
//     console.log(name,"took",diff/1000,"seconds");
//     delete times[name];
// }

// /* detect if the user is on Mac */
// export function isMac():boolean{
//     return navigator.platform.toLowerCase().indexOf("mac")>-1;
// }

// export function from(a:number,b:number){return Math.floor(Math.random()*(b-a+1))+a;}
// export function oneOf<T>(array:T[]):T{return array[Math.floor(Math.random()*array.length)];}
// export function getRandomChar(){return String.fromCharCode(Math.floor(Math.random()*26)+97)}