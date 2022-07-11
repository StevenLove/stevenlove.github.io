export function memoize(method:Function) {
    let cache:Record<string,any> = {};
    
    return async function() {
        let args = JSON.stringify(arguments);
        cache[args] = cache[args] || method.apply(this, arguments);
        return cache[args];
    };
}

export const FILTERS = {
    "onlyHasLetters": function(str:string):boolean{return /^[a-z]+$/i.test(str)},
    "noDupes":function(v:any,i:Number,a:Array<any>){return a.indexOf(v)===i}
  }