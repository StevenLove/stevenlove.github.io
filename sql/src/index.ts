import * as Dictionary from "./dictionary";
import { FILTERS} from "./lib";
import * as UI from "./ui";
import { from, oneOf, getRandomChar } from "./lib";
import { getQueryObject } from "./querystring";

async function init(){
  UI.displayTheseWords(["loading dictionary..."]);
  await Dictionary.preloadWordList();
  if(!processQueryString()){
    searchForSomethingInteresting();
  }
}
init();

function processQueryString(){
  let query = getQueryObject();
  console.log("query",query);
  return Object.keys(query).some(key=>{
    if(Object.values(UI.IDs).includes(key)){
      UI.setAndTrigger((key as UI.IDs),query[key]);
      return true;
    }
  });
}

function searchForSomethingInteresting(){
  /* randomly choose one of 5 options */
  let option = from(0,4);
  if([2].includes(option)){option = from(0,4)}
  switch(option){
    case 0: UI.setAndTrigger("inputInOrder",new Array(from(3,5)).fill(0).map(getRandomChar).join(""));
      break;
    case 1: UI.setAndTrigger("inputNTotal",from(2,8));
      break;
    case 2: UI.setAndTrigger("inputNRow",from(2,3));
      break;
    case 3: UI.setAndTrigger("input",oneOf(["maddox","steven","esther","william","lisa","chugbert","taco","taylor","sarah","dusty","gerald","bonnie","lydia"]));
      break;
    case 4: UI.setAndTrigger("regexInput",oneOf([
      new Array(from(1,24)).fill('.').join(""),
      ".*(([^s])\\2).*\\1.*",
      "[^aeiou]{3}[^aeiou]*",
      ".*ology",
      ".*([gbzp])\\1y.*",
      ".*ooz|uze|euz.*",
      ".*urple.*",
      ".*rg[aoeui]r",
      ".*e[ae]+.*zy.*",
    ]));
      break;
  }
}

UI.onChangeTextInput(async (text:string)=>{
  useRegex('['+text.split("").filter(FILTERS.onlyHasLetters).map(x=>x.toLowerCase()).filter(FILTERS.noDupes).join("")+']+');
})

UI.onChangeRegexInput(async (regexpString:string)=>{
  useRegex(regexpString);
})

UI.onChangeInputInOrder(async (text:string)=>{
  useRegex(".*"+text.split("").map(x=>x.toLowerCase()).join(".*")+".*")
})

UI.onChangeInputN(async (n:number)=>{
  useRegex(".*(.)\\1{"+(n-1)+"}.*")
})

UI.onChangeInputNTotal(async (n:number)=>{
  useRegex(".*(.).*"+(new Array(n-1).fill("\\1")).join(".*")+".*")
})

/* Enact a search with a given regex string
  1. Populate the regex textbox with the appropriate text
  2. Convert to an actual regex and search with that
  3. Display the results or an error message
 */
function useRegex(regexString:string){
  UI.setRegexInput(regexString);
  try{
    Dictionary.searchDictionaryWithRegexp(new RegExp(`^${regexString}$`,"i"))
    .then(results=>{
      UI.displayTheseWords(results);
    }).catch(()=>{
      UI.displayTheseWords(["regexp timed out"]);
    })
  }catch(e){
    UI.displayTheseWords(["invalid regular expression"]);
  }
}