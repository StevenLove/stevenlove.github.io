// we can't directly import dictionary because it imports sql.js-httpvfs which tries to use `document`
// and that's not available in a worker.
import * as lib from "./lib";
import {RpcProvider} from 'worker-rpc';
import { MAX_RESULTS } from "./constants";


let words:Array<string> = [];


const rpcProvider = new RpcProvider(
    (message, transfer) => postMessage(message, transfer)
);

onmessage = e => {
  return rpcProvider.dispatch(e.data);
}

// rpcProvider.registerRpcHandler('definition', (w:string) => {
//   let matches = words.filter(word=>word==w);
//   return matches.map(m=>JSON.stringify(m)).join("\n");
// });
rpcProvider.registerRpcHandler('dict', (w:Array<any>) => {
  words = w
  return true;
});

rpcProvider.registerRpcHandler('regexp', (r:RegExp) => {
  let time = new Date().getTime();
  let result = words.filter(w=> r.test(w));
  let t2 = new Date().getTime();
  console.log("took",(t2-time)/1000,"seconds to filter by",r);
  let numResults = result.length;
  if(numResults > MAX_RESULTS) {
    result = result.slice(0,MAX_RESULTS);
    result.push((numResults-MAX_RESULTS)+" more results not shown...");
  }
  result = result.filter(lib.FILTERS.noDupes);
  let t3 = new Date().getTime();
  console.log("took",(t3-t2)/1000,"seconds to filter out duplicates");
  return result;
});


