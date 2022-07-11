import { createDbWorker } from "sql.js-httpvfs";
// import {Database} from "./sql/dist/8c500ff8a49b305f9ab6

const workerUrl = new URL(
  "sql.js-httpvfs/dist/sqlite.worker.js",
  import.meta.url
);
const wasmUrl = new URL("sql.js-httpvfs/dist/sql-wasm.wasm", import.meta.url);
let ready = false;
let loadPromise = null;

function load() {
  if(loadPromise) return loadPromise;
  loadPromise = createDbWorker(
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
  ).then(worker=>{
    return worker.db.query(`SELECT word FROM xxxxxentries`)
    .then(v=>{
      return v.map(row=>row.word);
    })
    // return loadPromise
  })

  return loadPromise;
}

async function searchDictionary(str:string){
  let dic = await load();
  /* remove duplicate chars from the str */
  let withoutDupes = str.split("")
    .filter(str=>/^[a-z]/i.test(str.charAt(0))) // only letters
    .filter((v,i,a)=>a.indexOf(v)===i); // remove duplicates
  if(withoutDupes.length<0) return ["no word supplied"];
  if(withoutDupes.length>12) return ["too many chars"];
  /* get a regexp that matches any of the chars in the str */
  let regexp = new RegExp(`^[${withoutDupes.join("")}]+$`, "gi");
  // let regexp = new//

  console.log("searching for", regexp);
  let filtered = dic.filter(word => {
    // console.log("row",row);
    let test = regexp.test(word);
    // console.log("test",test);
    return !!test;
  });


  return filtered.filter((v,i,a)=>a.indexOf(v)===i);

}

// function objWordMatchesRegex(obj,regexp){
//   return regexp.test(JSON.stringify(obj.word));
// }

function setupHTML(){

  async function submit(){
      let input = (document.getElementById("input") as HTMLInputElement).value;
      let result = await searchDictionary(input);
      console.log("result", result);
      let x = (document.getElementById("textarea") as HTMLTextAreaElement);
      console.log("x", x);
      x.value = result.join("\n");
  }

  /* Submit when we press enter */
  document.getElementById("input")?.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        submit();
    }
  });

  document.getElementById("button")?.addEventListener("click", submit);

}
setupHTML();
