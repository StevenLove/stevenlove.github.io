/* Todo: description  */


function ensureLengthMatch(left,right){
    if(left.length != right.length){
        console.error("length mismatch",left,right,left.length,right.length);
        throw "length mismatch";
    }
    return true;
}

/* Main criss-cross subroutine */
function cc(left,right){
    ensureLengthMatch(left,right);
    let n = left.length;
    let p = 0;
    let q = 0;
    /* main loop */
    for(let i = 0; i <= n-2; ++i){
        p += left[i]*right[i+1];
        q += left[i+1]*right[i];
    }
    p += left[n-1]*right[0]; // last addition
    q += left[0] * right[n-1]; // last addition

    
    return p-q;
}


function mul(a,b){
    return mul2(a,b);
    // let firstTwo = a.map((av,index)=>av*b[index]);
    // let args = new Array(arguments);
    // if(args.length > 2){
    //     let remaining = args.slice(2);
    //     return mul(firstTwo,remaining);
    // }
    // else{
    //     return firstTwo;
    // }
}

function mul3(a,b,c){
    return mul2(mul2(a,b),c);
}

function mul2(a,b){
    return a.map((av,index)=>av*b[index]);
}

function allEqual(a){
    if(a.length < 1) throw "allEqual on empty array";
    let first = a[0];
    let hasDifference = a.reduce((acc,curr)=>{
        if(curr != first){
            return true;
        }
        return acc;
    },false);
    return !hasDifference;
}


/* Make note of conditions! */
function volumeRevolvedXaxis(xs,ys){
    let A = cc(mul(xs,ys),ys);
    let B = cc(xs,mul(ys,ys));
    return (A+B)/3 +" * pi";
}

/* Make note of conditions! */
function volumeRevolvedYaxis(xs,ys){
    let A = cc(mul(xs,xs),ys);
    let B = cc(xs,mul(ys,xs));
    return (A+B)/3 +" * pi";
}


function centroidRevolvedXaxis(xs,ys){
    let A = cc(mul3(xs,xs,ys),ys); // 208598
    let B = cc(mul(xs,xs),mul(ys,ys)); // 416976
    let C = cc(xs,mul3(ys,xs,ys)); // 244776
    let D = cc(mul(ys,xs),ys); // 4708
    let E = cc(xs,mul(ys,ys)); // 11046

    return (1/4)*((2*A + B + 2*C) / (D + E));
}

function centroidRevolvedYaxis(xs,ys){
    let A = cc(mul3(xs,xs,ys),ys);
    let B = cc(mul(xs,xs),mul(ys,ys)); 
    let C = cc(xs,mul3(ys,xs,ys)); 
    let F = cc(mul(xs,xs),ys);
    let G = cc(xs,mul(ys,xs));

    return (1/4)*((2*A + B + 2*C) / (F + G));
}

function areaPolygonXY(xs,ys){
    return (1/2)*cc(xs,ys);
}

function areaPolygonXYZ(xs,ys,zs){
    let a = cc(xs,ys);
    let b = cc(ys,zs);
    let c = cc(zs,xs);
    return (1/2)*Math.sqrt(a*a + b*b + c*c);
}

function centroidXY(xs,ys){
    let numX = cc(mul(xs,xs),ys) + cc(xs,mul(ys,xs));
    let den = 3 * cc(xs,ys);
    let numY = cc(mul(ys,xs),ys) + cc(xs,mul(ys,ys));
    let x = numX / den;
    let y = numY / den;
    return "centroid (x,y) = ("+x+", "+y+")";
}

function centroidXYZ(x,y,z){
    let A = (cc(mul(x,x),y) + cc(x,mul(y,x)))/(3*cc(x,y));
    let B = (cc(mul(x,z),x) + cc(z,mul(x,x)))/(3*cc(z,x));
    let C = (cc(mul(y,x),y) + cc(x,mul(y,y)))/(3*cc(x,y));
    let D = (cc(mul(y,y),z) + cc(y,mul(z,y)))/(3*cc(y,z));
    let E = (cc(mul(z,z),x) + cc(z,mul(x,z)))/(3*cc(z,x));
    let F = (cc(mul(z,y),z) + cc(y,mul(z,z)))/(3*cc(y,z));

    let xResult = A;
    let yResult = C;
    let zResult = E;

    if(!isFinite(A))xResult = B;
    if(!isFinite(C))yResult = D;
    if(!isFinite(E))zResult = F;

    return "centroid (x,y,z) = ("+xResult+", "+yResult+", "+zResult+")";
}

function volume(p1,p2,xs,ys,zs){
    let deltaX = p1.x-p2.x;
    let deltaY = p1.y-p2.y;
    let deltaZ = p1.z-p2.z;
    let V = (1/6) * Math.abs(deltaX*cc(ys,zs) + deltaY*cc(zs,xs) + deltaZ*cc(xs,ys));
    return V;
}






/* Tests */
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
    // ccTest1();
    // testVolRevolved();
    // testCentroidX();
    // testPolygonArea();
    testVolumeOperator();
}

test();