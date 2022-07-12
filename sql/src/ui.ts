import * as Dictionary from "./dictionary";
import * as lib from "./lib";
import { getElement,tempAddClass,IDs, implementOnNumberInputChanged, implementOnTextInputChanged} from "./ui0";


export function setRegexInput(text:string){getElement("regexInput").value = text;}
let firstRandomization = true
export async function setAndTrigger(id:IDs,value:string|number){
    let e = getElement(id);
    e.value = value+"";
    e.dispatchEvent(new Event("input"));
    firstRandomization && animations(id);
    firstRandomization = false;
    /* Bring attention to the element by pulsing it */
   
}

async function animations(id:IDs){
    await tempAddClass(id,"pulse",2000);
    if(id!="regexInput"){
        await tempAddClass("regexInput","pulse",2000);
    }
    tempAddClass("resultsbg","showy",5000);   
}


export const onChangeInputInOrder = implementOnTextInputChanged("inputInOrder");
export const onChangeTextInput = implementOnTextInputChanged("input");
export const onChangeRegexInput = implementOnTextInputChanged("regexInput");
export const onChangeInputN = implementOnNumberInputChanged("inputNRow");
export const onChangeInputNTotal = implementOnNumberInputChanged("inputNTotal");
// export const onPressRandomize = (handler:()=>void)=>{
//     getElement("randomize").addEventListener("click",()=>{
//         handler()
//     })
// }

export function displayTheseWords(text:string[]){
    let time = new Date().getTime();
    if(text.length == 0){text.push("no results")}
    let element = getElement("results")
    /* empty results */
    while (element?.firstChild) {
        element.removeChild(element.firstChild);
    }
    /* populate with hoverable word entries */
    text.forEach(x=>{
        let p = document.createElement("span");
        p.innerText = x;
        p.addEventListener("mouseover",()=>displayDefinitions(x))
        element?.appendChild(p);
        element?.appendChild(document.createElement("br"));
    });
    let t2 = new Date().getTime();
    console.log("took",(t2-time)/1000,"seconds to display",text.length,"words");
    lib.timeEnd("input");
}


async function displayDefinitions(text:string){
    let element = getElement("definition");
    element.value = "loading definition..."
    let definitions:string[] = await Dictionary.define(text);
    if(definitions.length == 0){
        element.value = "no definition found..." + 
            (lib.isMac()?"\nIf you're on Mac, try hovering the word and typing [Ctrl][Command]+[D]":"")
    }else{
        element.value = definitions.join("\n\n");
    }
}

