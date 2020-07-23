"use strict";

function getRandom(maximum,onlyPositive=false){
    /*
    * returns a random value up to value
    * if onlyPositive is true this fx return only a positive value
    */
    const randomInt = Math.random() * maximum
    if(!onlyPositive){
        var randomBoolean = Math.random() >= 0.5;
        return randomBoolean ? randomInt : -randomInt;
    } else {
        return randomInt;
    }
}

function getRandomOrientation(value){
    /*
    * returns an array with a pair of values which,
    * added up vectorially, equals value
    */
    var rand = getRandom(1,false);
    
    var X = value * rand;
    var Y = Math.sqrt(Math.pow(value, 2) - Math.pow(X, 2));
    var randInt = Math.round(getRandom(1,true));
    if(randInt == 0){
        return [X,Y]
    } else {
        return [-X,-Y];
    }
}

const MOLECULE_SPEED = 5;
const MOLECULE_RADIUS = 10;

class Molecule{
    //parent class for base and reference molecules
    constructor() {
        this.canvas = document.getElementById('canvas-particles');
        this.ctx = this.canvas.getContext("2d");
        this.x = this.canvas.width * getRandom(1,true);
        this.y = this.canvas.height * getRandom(1,true);
        const orientation = getRandomOrientation(MOLECULE_SPEED);
        this.increaseX = orientation[0];
        this.increaseY = orientation[1];
        this.impact = false;
    }

    differenceDelta(value1,value2,delta){
        //Is the difference between value1 and value2 under delta?
        var difference = 0;
        if(value2 > value1){
            difference = value2 - value1;
        } else if(value2 < value1){
            difference = value1 - value2;
        }
        
        if(difference < delta){
            return true;
        } else {
            return false;
        }
    }

    move(array){

        //if it has already made an impact, skip this part until the next canvas animation
        if(!this.impact){
            for(var i = 0; i< array.length; i++){

                let evalMol = array[i];

                if(evalMol.getInfo().x == this.x && evalMol.getInfo().y == this.y){
                    continue;
                } else if(
                    this.differenceDelta(
                        evalMol.getInfo().x,
                        this.x,
                        MOLECULE_RADIUS * 2
                    ) &&
                    this.differenceDelta(
                        evalMol.getInfo().y,
                        this.y,
                        MOLECULE_RADIUS * 2
                    )
                ){
                    let v1xi = this.increaseX;
                    let v1yi = this.increaseY;
                    let v2xi = evalMol.increaseX;
                    let v2yi = evalMol.increaseY;
                    /*
                    * elastic impact, the molecules exchange speeds
                    * conservation of momentum, same mass same velocity
                    * v1f = v2i
                    * v2f = v1i
                    */
                    this.increaseX = v2xi;
                    this.increaseY = v2yi;
                    evalMol.setSpeed(v1xi,v1yi);             
                }
                this.impact = true;
            }
        } else {
            this.impact = false;
        }

        //Totally inelastic impact against the surfaces of the walls
        if(this.x + this.increaseX > 0 &&  this.x + this.increaseX < this.canvas.width){
            this.x = this.x + this.increaseX;
        } else {
            this.increaseX = - this.increaseX;
            this.x = this.x + this.increaseX;
        }
        if(this.y + this.increaseY > 0 &&  this.y + this.increaseY < this.canvas.height){
            this.y = this.y + this.increaseY;  
        } else {
            this.increaseY = -this.increaseY;
            this.y = this.y + this.increaseY;
        }
    }
    
    setColor(what){
        this.color = what;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(
            this.x,
            this.y,
            MOLECULE_RADIUS,
            0,
            2 * Math.PI,
            false
        );
        this.ctx.fill();
    }

    animate(array){
        this.move(array);
        this.draw();
    }

    getInfo(){
        return {
            x: this.x,
            y: this.y,
            increaseX: this.increaseX,
            increaseY: this.increaseY
        }
    }

    setSpeed(increaseX,increaseY){
        this.increaseX = increaseX;
        this.increaseY = increaseY;
    }
}

class BaseMolecule extends Molecule{
    constructor() {
        super();
        this.setColor("blue");
    }
}

class ReferenceMolecule extends Molecule {
    constructor() {
        super();
        this.setColor("red");
        this.lastX = this.x;
        this.lastY = this.y;
    }

    drawTraiettory(){
        /*
        * marks the trajectory on the second canvas, 
        * placed under the first one
        */
        var canvas2 = document.getElementById('canvas-brownian');
        var ctx2 = canvas2.getContext("2d");
        ctx2.strokeStyle = "grey";
        ctx2.lineWidth = 4;
        ctx2.beginPath();
        ctx2.moveTo(this.lastX,this.lastY);
        ctx2.lineTo(this.x,this.y);
        this.lastX = this.x;
        this.lastY = this.y;
        ctx2.stroke(); 
    }
}

const molecules = (function(){
    //Fills the array with base molecules and one reference molecule
    let array = [];
    for(var i = 0; i < 200; i++){
        array.push(new BaseMolecule());
    }
    array.push(new ReferenceMolecule());
    return array;
})();

function closure(){
    //used to block/allow the animation
    let permission = false;
    return {
        allow(){
            permission = true;
        },
        block(){
            permission = false;
        },
        read(){
            return permission;
        }
    }
}

const animationMem = closure();

const animation = () => {
    if(animationMem.read()){
        //This function takes care of animating the canvas
        var canvas = document.getElementById('canvas-particles');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var l = 0; l < molecules.length; l++){
            var baseMol = molecules[l];
            baseMol.animate(molecules);
        }

        const refMol = molecules[molecules.length - 1];
        refMol.drawTraiettory();
        window.requestAnimationFrame(animation);
    }
};

// ------- button listeners ------- //

document.getElementById("start-btn").addEventListener("click", function(){
    document.getElementById("start-btn").disabled = true;
    document.getElementById("stop-btn").disabled = false;
    document.getElementById("clear-btn").disabled = true;

    animationMem.allow();
    animation();
}); 

document.getElementById("stop-btn").addEventListener("click", function(){
    document.getElementById("start-btn").disabled = true;
    document.getElementById("stop-btn").disabled = true;
    document.getElementById("clear-btn").disabled = false;

    animationMem.block();
}); 

document.getElementById("clear-btn").addEventListener("click", function(){
    document.getElementById("start-btn").disabled = false;
    document.getElementById("stop-btn").disabled = true;
    document.getElementById("clear-btn").disabled = true;

    var canvasPart = document.getElementById('canvas-particles');
    const ctxPart = canvasPart.getContext('2d');
    ctxPart.clearRect(0, 0, canvasPart.width, canvasPart.height);

    var canvasBrw = document.getElementById('canvas-brownian');
    const ctxBrw = canvasBrw.getContext('2d');
    ctxBrw.clearRect(0, 0, canvasBrw.width, canvasBrw.height);
}); 