
/* UI */
const UI = (()=>{
    let vars = {};
    let varNames = ["xs","ys","zs","p","q"];
    // 17 20 27 23 20 10 0 
    function init(){
        load();
        // syncAllVars();
        update();

        varNames.forEach(varName=>{
            $("#"+varName).on("input",()=>{
                update();
            })
        })
    }
    function parse(input){
        return input.split(/[,\s]+/).filter(value=>value!="");
    }
    function syncAllVars(){
        varNames.forEach(varName=>{
            let str = $("#"+varName).val();
            if(str){
                vars[varName] = parse(str);
            }
        })
    }
    function point(po){
        return {x:po[0],y:po[1],z:po[2]}
    }
    function update(){
        console.log("update");
        syncAllVars();
        console.log("vars",vars);


        if(vars.xs && vars.ys){
        // if(xs.length == ys.length && ys.length == zs.length && xs.length > 0){
            let str;
            try{
                str = CC.cc(vars.xs,vars.ys);
            }catch(e){str="error"}
            $("#cc").val(str);

            try{
                str = CC.areaPolygonXY(vars.xs,vars.ys);
            }catch(e){str="error"}
            $("#areaXY").val(str);

            try{
                str = CC.areaPolygonXYZ(vars.xs,vars.ys,vars.zs);
            }catch(e){str="error"};
            $("#areaXYZ").val(str);

            try{
                str = CC.volumeRevolvedXaxis(vars.xs,vars.ys);
            }catch(e){str="error"};
            $("#volumeRevolvedXaxis").val(str);
            
            try{
                str = CC.volumeRevolvedYaxis(vars.xs,vars.ys);
            }catch(e){str="error"};
            $("#volumeRevolvedYaxis").val(str);
            
            try{
                str = CC.volume(point(vars.p),point(vars.q),vars.xs,vars.ys,vars.zs);
            }catch(e){str="error"};
            $("#volume").val(str);
            
            try{
                str = CC.centroidXY(vars.xs,vars.ys);
            }catch(e){str="error"};
            $("#centroidXY").val(str);
            
            try{
                str = CC.centroidXYZ(vars.xs,vars.ys,vars.zs);
            }catch(e){str="error"};
            $("#centroidXYZ").val(str);
            
            try{
                str = CC.centroidRevolvedXaxis(vars.xs,vars.ys);
            }catch(e){str="error"};
            $("#centroidRevolvedXaxis").val(str);
            
            try{
                str = CC.centroidRevolvedYaxis(vars.xs,vars.ys);
            }catch(e){str="error"};
            $("#centroidRevolvedYaxis").val(str);

        }
        store();
    }
    function store(){
        varNames.forEach(varName=>{
            if(vars[varName]){
                localStorage.setItem(varName,$("#"+varName).val())//JSON.stringify(vars[varName]))
            }
        })
    }
    function load(){
        varNames.forEach(varName=>{
            let str = localStorage.getItem(varName);
            if(str && str != "undefined"){
                try{
                    // vars[varName] = JSON.parse(str);
                    $("#"+varName).val(str);
                }catch(e){
                    console.error("failed to parse ",str);
                }
            }
        })
    }
    return {
        init
    }
})()





