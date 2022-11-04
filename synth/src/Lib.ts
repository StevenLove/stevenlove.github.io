    /* function to await the page loading */
    function pageLoaded():Promise<void>{
        return new Promise((resolvef)=>{
            if(document.readyState === "complete"){
                resolvef();
            }else{
                window.addEventListener("load", ()=>{
                    resolvef();
                })
            }
        })
    }



class Canceler{
    private fn:()=>void;
    constructor(fn:()=>void){
        this.fn = fn;
    }
    cancel(){
        this.fn()
    }
}

class CancelableEventMap{
    private map:Map<number,()=>void> = new Map();

    add(handler:()=>void):Canceler{
        const id = Math.random();
        this.map.set(id,handler);
        return new Canceler(()=>{
            this.cancel(id);
        })
    }
    cancel(id:number){
        this.map.delete(id);
    }
    addOnce(handler:()=>void){
        const id = Math.random();
        let newHandler = ()=>{
            this.cancel(id);
            handler();
        }
        this.map.set(id,newHandler);
        return new Canceler(()=>{
            this.cancel(id);
        })
    }
    triggerAll(){
        this.map.forEach((handler)=>{
            handler();
        });
    }
    cancelAll(){
        this.map.forEach((handler, id)=>{
            this.cancel(id);
        })
    }
}

class LazyInitializingMap<K,V>{
    private map:Map<K,V> = new Map();
    private fn:(key:K)=>V;
    constructor(fn:(key:K)=>V){
        this.fn = fn;
    }
    get(key:K):V{
        if(!this.map.has(key)){
            this.map.set(key,this.fn(key));
        }
        return this.map.get(key);
    }
}
export {pageLoaded, Canceler, CancelableEventMap, LazyInitializingMap};