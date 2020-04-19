"use strict";

/**
 * draws the grid
 * also draw the saved points 
 * the lines between the poins
 * and inserts the equation function in the DOM
 */
function drawGridAxis(){

    const canvas = document.getElementById("drawing_canvas");
    const ctx = canvas.getContext("2d");

	for(let i=0; i<canvas.width/8; i++){
		for(let l=0; l<canvas.height/8; l++){
			ctx.beginPath();
			ctx.rect(i *canvas.width/8,l * canvas.height/8,canvas.width/4,canvas.height/4);
			ctx.strokeStyle = "#3f3f3f";
			ctx.stroke();
			ctx.fillStyle = "#e6e6e6";
			ctx.fill();
		}
	}

	//X axis
	ctx.moveTo(0, canvas.height/2);
	ctx.lineTo(canvas.width, canvas.height/2);
	ctx.stroke();

	const maxXLimits = memory.getLimits()[0];

	for(let i=0; i<canvas.width/8; i++){
		ctx.font = "15px Arial";
		ctx.fillStyle = "black";

		let fix = 10;
		if (i == 0){
			fix = 0;
		} else if (i == 8){
			fix = 20;
		}

		ctx.fillText(
			keep2Decimals(-maxXLimits + (maxXLimits/4 * i)), 
			i *canvas.width/8 - fix,
			canvas.height/2 - 5
		);

	}

	//Y axis
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, canvas.height);
	ctx.stroke();

	const maxYLimits = memory.getLimits()[1];

	for(let l=0; l <canvas.height/4; l++){

		if(l == 4){
			continue;
		}

		let fix = 0;
		if (l == 0){
			fix = 0;
		} else if (l == 8){
			fix = 15;
		}

		ctx.font = "15px Arial";
		ctx.fillStyle = "black";

		ctx.fillText(
			keep2Decimals(-maxYLimits + (maxYLimits/4 * l)), 
			canvas.width/2,
			canvas.height - (l * canvas.height/8) + fix
		);
	}

    //here we draw the points
	const realMemory = memory.read();

	if(realMemory.length > 0){

		realMemory.forEach(function(element){

			const canvasX = realToCanvas(element)[0];
			const canvasY = realToCanvas(element)[1];
			ctx.beginPath();
			ctx.arc(canvasX, canvasY, 2, 0, 2 * Math.PI, true);
			ctx.fillStyle = "blue";
			ctx.fill();
		})

		//lines
		for(let i = 1; i < realMemory.length; i++){

			const canvas0 = realToCanvas(realMemory[i - 1]);
			const canvas1 = realToCanvas(realMemory[i]);
			
			const x0 = canvas0[0];	
			const y0 = canvas0[1];			
			const x1 = canvas1[0];	
			const y1 = canvas1[1];

			ctx.beginPath();
			ctx.moveTo(x1, y1);
			ctx.lineTo(x0, y0);
			ctx.stroke();
		}

		document.getElementById("eq-txt").textContent = memory.getEquation();
	}

}

/**
 * used to clear the canvas
 */
function clearCanvas(){
    const canvas = document.getElementById("drawing_canvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGridAxis();
}

/**
 * @returns {array} with relative coordinates
 */
function getCanvasRelativeCoordinates(e){
	
	const X = e.clientX;
	const minX = window.innerWidth * 0.1;
	const maxX = window.innerWidth * 0.9;

	const Y = e.clientY;
	const minY = 10;
	const maxY = window.innerWidth * 0.45 + 10;

	if(X >= minX && X <= maxX){
		if(Y >= minY && Y <= maxY){
			
			clearCanvas();
			drawGridAxis();

			//formule calcolate con (x-x0)/(x1-x0) = (y-y0)/(y1/y0)
			const canvasX = (X - minX) / (window.innerWidth * 0.8) * 720;
			const canvasY = (Y - minY) / ((window.innerWidth + 10) * 0.45) * 400;

			return [canvasX,canvasY];
		}
	}
}

/**
 * movement of the blue grid
 * this fx updates also the dom with the x and y 
 * @param {object} e event object
 */
function blueGrid(e){
	const canvas = document.getElementById("drawing_canvas");
	const ctx = canvas.getContext("2d");
	const coordinates = getCanvasRelativeCoordinates(e);

	if(coordinates != undefined){

		const canvasX = coordinates[0];
		const canvasY = coordinates[1];
	
		ctx.beginPath();
		ctx.moveTo(0, canvasY);
		ctx.lineTo(canvas.width, canvasY);
		ctx.strokeStyle = "blue";
		ctx.stroke();
		
		ctx.beginPath();
		ctx.moveTo(canvasX, 0);
		ctx.lineTo(canvasX, canvas.height);
		ctx.strokeStyle = "blue";
		ctx.stroke();

		const xVal = keep2Decimals(canvasToReal(coordinates)[0]);
		const yVal = keep2Decimals(canvasToReal(coordinates)[1]);

		document.getElementById("x-val").textContent = xVal;
		document.getElementById("y-val").textContent = yVal;
	}
}

/**
 * saving of the selected point
 * @param {object} e event object
 */
function savingNewPoint(e){
	const coordinates = getCanvasRelativeCoordinates(e);

	if(coordinates != undefined){
		const realCoordinates = canvasToReal(coordinates);
		memory.add(realCoordinates);
	}
}