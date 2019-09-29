"use strict";

// ------- closure declarations -------

const clock = clock_closure();
const stopwatch = stopwatch_closure();
const alarm = alarm_closure();


// ------- Other code -------

function update_date(){
	/*
	* Called every tenth of a second, 
	* it updates the clock values 
	* and calls stopwatch_closure.tick_clock()
	*/

	draw_circle();
	clock.tick_clock();
	stopwatch.process();
	alarm.check();

}

update_date(); //first start

setInterval(update_date, 100); //clock updated every 1/10 of second
