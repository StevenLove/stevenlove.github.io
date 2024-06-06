import * as SeedRandom from 'seedrandom';// SeedRandom as SeedRandom } from 'seedrandom';

let rng = Math.random;

const intInRangeInclusive = (min:number,max:number) => {
    return intInRangeHalfOpen(min,max+1);
}
const intInRangeHalfOpen = (min:number,max:number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const diff = max-min;
    const r = rng();
    const result = Math.floor(r*diff) + min;
    if(result < min || result >= max || !Number.isInteger(result)){
        console.error("INT IN RANGE HALF OPEN RETURNED ",result," FOR MIN ",min," AND MAX ",max);
    }
    return result;
}

const elementFromArray = (arr:any[]) => {
    const min = 0;
    const max = arr.length;
    const index = intInRangeHalfOpen(min,max);
    return arr[index];
}

const elementsFromArray = (arr:any[], n:number) => {
    return partialShuffle(arr,n);
}


/* Fisher-Yates shuffle algorithm modified to potentially end early */
const partialShuffle = (arr:any[], n:number) => {
    const copy = arr.slice();
    var m = copy.length, t, i;
        // While there remain elements to shuffle…
        while (m > (copy.length - n)) {
    
            // Pick a remaining element…
            i = Math.floor(rng() * m);
            --m;
    
            // And swap it with the current element.
            t = copy[m];
            copy[m] = copy[i];
            copy[i] = t;
        }
    
        return copy.slice(m);
}
const shuffle = (arr:any[]) => {
    return partialShuffle(arr,arr.length);
}

const setRNG = r => rng = r;
const setSeed = seed => setRNG(SeedRandom(seed));
const generateSeedFromTime = () => {
    // generate a seed based on the specific 5-minute window we're in
    const minutes = new Date().getMinutes();
    const rounded = Math.floor(minutes/5);
    const dateString = new Date().toLocaleDateString();
    const hours = new Date().getHours();
    const seed = rounded+"XLAIDJFOAIWEJF"+dateString + hours;
    return seed;
}

const shuffledIndices = n => {
    let indices = new Array(n).fill(0).map((val,index)=>index);
    return Randomizer.shuffle(indices);
}

export const Randomizer = {
    shuffle:shuffle,
    elementFromArray:elementFromArray,
    elementsFromArray:elementsFromArray,
    intInRangeHalfOpen:intInRangeHalfOpen,
    intInRangeInclusive:intInRangeInclusive,
    setSeed:setSeed,
    generateSeedFromTime:generateSeedFromTime,
    shuffledIndices:shuffledIndices
}