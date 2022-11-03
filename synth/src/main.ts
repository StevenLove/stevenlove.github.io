// import synth and time
import {Synth} from './Synth';
import {Time} from './Time';
import {KeysLevel1,Key} from './Keys';


async function main(){
        
        const synth = await Synth();
        // synth.playTone(540, Time.seconds(1));
        let keyboard = await KeysLevel1()
        // keyboard.onDown(Key.of("i"),()=>{
        //         synth.playTone(540, Time.seconds(1));
        // });
        // keyboard.whileHeld(
        //         Key.of("a"),
        //         ()=>{
        //                 synth.playTone(540, Time.seconds(1));
        //         }, ()=>{
        //                 synth.playTone(300, Time.seconds(1));
        //         }
        // )

        let multiplier = 1
        setInterval(()=>{
                console.log("go");
        keyboard.whileHeldOnce(
                Key.j,
                ()=>{
                        multiplier = 2;
                }
                ,()=>{
                        multiplier = 1;
                }
        )
        
        keyboard.onDownOnce(Key.a,()=>synth.playTone(300*multiplier, Time.seconds(1)));
        }, 3000)



}

main();