"use strict";

function memoryMng(){
    let memory = [];
    let maxX = 1;
    let maxY = 1;
    let equationFunction = "null";

    /**
     * calculates the equation of the fx passing through two points
     */
    function calculateEquation(){

        const x0 = memory[0][0];
        const x1 = memory[1][0];
        const y0 = memory[0][1];
        const y1 = memory[1][1];

        const m = (y1 - y0) / (x1 - x0);
        let q = 0; 
        if(x1 != x0){
            q = ((x1 * y0) - (x0 * y1)) / (x1 - x0);
        }

        equationFunction = "y = " + m + "x";
        if(q > 0){
            equationFunction+= "+ " + q;
        } else if(q < 0){
            equationFunction+= " " + q;
        }
    }

    return {
        add: function(coordinates){
            //[0] is X, [1] is Y

            if(memory.length > 0 ){

                const lastMem = memory[memory.length - 1];
                const lastX = lastMem[0];
                const newXToAdd = coordinates[0];

                if(lastX < newXToAdd && memory.length < 2){
                    //only valid data are saved
                    memory.push(coordinates);
                }
            } else {
                memory.push(coordinates);
            }

            if(memory.length == 2){
                calculateEquation();
            }

        },

        read: function(){
            return memory;
        },

        getLimits: function(){
            return [maxX,maxY];
        },

        setXLimit: function(value){
            maxX = Number(value);
        },

        setYLimit: function(value){
            maxY = Number(value);
        },

        getEquation: function(){
            return equationFunction;
        },

        clear(){
            memory = [];
            equationFunction = "null";
        }
    }
}

const memory = new memoryMng();