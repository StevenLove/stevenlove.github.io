'use strict';

(()=>{ /* Wrap everything with IIFE so as to not pollute global namespace */
    const KEEPALIVE = false;
    const KEEPALIVE_INTERVAL = 10000;
    let socket;
    let queue = [];

    init();
    function init(){
        console.log("Using Remote Debugging with jsconsole.net");
        modifyConsole();
        openSocket();
    }
    function send(message){
        if(socket && socket.readyState === socket.OPEN){
            socket.send(message);
        }
        else{
            queue.push(message);
        }
    }
    /* Send any console messages that were generated before the socket opened */
    function processQueue(){
        if(queue.length > 0){
            socket.send(queue.shift());
            processQueue();
        }
    }
    /* Replace console.log, warn, and error with our own function */
    function modifyConsole(){
        ['log','warn','error','info'].forEach(method=>{
            let oldMethod = console[method];
            console[method] = function(){
                oldMethod.apply(console, arguments); // still log to our local console
                send(method[0]+mergeArguments.apply(null,arguments)); // but also send logs to jsconsole.net
            }
        })
    }
    function openSocket(){
        let wsProtocol = "wss://";
        let wsHost = "jsconsole.cap.jsconsole.net"
        if(window.location.hostname == "localhost"){
            wsProtocol = "ws://";
            wsHost = "localhost:5000";
        }
        const websocketURL = wsProtocol+wsHost;
        socket = new WebSocket(websocketURL);
        socket.onopen = onOpenSocket;
        socket.onclose = onCloseSocket;
    }
    
    function onOpenSocket(){
        // console.log("Remote Debugging socket opened successfully!");
        const target = document.getElementById('jsrcs').src.split('?')[1];
        /* Let the server know to relay future messages to 
        a listener with the given target id */
        socket.send("rbroadcaster"); // set role
        socket.send("d"+target); // set id
        
        processQueue(); // send any messages generated before the socket opened
        /* Keepalive! */
        if(KEEPALIVE){
            setInterval(()=>{
                socket.send("k");
            },KEEPALIVE_INTERVAL)
        }
    }
    function onCloseSocket(){
        console.warn("Remote Debugging socket closed.");
    }

    /* returns a string that can be sent to the server */
    function mergeArguments(){
        let merged = Array.from(arguments).map(arg=>{
            try{
                if(typeof arg == "object") arg = JSON.stringify(arg);
            }
            catch{
                arg = "[object Object(couldn't be stringified)]"
            }
            return arg;
        }).join(", ");
        return merged;
    }
})()