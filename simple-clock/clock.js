"use strict";

// ------- CLOCK -------

function clock_closure(){

	const hours_length = canvas_infos(0.22).height;
	const minutes_length = canvas_infos(0.30).height;
	const seconds_length = canvas_infos(0.35).height;

	function draw_hours(hours){
		draw_indicator(hours,6,hours_length,"#b30000",5);
	}
	function draw_minutes(mins){
		draw_indicator(mins,30,minutes_length,"#005ab3",3);
	}
	function draw_seconds(seconds){
		draw_indicator(seconds,30,seconds_length,"#000000",1.5);
	}

	return{
		tick_clock(){

			let today = new Date();
			let curr_hour =  today.getHours();
			let curr_minute = today.getMinutes();
			let curr_seconds = today.getSeconds();

			const hour_for_clock = curr_hour + (curr_minute / 60);
			//hour_for_clock is for a better accuracy of the clock hand

			draw_hours(hour_for_clock);
			update_DOM(curr_hour,"DOM-h");

			draw_minutes(curr_minute);
			update_DOM(curr_minute,"DOM-m");

			draw_seconds(curr_seconds);
			update_DOM(curr_seconds,"DOM-s");		
		}
	}
}
