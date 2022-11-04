// import synth and time
import {Synth} from './Synth';
import {Time} from './Time';
import {KeysLevel1,Key} from './Keys';
import {Canceler} from './Lib';


async function main(){
        
        const synth = await Synth();
        let keyboard = await KeysLevel1()
        let cancelMap = new Map<Key,Canceler>();
        let multiplier = 1;

        function mapKey(k:Key, freq:number){
                keyboard.whileHeld(k,()=>{
                        console.log("playing",freq*multiplier);
                        cancelMap.set(k,synth.playTone(freq*multiplier))
                },()=>{
                        cancelMap.get(k)?.cancel();
                })
        }

        mapKey(Key.CAPS_LOCK, 261.63);
        mapKey(Key.a, 440);
        mapKey(Key.s, 493.88);
        mapKey(Key.d, 523.25);
        mapKey(Key.f, 587.33);
        mapKey(Key.g, 659.25);
        mapKey(Key.h, 698.46);
        mapKey(Key.j, 783.99);
        mapKey(Key.k, 880);
        mapKey(Key.l, 987.77);
        mapKey(Key.SEMICOLON, 1046.5);
        mapKey(Key.SINGLE_QUOTE, 1174.66);
        mapKey(Key.ENTER, 1318.51);

        keyboard.onDown(Key.A,()=>synth.setTargetFrequency(440))
        keyboard.onDown(Key.S,()=>synth.setTargetFrequency(493.88))
        keyboard.onDown(Key.D,()=>synth.setTargetFrequency(523.25))
        keyboard.onDown(Key.F,()=>synth.setTargetFrequency(587.33))
        keyboard.onDown(Key.G,()=>synth.setTargetFrequency(659.25))
        keyboard.onDown(Key.H,()=>synth.setTargetFrequency(698.46))
        keyboard.onDown(Key.J,()=>synth.setTargetFrequency(783.99))
        keyboard.onDown(Key.K,()=>synth.setTargetFrequency(880))
        keyboard.onDown(Key.L,()=>synth.setTargetFrequency(987.77))

        keyboard.onDown(Key.w,()=>multiplier/=2);
        keyboard.onDown(Key.e,()=>multiplier*=2);

        keyboard.onDown(Key.q,synth.printBuffer);

        


}

main();