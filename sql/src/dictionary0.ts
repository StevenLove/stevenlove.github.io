import { createDbWorker, WorkerHttpvfs } from "sql.js-httpvfs";
import { memoize } from "./lib";

const workerUrl = new URL("sql.js-httpvfs/dist/sqlite.worker.js",import.meta.url);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
export const getWorker = memoize(async function(path:string){
    return await createDbWorker(
        [
        {
            from: "inline",
            config: {
            serverMode: "full",
            url: path,
            // url: "/Dictionary.db",
            // url: "/example.sqlite3",
            requestChunkSize: 4096,
            },
        },
        ],
        workerUrl.toString(),
        wasmUrl.toString()
    );
})