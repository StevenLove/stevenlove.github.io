import { Time } from "./Time";
import { pageLoaded } from "./Lib";

const Synth = (async (optionalCTX?:AudioContext)=>{
 
    const ctx = await getAudioContext(optionalCTX);

    const C = {
        GAIN_NODE_STOP_TIME_CONSTANT:0.015, // smaller value = faster change
        OSCILLATOR_TIME_TO_STOP:Time.ms(0.5), // smaller value = faster change
    }

    const Gain = (()=>{
        const node = ctx.createGain();
        const DEFAULT_VOLUME_SETTING = 1;
        let storedVolumeSetting = DEFAULT_VOLUME_SETTING;
        let muted = false;
        node.gain.value = storedVolumeSetting

        function updateVolume(){
            if(muted){
                node.gain.value = 0;
            }else{
                node.gain.value = storedVolumeSetting;
            }
        }

        
        return {
            node,
            setVolume: (vol:number)=>{
                storedVolumeSetting = vol;
                updateVolume();
            },
            smoothStop:()=>{
                node.gain.setTargetAtTime(0, ctx.currentTime, C.GAIN_NODE_STOP_TIME_CONSTANT);
            },
            mute: ()=>{
                muted = true;
                updateVolume();
            },
            unmute: ()=>{
                muted = false;
                updateVolume();
            },
            toggleMute: ()=>{
                muted = !muted;
                updateVolume();
            },
            getVolume: ()=>{
                return storedVolumeSetting;
            },
            isMuted: ()=>{
                return muted;
            },
            connect: (destination:AudioNode)=>{
                node.connect(destination);
            },
        }
    })
    const Oscillator = (()=>{
        const node = ctx.createOscillator();
        const gain = Gain();
        node.connect(gain.node);
        return {
            node,
            start: ()=>{
                node.start();
            },
            stop: ()=>{
                gain.smoothStop();
                node.stop(ctx.currentTime + C.OSCILLATOR_TIME_TO_STOP.toMs());
            },
            setFrequency: (freq:number)=>{
                node.frequency.value = freq;
            },
            setWaveType: (type:OscillatorType)=>{
                node.type = type;
            },
            setVolume: gain.setVolume,
            mute: gain.mute,
            unmute: gain.unmute,
            toggleMute: gain.toggleMute,
            getVolume: gain.getVolume,
            isMuted: gain.isMuted,
            connect: gain.connect,
        }
    })
    

    /* function to await an audio context that has been enabled by the user and is running.
    You can optionally supply an existing audiocontext to use that instance but still wait for it to become ready
    and prompt the user to enable it of course. */
    async function getAudioContext(ctx?:AudioContext):Promise<AudioContext>{
        await pageLoaded();
        let got = ctx || new AudioContext()
        let thingsToDoWhenWeResumeSuccessfully:Array<Function> = [];
        let p = new Promise<AudioContext>((resolve)=>{
            got.onstatechange = ()=>{
                if(got.state === "running"){
                    thingsToDoWhenWeResumeSuccessfully.forEach((fn)=>{fn()});
                    resolve(got);
                }
            }
        })
        function attemptResume(){got.resume()}
        if(got.state === "suspended"){
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


    const masterGain = Gain();
    const dynamicNotesIntro = Gain();
    const dynamicNotesOutro = Gain();
    const computerSpeakers = ctx.destination;
    

    // connect up all the basic nodes
    dynamicNotesIntro.connect(dynamicNotesOutro.node);
    dynamicNotesOutro.connect(masterGain.node);
    masterGain.connect(computerSpeakers);


    function playTone(freq:number, duration:Time){
        const osc = Oscillator();
        osc.setFrequency(freq);
        osc.connect(dynamicNotesOutro.node);
        osc.start();
        setTimeout(()=>{
            osc.stop();
        }, duration.toMs());
    }
    
    return {
        playTone
    };
})






export {Synth}