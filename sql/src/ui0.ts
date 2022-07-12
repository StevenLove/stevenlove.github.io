import * as lib from "./lib";
import { updateQueryString } from "./querystring";
import { setRegexInput } from "./ui";

export const IDs = {
    results: "results",
    randomize:"randomize",
    input: "input",
    regexInput: "regexInput",
    textarea: "textarea",
    definition: "definition",
    inputInOrder: "inputInOrder",
    inputNRow: "inputNRow",
    inputNTotal: "inputNTotal",
    resultsbg:"resultsbg",
 }
export type IDs = keyof typeof IDs;
 
 
 
export function getElement(id:IDs):HTMLInputElement{return document.getElementById(id) as HTMLInputElement;}

export async function tempAddClass(id:IDs,className:string,duration:number=1000){
    let e = getElement(id);
    e.classList.add(className);
    e.style.position="relative";
    
    await new Promise((res,rej)=>{
        setTimeout(
            ()=>{
                // temp.remove();
                e.classList.remove(className);
                res(true)
            }
            ,duration
        )
    })
}

export function implementOnTextInputChanged(id:IDs){
    return (handler:(arg0:string)=>void)=>{
        getElement(id).addEventListener("input",()=>{
            lib.timeStart("input")
            handler(getElement(id).value)
            clearInputsOtherThan(id);
            updateQueryString({[id]:getElement(id).value})
        })
    }
}
export function implementOnNumberInputChanged(id:IDs){
    return (handler:(arg0:number)=>void)=>{
        getElement(id).addEventListener("input",()=>{
            lib.timeStart("input")
            let v = parseInt(getElement(id).value)
            if(v <= 0 || Number.isNaN(v) || v>20){
                getElement(id).value = "";
                setRegexInput("");
            }else{
                handler(v);
            }
            updateQueryString({[id]:getElement(id).value})
            clearInputsOtherThan(id);
        })
    }
}

/* When typing in one of the inputs, we want to clear other inputs
so it is clear that they are not being used.
But we don't clear the regex because it is always used */
function clearInputsOtherThan(dontClearThis:IDs){
    // get all the inputs
    let inputs = document.getElementsByTagName("input");
    // filter out the ones we don't want to clear
    let inputsToClear = Array.from(inputs).filter(x=>(x.id as IDs) != dontClearThis && (x.id as IDs) != "regexInput");
    // clear them
    inputsToClear.forEach(x=>x.value = "");
}