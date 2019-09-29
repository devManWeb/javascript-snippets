"use strict";

//  -------  ALARM CLOCK ------- 

function alarm_closure(){

	let playing = false;
	let snoozed = false;
	let interval;

	function alarm_cfg(){
		//reads the alarm configuration from the page
		let dom_string = document.getElementById("clock-cfg").value;
		let alarm_enabled = document.getElementById("alarm-enabled").checked;
		let array = dom_string.split(":");	
		return {
			"hour":array[0],
			"minute":array[1],
			"enabled":alarm_enabled
		}
	}


	function beep(){
		//beeps every second
		interval = setInterval(function(){
		    let context = new AudioContext();
		    let oscillator = context.createOscillator();
		    oscillator.type = "square";
		    oscillator.frequency.value = 500;
		    oscillator.connect(context.destination);
		    let current_time = context.currentTime;
			oscillator.start(current_time);
			oscillator.stop(current_time + 0.2);
		},500);
	}

	return{
		check(){
			//checks if the conditions to play the alarm are true
			let today = new Date();
			let curr_hour =  today.getHours();
			let curr_minute = today.getMinutes();

			let cfg_hour = alarm_cfg().hour;
			let cfg_minute = alarm_cfg().minute;

			if(
				alarm_cfg().enabled &&
				curr_hour == cfg_hour &&
				curr_minute == cfg_minute
			){
				if (playing == false && snoozed == false){
					beep();
					playing = true;
				}
			} else {
				clearInterval(interval);
				playing = false;
				snoozed = false; //if it's no longer alarm time
			}
		},
		snooze(){
			//stops alarm
			clearInterval(interval);
			playing = false;
			snoozed = true; //avoids alarm restart
		}
	}
}
