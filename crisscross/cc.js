/* Todo: description  */
const CC = (()=>{
    function ensureLengthMatch(left,right){
        if(left.length != right.length){
            // console.error("length mismatch",left,right,left.length,right.length);
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





    /* Area */
    function areaPolygonXY(xs,ys){
        return (1/2)*cc(xs,ys);
    }

    function areaPolygonXYZ(xs,ys,zs){
        let a = cc(xs,ys);
        let b = cc(ys,zs);
        let c = cc(zs,xs);
        return (1/2)*Math.sqrt(a*a + b*b + c*c);
    }




    /* Volume */
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

    function volume(p1,p2,xs,ys,zs){
        let deltaX = p1.x-p2.x;
        let deltaY = p1.y-p2.y;
        let deltaZ = p1.z-p2.z;
        let V = (1/6) * Math.abs(deltaX*cc(ys,zs) + deltaY*cc(zs,xs) + deltaZ*cc(xs,ys));
        return V;
    }
    


    /* Centroids */
    function centroidXY(xs,ys){
        let numX = cc(mul(xs,xs),ys) + cc(xs,mul(ys,xs));
        let den = 3 * cc(xs,ys);
        let numY = cc(mul(ys,xs),ys) + cc(xs,mul(ys,ys));
        let x = numX / den;
        let y = numY / den;
        return "("+x+", "+y+")";
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

        return "("+xResult+", "+yResult+", "+zResult+")";
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


    return {
        cc,
        // Area
        areaPolygonXY,
        areaPolygonXYZ,
        // Volume
        volume,
        volumeRevolvedXaxis,
        volumeRevolvedYaxis,
        // Centroids
        centroidXY,
        centroidXYZ,
        centroidRevolvedXaxis,
        centroidRevolvedYaxis
    }
})()