function draw_circle(){
		let canvas = document.getElementById("clock_canvas");
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
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
		
		ctx.beginPath();
		ctx.strokeStyle = color;
		ctx.moveTo(150,150);
		ctx.lineTo(x,y);
		ctx.stroke();
		
	}

	function draw_hours(hours){
		draw_indicator(hours,6,80,"#b30000");
	}
	function draw_minutes(mins){
		draw_indicator(mins,30,110,"#005ab3");
	}
	function draw_seconds(seconds){
		draw_indicator(seconds,30,145,"#000000");
	}

	function update_date(){

		function update_DOM(value,span_id){
			//this function is used to update the digital clock
			let span = document.getElementById(span_id);
			span.textContent = value;
		}

			let today = new Date();
			let curr_hour =  today.getHours();
			let curr_minute = today.getMinutes();
			let curr_seconds= today.getSeconds();

			draw_circle();

			draw_hours(curr_hour);
			update_DOM(curr_hour,"DOM-h");

			draw_minutes(curr_minute);
			update_DOM(curr_minute,"DOM-m");

			draw_seconds(curr_seconds);
			update_DOM(curr_seconds,"DOM-s");
	}

	update_date();
	setInterval(update_date, 1000); //clock updated every second