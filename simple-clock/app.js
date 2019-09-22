"use strict";

function draw_circle(){
	//clears the canvas and draws the main circle
	let canvas = document.getElementById("clock_canvas");
	let ctx = canvas.getContext("2d");
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.strokeStyle = "black";
	ctx.beginPath();
	ctx.arc(150, 150, 150, 0, 2 * Math.PI);
	ctx.stroke(); 
}

function draw_indicator(data,unit_in_rad,length,color){
	/*
	* this function is used to draw the clock indicators 
	* data is the numeric value
	* unit_in_rad the width of the angle in rad of one unit of data 
	* es: 1 minute is 1/30 pi
	* length is the desired lenght of the indicator
	* color is the color of the indicator in HEX
	*/ 
	let canvas = document.getElementById("clock_canvas");
	let ctx = canvas.getContext("2d");
	
	let curr_angle_rad = (data * Math.PI) / unit_in_rad;
	//we add a fixed amount to change the start position
	curr_angle_rad = curr_angle_rad + (1/6 * Math.PI * 45); 
	
	let x = 150 + length*Math.cos(curr_angle_rad);
	let y = 150 + length*Math.sin(curr_angle_rad);
	
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(150,150);
	ctx.lineTo(x,y);
	ctx.stroke();
	
}

function update_DOM(value,span_id){
	//this function is used to update value in span tags
	let span = document.getElementById(span_id);
	span.textContent = value;
}

// ------- function used for the indicators -------

function draw_hours(hours){
	draw_indicator(hours,6,80,"#b30000");
}
function draw_minutes(mins){
	draw_indicator(mins,30,105,"#005ab3");
}
function draw_seconds(seconds){
	draw_indicator(seconds,30,130,"#000000");
}

// ------- STOPWATCH -------

function stopwatch_closure(){
	/*
	* this closure is used to manage the stopwatch
	* with the above methods, we can start, stop or reset it
	* we calculate the value in 1/10 sec by subtracting the dates
	*/
	let isRunning = false;
	let internal_value = 0;
	let past_date = 0;

	return{
		tick_clock(){
			if (isRunning){
				let now = new Date();
				internal_value = Math.abs(now - past_date) / 100;
				internal_value = Math.floor(internal_value);
			}
			update_DOM(internal_value,"stopwatch-value");	
			return internal_value;		
		},
		start(){
			past_date = new Date();
			isRunning = true;
		},
		stop(){
			isRunning = false;
		},
		reset(){
			isRunning = false;
			internal_value = 0;
			past_date = 0;
		}
	}
}

const stopwatch = stopwatch_closure();

function draw_stopwatch(seconds){
	draw_indicator(seconds,300,145,"#00b300");
}

// ------- Other code -------

function update_date(){
	/*
	* Called every tenth of a second, 
	* it updates the clock values 
	* and calls stopwatch_closure.tick_clock()
	*/
	let today = new Date();
	let curr_hour =  today.getHours();
	let curr_minute = today.getMinutes();
	let curr_seconds = today.getSeconds();

	draw_circle();

	const hour_for_clock = curr_hour + (curr_minute / 60);
	//hour_for_clock is for better accuracy of the clock hand
	draw_hours(hour_for_clock);
	update_DOM(curr_hour,"DOM-h");

	draw_minutes(curr_minute);
	update_DOM(curr_minute,"DOM-m");

	draw_seconds(curr_seconds);
	update_DOM(curr_seconds,"DOM-s");

	let stopwatch_value = stopwatch.tick_clock();
	draw_stopwatch(stopwatch_value);

}

update_date(); //first start

setInterval(update_date, 100); //clock updated every 1/10 of second