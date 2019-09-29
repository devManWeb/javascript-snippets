"use strict";

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
	const indicator_length = canvas_infos(0.40).height;

	function draw_stopwatch(d_seconds){
		draw_indicator(d_seconds,300,indicator_length,"#00b300",1.5);
	}

	function calculate_time_passed(d_seconds){
		/*
		* takes in tenths of a second, returns time passed
		* in an array of integers with the format HH:MM:SS:DS
		*/
		let hours = Math.floor(d_seconds / 36000);
		d_seconds = d_seconds - hours;

		let minutes = Math.floor(d_seconds / 600);
		d_seconds = d_seconds - minutes;
		minutes = minutes % 60;

		let seconds = Math.floor(d_seconds / 10);
		d_seconds = Math.floor(d_seconds - seconds);
		seconds = seconds % 60;

		d_seconds = d_seconds % 10;

		//we add 0 with single digit numbers
		let result_array = [hours,minutes,seconds,d_seconds];
		for(var i = 0; i<result_array.length;i++){
			if (result_array[i] >= 0 && result_array[i] < 10){
				result_array[i] = "0" + result_array[i];
			}
		}

		return result_array;

	}


	return{
		process(){
			if (isRunning){
				let now = new Date();
				internal_value = Math.abs(now - past_date) / 100;
				internal_value = Math.floor(internal_value);
			}
			draw_stopwatch(internal_value);
			const arr = calculate_time_passed(internal_value);
			update_DOM(arr[0],"stp-hh");	
			update_DOM(arr[1],"stp-mm");	
			update_DOM(arr[2],"stp-ss");	
			update_DOM(arr[3],"stp-ds");	

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
