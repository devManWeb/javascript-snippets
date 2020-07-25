"use strict";

function getRandom(max,min=undefined){
    /*
    * generates a random number <= max 
    * if defined, the returned value is > than min
    */
    const result = Math.floor(Math.random() * max);
    if(min != undefined){
        if(result < min){
            return getRandom(max,min);
        }
        return result;
    }
    return result;
    
}

function getSign(){
    //returns 1 or -1 (50% probability)
    return Math.random() >= 0.5 ? 1 : -1;
}

function drawLine(coordinates0,coordinates1,step,stepLim){
    /*
    * generic function used to draw lines on the canvas
    * lineWidth is linked to step and stepLim
    */
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    let lineWidth = 0;
    if(step == 0){
        lineWidth = (canvas.width/150) * (stepLim);
    } else {
        lineWidth = (canvas.width/300) * (stepLim - step);
    }

    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = "#8b4513";

    ctx.beginPath();

    ctx.moveTo(
        coordinates0[0],
        coordinates0[1]
    );
    ctx.lineTo(
        coordinates1[0],
        coordinates1[1] 
    );
    ctx.stroke();

    if(step < 2){
        /*
        * in the first steps, draws a circle at the end of the branch
        * to prevent empty spaces from appearing
        */
        ctx.moveTo(
            coordinates1[0],
            coordinates1[1]
        );
        ctx.arc(
            coordinates1[0],
            coordinates1[1],
            lineWidth/2,
            0, 2 * Math.PI
        );
        ctx.fillStyle = "#8b4513";
        ctx.fill();
    }

    ctx.closePath();
}


function randomHEXGreen(){
    //returns a random HEX green
    const minValue = 100;
    const maxValue = 150;
    const coeff = (maxValue - minValue + 1);
    //Random green shade
    const green = Math.floor(Math.random() * coeff) + minValue;
    const greenHex = green.toString(16);
    //here an extra "0" is added if needed
    const greenHexFix = greenHex.length == 1 ? "0" + greenHex : greenHex;
    return "#00" + greenHexFix + "00";
}


function drawLeaves(start,end,step){
    /*
    * function used to draw the leaves on the tree,
    * the number of leaves drawn is linked to step
    */
    if(step > 1){

        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        ctx.fillStyle = randomHEXGreen();

        var x1 = start[0];
        var y1 = start[1];

        var x2 = end[0];
        var y2 = end[1];

        var lower = [0,0];
        var upper = [0,0]

        if(x1<x2){
            lower[0] = x1;
            upper[0] = x2;
        }else{
            lower[0] = x2;
            upper[0] = x1;
        }

        if(y1<y2){
            lower[1] = y1;
            upper[1] = y2;
        }else{
            lower[1] = y2;
            upper[1] = y1;
        }

        for(let i = lower[0]; i < upper[0]; i++){
            for(let l = lower[1]; l < upper[1]; l++){
                //Loops each point of the rectangle between x1, y1 and x2, y2.
                //The probability above is equal to 2.5/1000 * step
                if(Math.random() >= (0.0025 * step)){
                    continue;
                }
                ctx.beginPath();
                ctx.ellipse(i, l, getRandom(20,5), getRandom(20,5), 2 * Math.PI, 0, 2 * Math.PI);
                
                ctx.fill();
                ctx.closePath();

            } 
        } 
    }
}

function useRecursion(stepLim,start,step=0){
    // used to generate the elements of the tree
    const end = start.slice();
    const canvas = document.getElementById("canvas");

    //end[0] and end[1] values are linked to step and stepLim
    const coeff0 = (stepLim - step)/(4 * stepLim);
    const coeff1 = (stepLim - step)/(5 * stepLim);

    if(step == 0){
        end[1] = end[1] - getRandom(canvas.height * coeff1,150);
    } else {
        end[0] = end[0] + getSign() * getRandom(canvas.height  * coeff0);
        end[1] = end[1] - getRandom(canvas.width * coeff1);
    }
    
    drawLine(
        start,
        end,
        step,
        stepLim
    )

    drawLeaves(start,end,step);
    start = end; 
    step++;

    if(step > stepLim){
        return;
    } else {
        for(let i=0; i<stepLim; i++){
            if(step < 1){
                continue;
            } else {
                useRecursion(stepLim,start,step);
            }
            
        } 
    }
}

function generateTree(){
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    useRecursion(5,[canvas.width/2,canvas.height]);
}

document.getElementById("generate-btn").addEventListener("click", function(){
    generateTree();
}); 

generateTree();