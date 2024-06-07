import { pageLoaded } from "./Lib"
import { getReadyAudioContext } from "./AudioContext"


const Microphone = (async()=>{
    await pageLoaded()
 
    const constraints = {audio:true,video:false};
 
    console.log("mic1")
    let stream = await navigator.mediaDevices.getUserMedia(constraints)
    console.log("mic2")
    let ctx = await getReadyAudioContext();
    console.log("mic3")
    let node = ctx.createMediaStreamSource(stream)
    console.log("mic4")
    
 
     return({
        node,
     })
     
})

export {Microphone}