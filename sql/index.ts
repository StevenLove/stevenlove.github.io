import {load} from "./dictionary";
import { FILTERS } from "./lib";
import {searchDictionaryWithRegexp} from "./dictionary";
import * as UI from "./ui";


async function findAllTheStrings(text:string):Promise<Array<string>>{
  let searchChars = text.split("")
      .filter(FILTERS.onlyHasLetters)
      .filter(FILTERS.noDupes);
  if(searchChars.length===0){return ["no valid letters"];}
  if(searchChars.length>12){return ["too many letters"];}

  return (await 
      searchDictionaryWithRegexp(
        new RegExp(`^[${searchChars.join("")}]+$`, "gi"))
        ).filter(FILTERS.noDupes);
}


UI.onSubmit(async function(inputText){
  UI.setTextarea("loading...\nShould take ~4 seconds");
  let result = await findAllTheStrings(inputText);
  UI.setTextarea(result.join("\n"));
})