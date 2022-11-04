import {pageLoaded} from './Lib'

    let singleton:AudioContext

    // function getNewAudioContext(){
    //     let got = new AudioContext()
    //     singleton = got;
    //     return got;
    // }
    // function getExistingAudioContext(){
    //     return singleton
    // }
    async function getReadyAudioContext(){
        return ensureAudioContextIsReady(getAudioContex())
    }
    function getAudioContex(){
        if(singleton){return singleton}
        return new AudioContext()
    }
/* function to await an audio context that has been enabled by the user and is running.
    You can optionally supply an existing audiocontext to use that instance but still wait for it to become ready
    and prompt the user to enable it of course. */
    async function ensureAudioContextIsReady(ctx:AudioContext):Promise<AudioContext>{
        await pageLoaded();
        let thingsToDoWhenWeResumeSuccessfully:Array<Function> = [];
        let p = new Promise<AudioContext>((resolve)=>{
            ctx.onstatechange = ()=>{
                if(ctx.state === "running"){
                    thingsToDoWhenWeResumeSuccessfully.forEach((fn)=>{fn()});
                    resolve(ctx);
                }
            }
        })
        function attemptResume(){ctx.resume()}
        if(ctx.state === "suspended"){
            /* notify the user that they need to click a button to start the audio */
            const button = document.createElement("button");
            button.innerText = "Click to start audio";
            button.addEventListener("click", attemptResume);
            button.style.width = "100%";
            button.style.height = "100%";
            button.style.fontSize = "100px";
            button.style.position = "absolute";
            button.style.top = "0";
            button.style.left = "0";
            button.style.zIndex = "1000";
            document.body.appendChild(button);
            thingsToDoWhenWeResumeSuccessfully.push(()=>button.remove())

            document.addEventListener("keydown", attemptResume);
            thingsToDoWhenWeResumeSuccessfully.push(()=>{
                document.removeEventListener("keydown", attemptResume);
            })
        }
        return p;
    }

    export {getReadyAudioContext}