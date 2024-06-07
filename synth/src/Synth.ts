import { Time } from "./Time";
import { pageLoaded,Canceler } from "./Lib";
import { getReadyAudioContext } from "./AudioContext"
import { MyChart } from "./Chart"
import { Microphone } from "./Microphone"

const Synth = (async ()=>{
 
    const ctx = await getReadyAudioContext();

    console.log("sample rate",ctx.sampleRate);

    const C = {
        GAIN_NODE_STOP_TIME_CONSTANT:0.015, // smaller value = faster change
        OSCILLATOR_TIME_TO_STOP:Time.ms(0.5), // smaller value = faster change
        VISUALIZER_FFT_SIZE:32768/4,
        VISUALIZER_MIN_DECIBELS:-90,
        VISUALIZER_MAX_DECIBELS:-10,
        VISUALIZER_SMOOTHING_TIME_CONSTANT:0.85,
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

    const Visualizer = (()=>{
        const analyserNode = ctx.createAnalyser();
        analyserNode.fftSize = C.VISUALIZER_FFT_SIZE;
        analyserNode.minDecibels = C.VISUALIZER_MIN_DECIBELS;
        analyserNode.maxDecibels = C.VISUALIZER_MAX_DECIBELS;
        analyserNode.smoothingTimeConstant = C.VISUALIZER_SMOOTHING_TIME_CONSTANT;
        const bufferLength = analyserNode.frequencyBinCount;
        const analyserBuffer = new Uint8Array(bufferLength);
        
            
        const WIDTH = 400;
        const HEIGHT = 200;
        /* create a canvas with the given width and height */
        var canvas = document.createElement("canvas");
        canvas.width = WIDTH;
        canvas.height = HEIGHT;
        /* get the 2d context of the canvas */
        var canvasContext = canvas.getContext("2d");
        /* draw a rectangle with the given dimensions */
        canvasContext.fillStyle = "rgb(200,0,0)";
        canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
        
        const draw = () => {
            requestAnimationFrame(draw);
            analyserNode.getByteFrequencyData(analyserBuffer); // update data in analyserBuffer
            canvasContext.fillStyle = "black";
            canvasContext.fillRect(0,0,WIDTH,HEIGHT);
            var barWidth = (WIDTH / bufferLength) * 2.5;
            var barHeight;
            var x = 0;
            for(var i = 0; i < bufferLength; ++i){
                barHeight = analyserBuffer[i]/2;
                canvasContext.fillStyle = 'rgb('+(barHeight+100) + ',50,50)';
                canvasContext.fillRect(x,HEIGHT-barHeight/2, barWidth,barHeight);
                x += barWidth + 1;
            }
        }
        /* append the canvas element to the screen */
            
        return ({
            node:analyserNode,
            buffer:analyserBuffer,
            canvas,
            display:async()=>{
                await pageLoaded();
                document.body.appendChild(canvas);
                draw();
            },
            connect: (destination:AudioNode)=>{
                analyserNode.connect(destination);
            }
        })
    
    
    })

    const ToneAnalyzer = ((startFrequency)=>{
        let node = new AudioWorkletNode(
            ctx,
            "random-noise-processor",
            // {
            //     parameterData:{
            //         targetFrequency: 440,
            //     }
            // }
        )

        let targetFrequency = startFrequency;
        function updateFrequency(){
            node.parameters.forEach(param=>{
                param.setValueAtTime(targetFrequency,ctx.currentTime);
            })
            div.innerHTML = targetFrequency+" Hz"
        }


        const div = document.createElement("div");
        div.style.width = "100px";
        div.style.height = "100px";
        // give a padding of 10px
        div.style.padding = "10px";
        div.style.border = "1px solid black";
        // set the font size to 20px
        div.style.fontSize = "20px";
        // set to inline-block so the divs can be placed next to each other
        div.style.display = "inline-block";
        // set the text to be centered
        div.style.textAlign = "center";
        // set the vertical alignment to be middle
        div.style.verticalAlign = "middle";
        // set the line height to be the same as the height of the div
        div.style.lineHeight = "80px";


        // set background-color transition to 10ms
        div.style.transition = "background-color 10ms linear";

        document.body.appendChild(div);
        updateFrequency();
        node.port.onmessage = (e)=>{
            let x = e.data.sum || 0;
            div.style.backgroundColor='rgb(100,'+x*255+',100)'
        }

        return {
            node,
            onMessage: (cb:(e:MessageEvent)=>void)=>{
                // node.port.onmessage = cb;
            }
        }
    })
    

    


    const masterGain = Gain();
    const dynamicNotesIntro = Gain();
    const dynamicNotesOutro = Gain();
    const computerSpeakers = ctx.destination;
    const visualizer = await Visualizer();
    // const chart = await MyChart()

    await ctx.audioWorklet.addModule("randomNoiseProcessor.js?q="+Math.random());
    const randomNoiseNode = new AudioWorkletNode(
        ctx,
        "random-noise-processor"
    );
    let testers = [];
    testers.push(ToneAnalyzer(440))
    testers.push(ToneAnalyzer(493.88))
    testers.push(ToneAnalyzer(523.25))
    testers.push(ToneAnalyzer(587.33))
    testers.push(ToneAnalyzer(659.25))
    testers.push(ToneAnalyzer(698.46))
    testers.push(ToneAnalyzer(783.99))
    testers.push(ToneAnalyzer(880))
    testers.push(ToneAnalyzer(987.77))
    testers.push(ToneAnalyzer(1046.5))
    testers.push(ToneAnalyzer(1174.66))
    testers.push(ToneAnalyzer(1318.51))

    let microphoneNode = (await Microphone()).node;

    let nodes = [
        dynamicNotesIntro.node,
        dynamicNotesOutro.node,
        // microphoneNode,
        masterGain.node,
        visualizer.node,
        testers.map(t=>t.node),
        computerSpeakers
    ]
    let flatNodes = nodes.flat();
    for(let i = 0; i < flatNodes.length-1; ++i){
        flatNodes[i].connect(flatNodes[i+1]);
    }


    function playTone(freq:number, duration?:Time):Canceler{
        const osc = Oscillator();
        osc.setFrequency(freq);
        osc.connect(dynamicNotesOutro.node);
        osc.start();

        if(duration){
            setTimeout(()=>{
                osc.stop();
            }, duration.toMs());
        }
        return new Canceler(()=>{
            osc.stop();
        })
    }

    function printBuffer(){
        console.log(JSON.stringify(visualizer.buffer));
    }
    
    return {
        setTargetFrequency: (freq:number)=>{
            // testnode2.parameters.forEach((param)=>{
            //     // console.log(param);
            //     param.setValueAtTime(freq,ctx.currentTime);
            // })
        },
        printBuffer,
        playTone
    };
})






export {Synth}