import {RpcProvider} from 'worker-rpc';
import { WEB_WORKER_TIMEOUT } from './constants';
// import { memoize } from './lib';


const remoteWorker = new Worker('./dist/worker.js',{type:'module'}),
    rpcProvider = new RpcProvider(
        (message, transfer) => remoteWorker.postMessage(message, transfer)
    ,WEB_WORKER_TIMEOUT);

// worker.onmessage = e => 
remoteWorker.onmessage = e => {
    // console.log("on message",e);
    rpcProvider.dispatch(e.data);
}




// let remoteWorker = new Worker(
//     './dist/worker.js',
//     // URL.createObjectURL('./src/worker.js'), import.meta.url),
//     // new URL('./src/worker.js', import.meta.url),
//     {type: 'module'}
// );





// remoteWorker.postMessage("ping");
// export async function getDefinition(word:string){
//     return rpcProvider.rpc('definition',word);
// }


export function postDictionary(words:any[]){
    rpcProvider.rpc('dict', words).then(()=>{
        console.log("postDictionary done");
    })
}

// rpcProvider.registerRpcHandler('regexp', (rx:string) => ')
export function postRegex(regex:RegExp):Promise<string[]>{
    return rpcProvider.rpc('regexp',regex)
    // .then(a=>{
    //     // console.log("we got back",a);
    //     UI.displayResults(a);
    // });
}