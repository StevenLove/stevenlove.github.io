

function getInputText():string{return (document.getElementById("input") as HTMLInputElement).value;}
export function onSubmit(handler:(arg0:string)=>void){
    /* Submit when we press enter */
    document.getElementById("input")?.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            handler(getInputText())
        }
    });
    /* Submit when we click the button */
    document.getElementById("button")?.addEventListener("click", ()=>handler(getInputText())); 
}

export function setTextarea(text:string){
    (document.getElementById("textarea") as HTMLTextAreaElement).value = text;
}