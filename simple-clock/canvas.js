"use strict";

function canvas_infos(div){
	/*
	* returns an object with the canvas info
	* values are moltiplied by div
	*/
	let canvas = document.getElementById("clock_canvas");
	const width_to_use = canvas.width;
	const height_to_use = canvas.height;
	
	return {
		"width":width_to_use * div,
		"height":height_to_use * div
	}
}

function draw_indicator(data,unit_in_rad,length,color,height){
	/*
	* this function is used to draw the clock indicators 
	* data is the numeric value
	* unit_in_rad the width of the angle in rad of one unit of data 
	* es: 1 minute is 1/30 pi
	* length is the desired lenght of the indicator
	* color is the color of the indicator in HEX
	* height is the thickness
	*/ 
	let canvas = document.getElementById("clock_canvas");
	let ctx = canvas.getContext("2d");
	
	ctx.lineWidth = height;

	let curr_angle_rad = (data * Math.PI) / unit_in_rad;
	//we add a fixed amount to change the start position
	curr_angle_rad = curr_angle_rad + (1/6 * Math.PI * 45); 
	
	let x = canvas_infos(0.5).width + length*Math.cos(curr_angle_rad);
	let y = canvas_infos(0.5).height + length*Math.sin(curr_angle_rad);
	
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(canvas_infos(0.5).width,canvas_infos(0.5).height);
	ctx.lineTo(x,y);
	ctx.stroke();
	
}

function draw_circle(){
	//clears the canvas and draws the main circle
	let canvas = document.getElementById("clock_canvas");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	const two_radius = canvas_infos(0.46).width;	

	ctx.beginPath();
	ctx.arc(
		canvas_infos(0.5).width,
		canvas_infos(0.5).height, 
		two_radius, 
		0, 2 * Math.PI
	);
	ctx.fillStyle = "lightgrey";
	ctx.fill();
	
	ctx.strokeStyle = "black";
	ctx.lineWidth = 6;	
	ctx.stroke(); 

	/*
	* to draw the cleats of the hours we use draw_indicator
	* then we draw a grey circle  on top to hide part of those cleats
	*/

	const step_length = canvas_infos(0.45).height;
	for(var i=0;i<12;i++){
		draw_indicator(i,6,step_length,"#000000",1);
	}
	ctx.beginPath();
	ctx.arc(
		canvas_infos(0.5).width,
		canvas_infos(0.5).height,
		canvas_infos(0.38).width,
		0, 2 * Math.PI
	);
	ctx.fillStyle = "lightgrey";
	ctx.fill();

}

function update_DOM(value,span_id){
	//this function is used to update value in span tags
	let span = document.getElementById(span_id);
	span.textContent = value;
}
