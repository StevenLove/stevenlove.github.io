/* 
Create a Time data type where we construct a value by calling Time.minutes(3) or Time.seconds(30)
and from any time object we can call .toSeconds() or .toMinutes() to get the value in the other unit
*/
class Time{
    private ms:number;
    constructor(ms:number){
        this.ms = ms;
    }
    static ms(ms:number){
        return new Time(ms);
    }
    static seconds(s:number){
        return new Time(s*1000);
    }
    static minutes(m:number){
        return new Time(m*60*1000);
    }
    toSeconds(){
        return this.ms/1000;
    }
    toMinutes(){
        return this.ms/(60*1000);
    }
    toMs(){
        return this.ms;
    }
}

export { Time };