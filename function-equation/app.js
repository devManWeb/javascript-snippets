"use strict";

drawGridAxis();

onmousemove = function(e){
	function callback(){
		if(memory.read().length >= 1){
			document.getElementById("x-value").disabled = true;
			document.getElementById("y-value").disabled = true;
		}
		blueGrid(e);
	}
	window.requestAnimationFrame(callback);
}

onmousedown = function(e){
	function callback(){
		savingNewPoint(e);
	}
	window.requestAnimationFrame(callback);
}

document.getElementById("clear-button").addEventListener(
	"click",
	function(){
		document.getElementById("x-value").disabled = false;
		document.getElementById("y-value").disabled = false;
		memory.clear();
		clearCanvas();
	}
);

document.getElementById("x-value").addEventListener(
	"change",
	function(){
		memory.clear();
		clearCanvas();
		memory.setXLimit(document.getElementById("x-value").value);
		drawGridAxis();
	}
);

document.getElementById("y-value").addEventListener(
	"change",
	function(){
		memory.clear();
		clearCanvas();
		memory.setYLimit(document.getElementById("y-value").value);
		drawGridAxis();
	}
);