"use strict"
 
 /**
 * @param {number} num 
 * @returns random float between 0 and 1
 */
function generateLength(){
    return Math.round(Math.random() * 100) / 100
}
    
/**
 * genera un ramo e le sue biforcazioni
 * @param {*} howMany 
 * @param  {...any} args 
 * @returns 
 */
function generateBranches(howMany,...args){
    args = args.flat();
    args.push(
        [
            generateLength(),
            generateLength()
        ]
    );
    if (howMany == 1){
        return args;
    } else {
        return generateBranches(howMany-1,args)
    }
}

/**
 * genera l'intero albero
 * @param {*} iterations 
 * @returns 
 */
function generateTree(iterations){
    var b = [];
    for(var i = iterations+1; i > 1; i--){
        var a = generateBranches(i - 1);
        b.push(a);
    }
    return b;
}

/**
 * trova i punti sul cerchio
 * @param {*} angle 
 * @param {*} radius 
 * @param {*} x0 
 * @param {*} y0 
 *
function getNewCoordinates(angle,radius,x0,y0){
    return [
        x0 + (radius * Math.cos(angle)),
        y0 - (radius * Math.sin(angle))
    ];
}
*/


/**
 * 
 */
function drawTree(){

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /**
     * 
     * @param {*} coordinates0 
     * @param {*} coordinates1 
     */
    function drawLine(coordinates0,coordinates1){

        ctx.beginPath();
        ctx.moveTo(
            coordinates0[0],
            coordinates0[1]
        );
        ctx.lineTo(
            coordinates1[0],
            coordinates1[1]
        );
        console.log("disegno la linea da " + coordinates0 + " a " +coordinates1);
        ctx.stroke(); 
    
    }

    /**
     * 
     * @param {*} start 
     * @param {*} array 
     */
    function branchNavigation(start,array){
        console.log(array);
        if(array.length > 1){
            array.shift();
            for(var i = 0; i<array.length;i++){
                drawLine(start, array[i])
            }
        }
    }

    var treeStructure = generateTree(5).map(function(elem){
        return elem.map(function(elem2){
            return elem2 = [
                elem2[0] * canvas.width,
                elem2[1]// * canvas.height
            ]
        });
    });

    var start = [canvas.width/2,0];

    branchNavigation(
        start,
        treeStructure
    );
}
    
