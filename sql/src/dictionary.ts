import { getWorker } from "./dictionary0";
import {memoize} from './lib';
import * as Worker from "./workerWrapper";

const MAC_DICTIONARY = {
    path:new URL("../MacDictionary.db",import.meta.url).toString(),
    tableName:"xxxxxentries",
    wordRowName:"A",
    getDefinitionTextFromRow:row=>"undefined",
}
const AYESH_DICTIONARY = {
    path:new URL("../Dictionary.db",import.meta.url).toString(),
    tableName:"xxxxxentries",
    wordRowName:"word",
    getDefinitionTextFromRow:function(row:Record<("word"|"wordtype"|"definition"),string>):string{
        return `${row.word} - ${row.wordtype}\n${row.definition}`
    }
}
const DEFINITION_DICTIONARY = AYESH_DICTIONARY
const WORDLIST_DICTIONARY = MAC_DICTIONARY

const prepareWordList = memoize(async function setup(){
    let worker = await getWorker(WORDLIST_DICTIONARY.path);
    let dict = await worker.db.query(`SELECT ${WORDLIST_DICTIONARY.wordRowName} FROM ${WORDLIST_DICTIONARY.tableName}`);
    let words = dict.map(row=>row[WORDLIST_DICTIONARY.wordRowName]); // convert from [{word:"aardvark"},{word:"apple"} to ["aardvark","apple"]
    return await Worker.postDictionary(words);
})


export const searchDictionaryWithRegexp = memoize(async function searchDictionaryWithRegexp(rx:RegExp){
    await prepareWordList();
    return Worker.postRegex(rx);
});
  

export const define = memoize(
    // debounce( // debouncing is fine but if we cancel the call then we will store the result in the cache and never actually get the definition
        async function define(word:string):Promise<Array<string>>{
            let worker = await getWorker(DEFINITION_DICTIONARY.path);
            let query = `SELECT * FROM ${DEFINITION_DICTIONARY.tableName} WHERE ${DEFINITION_DICTIONARY.wordRowName} = ?`
            let rows = await worker.db.query(query,[word]) as Array<Record<string,string>>
            return rows.map(DEFINITION_DICTIONARY.getDefinitionTextFromRow);
        }
    // ,50)
)
export const preloadWordList = function(){prepareWordList()}