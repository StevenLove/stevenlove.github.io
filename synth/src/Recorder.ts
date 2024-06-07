import {Key} from './Keys';
/* Singleton object to hold the last 10 keys that were pressed. */
export class Recorder {
    private static instance: Recorder;
    private keys: Key[] = [];
    private htmlElement: HTMLElement;
    
    private constructor() {
        // create a new element
        this.htmlElement = document.createElement("div");
        this.htmlElement.style.position = "absolute";
        this.htmlElement.style.top = "0px";
        this.htmlElement.style.left = "0px";
        this.htmlElement.style.width = "1000px";
        this.htmlElement.style.height = "100px";
        this.htmlElement.style.backgroundColor = "white";
        this.htmlElement.style.color = "black";
        this.htmlElement.style.padding = "10px";
        this.htmlElement.style.border = "1px solid black";
        this.htmlElement.style.fontSize = "20px";
        this.htmlElement.style.display = "inline-block";
        this.htmlElement.style.textAlign = "center";
        this.htmlElement.style.verticalAlign = "middle";
        this.htmlElement.style.lineHeight = "80px";
        this.htmlElement.style.zIndex = "100";
        document.body.appendChild(this.htmlElement);

    }

    public static getInstance(): Recorder {
        if (!Recorder.instance) {
            Recorder.instance = new Recorder();
        }
        return Recorder.instance;
    }

    public addKey(key: Key) {
        this.keys.push(key);
        if (this.keys.length > 10) {
            this.keys.shift();
        }
        this.update();
    }

    // toString
    public toString() {
        return this.keys.join(" ");
    }

    private update() {
        this.htmlElement.innerHTML = this.toString();
    }

}
    