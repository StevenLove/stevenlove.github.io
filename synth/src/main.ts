// import synth and time
import {Synth} from './Synth';
import {Time} from './Time';


async function main(){
        const synth = await Synth();
        synth.playTone(540, Time.seconds(1));
}

main();