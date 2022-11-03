import {GridObj} from "./grid";
export interface RawLog{
    date:string,
    time:string,
    pid:number,
    tid:number,
    uid?:number,
    level:string,
    tag:string,
    message:string,
}
export interface IntermediateLogObj{
    datetime?:string,
    date: string,
    time: string,
    level: string,
    tag: string,
    message: string,
    pid:number,
    tid:number,
    uid?:number,
    domain?:string,
  }


/* Here are some example log lines

// this one has a uid (note the three numbers before the D. They are separated by two spaces)
07-14 10:15:00.437 10238  2637  2637 D InterruptionStateProvider: No alerting: suppressed due to group alert behavior

// this one has a year in the date
// this one also has a hyphen between the pid and tid instead of two spaces
// and a slash between the level and the tag
// and a slash and question mark after the pid-tid
2022-08-01 09:52:19.317 5107-5188/? I/LightsService: releaseWakeLockForLED: WakeLock path is not initialized

// these don't have a question mark after the pid-tid
// instead they have 'com.telex.pttoc'
2022-08-01 14:13:59.757 15121-15121/com.telex.pttoc D/VCOMActivityOpener: Starting foreground service RestarterService
2022-08-01 14:14:00.366 15506-15506/com.telex.pttoc D/VCOMRestarterService: started timer


//
07-14 10:15:01.539 10352 13977 14096 I PJJNI   : Not notifying callback of reg state - there are still other proxies/hosts to try
07-14 10:15:01.539 10352 13977 14096 I PJSIP   : 10:15:01.539      sip_reg.c  .Error sending request, status=120101
07-14 10:15:01.539 10352 13977 14096 F PJSIP   : 10:15:01.539    pjsua_acc.c  .Unable to create/send REGISTER: Network is unreachable [status=120101]
07-14 10:15:01.539 10352 13977 14096 I PJSIP   : 10:15:01.539 sip_transport.  .Transport tcpc0xb40000775ddca5f8 shutting down


*/
//              1           2           3           4            5              6           7            8         9
//              date      time       pid          tid           uid            appID?     level         tag    message
let regex = /([0-9-]+) +([0-9:.]+) +(\d+)(?:-| +)(\d+)(?:-| +)?(\d+)?(?:\/(?:\?|(\S+)))? (V|D|I|W|E|F)[ \/ ](.+?): (.*)/;
export function parseAsLogLine(line: string): RawLog|false {
    let matches = regex.exec(line);
    if(matches){

        let date = matches[1];
        let time = matches[2];
        let pid = parseInt(matches[3]||"0");
        let tid = parseInt(matches[4]||"0");
        let uid = parseInt(matches[5]||"0");
        let appID = matches[6];
        let level = matches[7];
        let tag = matches[8];
        let msg = matches[9];
        return {
            date:date,
            time:time,
            // datetime: date + " " + time,
            level: level,
            tag: tag,
            message: msg,
            pid: pid,
            tid: tid,
            uid: uid,
        } as RawLog;
    }else{
        return false
    }
}

export function parseAsCodeSection(logline:string):string|false{
  let whole = logline.match(/--------- beginning of (\S+)/);
  if(whole){
    return whole[1] as string;
  }
  return "";
}

