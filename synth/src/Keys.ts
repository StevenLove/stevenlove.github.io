import { pageLoaded, CancelableEventMap,LazyInitializingMap,Canceler } from "./Lib";

enum Key{
    A = "A",B = "B",C="C",D="D",E="E",F="F",G="G",H="H",I="I",J="J",K="K",L="L",M="M",N="N",O="O",P="P",Q="Q",R="R",S="S",T="T",U="U",V="V",W="W",X="X",Y="Y",Z="Z",
    a = "a",b = "b",c="c",d="d",e="e",f="f",g="g",h="h",i="i",j="j",k="k",l="l",m="m",n="n",o="o",p="p",q="q",r="r",s="s",t="t",u="u",v="v",w="w",x="x",y="y",z="z",
    _0 = "0",_1 = "1",_2="2",_3="3",_4="4",_5="5",_6="6",_7="7",_8="8",_9="9",
    SPACE = " ",ENTER = "Enter",SHIFT = "Shift",CTRL = "Control",ALT = "Alt",
    ARROW_UP = "ArrowUp",ARROW_DOWN = "ArrowDown",ARROW_LEFT = "ArrowLeft",ARROW_RIGHT = "ArrowRight",
    BACKSPACE = "Backspace",DELETE = "Delete",INSERT = "Insert",
    TAB = "Tab",ESCAPE = "Escape",
    F1 = "F1",F2 = "F2",F3 = "F3",F4 = "F4",F5 = "F5",F6 = "F6",F7 = "F7",F8 = "F8",F9 = "F9",F10 = "F10",F11 = "F11",F12 = "F12",
    NUMPAD_0 = "Numpad0",NUMPAD_1 = "Numpad1",NUMPAD_2 = "Numpad2",NUMPAD_3 = "Numpad3",NUMPAD_4 = "Numpad4",NUMPAD_5 = "Numpad5",NUMPAD_6 = "Numpad6",NUMPAD_7 = "Numpad7",NUMPAD_8 = "Numpad8",NUMPAD_9 = "Numpad9",
    NUMPAD_ADD = "NumpadAdd",NUMPAD_SUBTRACT = "NumpadSubtract",NUMPAD_MULTIPLY = "NumpadMultiply",NUMPAD_DIVIDE = "NumpadDivide",NUMPAD_DECIMAL = "NumpadDecimal",NUMPAD_ENTER = "NumpadEnter",
    SEMICOLON = ";",EQUALS = "=",COMMA = ",",DASH = "-",PERIOD = ".",FORWARD_SLASH = "/",BACK_SLASH = "\\",OPEN_BRACKET = "[",CLOSE_BRACKET = "]",SINGLE_QUOTE = "'",
    BACKTICK = "`",
    PAGE_UP = "PageUp",PAGE_DOWN = "PageDown",HOME = "Home",END = "End",
    CAPS_LOCK = "CapsLock",NUM_LOCK = "NumLock",SCROLL_LOCK = "ScrollLock",
    PRINT_SCREEN = "PrintScreen",
    PAUSE = "Pause",
    CONTEXT_MENU = "ContextMenu",
    UNKNOWN = "Unknown",
    UNSPECIFIED = "Unspecified",
}
function KeyFromEvent(e:KeyboardEvent):Key{
    // compare e.key to the string value of the enum
    for(let k in Key){
        if(Key[k] === e.key){
            return Key[k];
        }
    }
    return Key.UNKNOWN;
}

const KeysLevel1 = (async()=>{
    await pageLoaded();
    let downListenerMap = new LazyInitializingMap<Key,CancelableEventMap>(()=>new CancelableEventMap());
    let upListenerMap = new LazyInitializingMap<Key,CancelableEventMap>(()=>new CancelableEventMap());

    let currentlyDown = new Set<Key>();

    function keydown(e:KeyboardEvent){
        console.log("keydown",e.key);
        let k = KeyFromEvent(e);
        if(!currentlyDown.has(k)){
            currentlyDown.add(k);
            downListenerMap.get(k)?.triggerAll();
        }
    }

    function keyup(e:KeyboardEvent){
        console.log("keyup",e.key);
         let k = KeyFromEvent(e);
        if(currentlyDown.has(k)){
            currentlyDown.delete(k);
            upListenerMap.get(k)?.triggerAll();
        }
    }


    window.addEventListener("keydown", keydown);
    window.addEventListener("keyup", keyup);


    function whileHeld(k:Key, callbackOnStart:()=>void, callbackOnEnd:()=>void):Canceler{
        if(currentlyDown.has(k)){
            callbackOnStart();
        }
        let cancel1 = downListenerMap.get(k).add(callbackOnStart);
        let cancel2 = upListenerMap.get(k).add(callbackOnEnd);
        return new Canceler(()=>{
            cancel1.cancel();
            cancel2.cancel();
        })
    }
    function whileHeldOnce(k:Key, callbackOnStart:()=>void, callbackOnEnd:()=>void):Canceler{
        let cancels = [];
        if(currentlyDown.has(k)){
            callbackOnStart();
        }else{
            cancels.push(downListenerMap.get(k).addOnce(callbackOnStart));
        }
        cancels.push(upListenerMap.get(k).addOnce(callbackOnEnd));
        return new Canceler(()=>{
            cancels.forEach((cancel)=>{
                cancel.cancel();
            })
        })
    }
    function onDown(k:Key, callback:()=>void):Canceler{
        return downListenerMap.get(k).add(callback);
    }
    function onUp(k:Key, callback:()=>void):Canceler{
        return upListenerMap.get(k).add(callback);
    }
    function onDownOnce(k:Key, callback:()=>void):Canceler{
        return downListenerMap.get(k).addOnce(callback);
    }
    function onUpOnce(k:Key, callback:()=>void):Canceler{
        return upListenerMap.get(k).addOnce(callback);
    }


    function clearAll(k:Key){
        downListenerMap.get(k).cancelAll();
        upListenerMap.get(k).cancelAll();
    }
    function isDown(k:Key){
        return currentlyDown.has(k);
    }


    return {
        whileHeld,
        whileHeldOnce,
        onDown,
        onUp,
        onDownOnce,
        onUpOnce,
        clearAll,
        isDown,
    }
});

export {KeysLevel1,Key}