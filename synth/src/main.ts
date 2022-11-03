// import synth and time
import {Synth} from './Synth';
import {Time} from './Time';
import {KeysLevel1,Key} from './Keys';
import {Canceler} from './Lib';


async function main(){
        
        const synth = await Synth();
        let keyboard = await KeysLevel1()
        let cancelMap = new Map<Key,Canceler>();

        function mapKey(k:Key, freq:number){
                keyboard.whileHeld(k,()=>{
                        cancelMap.set(k,synth.playTone(freq))
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

        


}

main();