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

export {pageLoaded};