


/* Tests */
const Tests = (()=>{
    function ccTest1(){

        let left = [9,7,5,1];
        let right = [2,3,4,5];
        
        console.log("xs:",left,"ys:",right,"crisscrossed = ",cc(left,right));
    }
    
    function testVolRevolved(){
        let xs = [1,5,15,26,36,21];
        let ys = [6,3,8,5,15,18];
        console.log("xs:",xs,"ys:",ys);
        console.log("volume revolved about x axis:",volumeRevolvedXaxis(xs,ys))
        console.log("volume revolved about y axis:",volumeRevolvedYaxis(xs,ys))
        // should be 5251.333333333333 for the x axis
    }
    
    function testCentroidX(){
        let xs = [1,5,15,26,36,21];
        let ys = [6,3,8,5,15,18];
        console.log("xs:",xs,"ys:",ys);
        console.log("centroid x pos when revolved about x axis:",centroidRevolvedXaxis(xs,ys))
        console.log("centroid y pos when revolved about y axis:",centroidRevolvedYaxis(xs,ys))
        
    }
    
    function testPolygonArea(){
        let xs = [25,35,20,17,5,4,15,30];
        let ys = [17,20,27,23,20,10,0,5];
        console.log("xs:",xs,"ys:",ys);
        console.log(areaPolygonXY(xs,ys)); // 478
        console.log(centroidXY(xs,ys));
    
        
        xs = [112,48,36,96,200,184];
        ys = [24,56,96,236,184,56];
        let zs = [144,136,132,127,140,148];
        console.log("xs:",xs,"ys:",ys,"zs:",zs);
        console.log(areaPolygonXYZ(xs,ys,zs));
    
        console.log(centroidXYZ(xs,ys,zs));
    }
    
    function testVolumeOperator(){
        let p = {x:0,y:12,z:6};
        let q = {x:9,y:3,z:18};
        let xs = [0,6,12,16,18,4,3];
        let ys = [6,0,0,4,18,16,9];
        let zs = [12,12,6,14,6,14,18];
        console.log("volume:",volume(p,q,xs,ys,zs));// 1152
        let q2 = {x:12,y:6,z:0};
        xs = [12,6,15,18,16,12];
        ys = [6,12,15,18,4,0];
        zs = [0,0,0,6,14,6];
        console.log("volume2:",volume(p,q2,xs,ys,zs)); // 888
    }
    
    function test(){
        ccTest1();
        testVolRevolved();
        testCentroidX();
        testPolygonArea();
        testVolumeOperator();
    }

    return {
        run:test
    }
})();
