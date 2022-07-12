import {RpcProvider} from 'worker-rpc';
import { WEB_WORKER_TIMEOUT } from './constants';


const remoteWorker = new Worker('./dist/worker.js',{type:'module'}),
    rpcProvider = new RpcProvider(
        (message, transfer) => remoteWorker.postMessage(message, transfer)
    ,WEB_WORKER_TIMEOUT);

remoteWorker.onmessage = e => {
    rpcProvider.dispatch(e.data);
}


export function postDictionary(words:any[]){
    rpcProvider.rpc('dict', words).then(()=>{
        console.log("postDictionary done");
    })
}
export function postRegex(regex:RegExp):Promise<string[]>{
    return rpcProvider.rpc('regexp',regex)
}