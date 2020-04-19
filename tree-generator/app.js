"use strict"
 

/*
 **
 * @param number num 
 * @returns number random float between 0 and 1
 *
function generateLength(){
    return Math.round(Math.random() * 100) / 100
}
    
*
 * Generates a 
 * @param number howMany 
 * @returns array - various bifurcations of the tree
 *
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

**
 * @param number iterations 
 * @returns array - generates the whole tree
 *
function generateTree(iterations){
    var b = [];
    for(var i = iterations+1; i > 1; i--){
        var a = generateBranches(i - 1);
        b.push(a);
    }
    return b;
}

*/

/**
 * choses a random point on the on the upper semicircle
 * @param array - x,y coordinates of the center
 * @param number - radius of the semicircle
 * @returns array - x,y coordinates of the chosen point
 */
function chooseinSemiCircle(coordinates,radius){
    const x0 = coordinates[0];
    const y0 = coordinates[1];

    /*
    * angle = random angle btw 0pi and pi
    * x1 = x0 + 2 * radius * cos(angle)
    * y1 = y0 + 2 * radius * sin(rangle)
    */

    const angle = Math.floor(Math.random() * Math.PI)
    const x1 = x0 + 2*radius * Math.cos(angle);
    const y1 = y0 + 2*radius * Math.sin(angle);

    return [x1,y1];
}


function drawTree(){
    
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //tree generation
    //var treeStructure = generateTree(5);


    /**
     * draws the line on the canvas
     * @param array coordinates0 
     * @param array - coordinates1 
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
        ctx.stroke(); 

        console.log(coordinates0,coordinates1);
    }

    /**
     * Actual drawing of the tree
     * @param number maxIteration 
     * @param number iteration, 1 only at the start
     */
    function treeGeneration(maxIteration,start,iteration = 1){

        if(iteration == 1){
            //Start case
            drawLine(
                start,
                [start[0],start[1] + 100]
            );
    
            treeGeneration(
                maxIteration,
                [start[0],start[1] + 100],
                2
            );
    
        } else if(iteration == maxIteration){
            //end case, we terminate the recursion
            return undefined;

        } else {
            //we call the function recursively multiple times
            for(var i = 0; i < 3; i++){
    
                let end = chooseinSemiCircle(start,50);

                drawLine(
                    start,
                    end
                );

                treeGeneration(
                    maxIteration,
                    end,
                    iteration + 1
                );
    
            }
        }
    
    }

    treeGeneration(
        5,
        [canvas.width /2, canvas.height]
    );

}
