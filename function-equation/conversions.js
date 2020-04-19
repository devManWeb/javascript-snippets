/**
 * conversion between the coordinates of the canvas points and the real ones
 * @param {array} X and Y canvas values
 * @returns {array} X and Y real values
 */
function canvasToReal(coordinates){

	/* 
	* to make the scaling, we use the equation of the
	* line passing through two points
	*/
	const canvas = document.getElementById("drawing_canvas");

	const canvasX = coordinates[0];
	const canvasY = coordinates[1];
	const maxRealX = memory.getLimits()[0];
	const maxRealY = memory.getLimits()[1];
	const maxCanvasX = canvas.width;
	const maxCanvasY = canvas.height;

	let realX = canvasX/maxCanvasX * 2 * maxRealX - maxRealX;
	let realY = -1 * canvasY/maxCanvasY * 2 * maxRealY + maxRealY;

	return [realX,realY];
}

/**
 * conversion between the coordinates of the real points and the canvas ones
 * @param {array} X and Y real values
 * @returns {array} X and Y canvas values
 */
function realToCanvas(coordinates){
	/* 
	* to make the scaling, we use the equation of the
	* line passing through two points
	*/
	const canvas = document.getElementById("drawing_canvas");
	const realX = coordinates[0];
	const realY = coordinates[1];
	const maxRealX = memory.getLimits()[0];
	const maxRealY = memory.getLimits()[1];
	const maxCanvasX = canvas.width;
	const maxCanvasY = canvas.height;

	let canvasX = (realX + maxRealX) / 2 * maxRealX * maxCanvasX;
	let canvasY = canvas.height - ((realY + maxRealY) / 2 * maxRealY * maxCanvasY);

	return [canvasX,canvasY];
}

function keep2Decimals(num){
	return Math.round(num * 100) / 100;
}