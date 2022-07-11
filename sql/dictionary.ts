import { createDbWorker } from "sql.js-httpvfs";
import {memoize} from './lib';

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);

export const load = memoize(async function(){
    let worker = await createDbWorker(
        [
        {
            from: "inline",
            config: {
            serverMode: "full",
            url: new URL("Dictionary.db", import.meta.url).toString(),
            // url: "/Dictionary.db",
            // url: "/example.sqlite3",
            requestChunkSize: 4096,
            },
        },
        ],
        workerUrl.toString(),
        wasmUrl.toString()
    );
    let dict = await worker.db.query(`SELECT word FROM xxxxxentries`);
    return dict.map(row=>row.word); // convert from [{word:"aardvark"},{word:"apple"} to ["aardvark","apple"]
})


export async function searchDictionaryWithRegexp(rx:RegExp){
    let dic = await load();
    return dic.filter(rx.test.bind(rx)) // filter out non-matches
}
  