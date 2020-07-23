"use strict";

function draw_grid_axis(){

    const canvas = document.getElementById("drawing_canvas");
	const ctx = canvas.getContext("2d");

	//draws the grid and the numbers on the X and Y grid
	for(let i=0; i<canvas.width/8; i++){
		for(let l=0; l<canvas.height/4; l++){
			ctx.beginPath();
			ctx.rect(i *canvas.width/8,l * canvas.height/4,canvas.width/4,canvas.height/4);
			ctx.stroke();
			ctx.fillStyle = "#cccccc";
			ctx.fill();
		}
	}
	
	//draws the X axis
	ctx.beginPath();
	ctx.moveTo(0, canvas.height/2);
	ctx.lineTo(canvas.width, canvas.height/2);
	ctx.stroke();

	//draws the Y axis
	ctx.beginPath();
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, canvas.height);
	ctx.stroke();

	//writes the values on the X and Y axis
	ctx.font = "25px Arial";
	ctx.fillStyle = "black";
	for(let i=0; i<canvas.width/8; i++){
		const value = (2 - i);
		if(i == 0){
			ctx.fillText(value, canvas.width/2 + 10, i * canvas.height/4 + 30);
		} else if(i != 2){
			//I avoid putting value in the center
			ctx.fillText(value, canvas.width/2 + 10, i * canvas.height/4 - 20);
		}	
	}
	for(let l=0; l<canvas.width/8; l++){
		const angle = ((l - 4) * 90) + "°";
		if(l == 0){
			ctx.fillText(angle, l *canvas.width/8 + 10, canvas.height/2 + 30);
		} else if(l == 8){
			ctx.fillText(angle, l *canvas.width/8 - 60, canvas.height/2 + 30);
		} else {
			ctx.fillText(angle, l *canvas.width/8 + 10, canvas.height/2 + 30);
		}	
	}

}

draw_grid_axis();

//used to display numeric x and y values
function display_values(span_id,value_to_display){
	const span = document.getElementById(span_id);
	span.removeChild(span.firstChild); 	//remove last child created
	const txt = document.createTextNode(value_to_display);
	span.appendChild(txt);
}

//closure for the loop
function closure_vars(){
	let status = false;
	let zoom = 4;
    return {
        change(bool){
            status = bool; //invert
        },
        get_status(){
            return status;
		}
    }
}

const loop_status = closure_vars();

//draw the selected curve
function start_curve() {
    const canvas = document.getElementById("drawing_canvas");
    const ctx = canvas.getContext("2d");
	if(!loop_status.get_status()){	//called only one time

		loop_status.change(true);

		const select = document.getElementById("user_choice");
		const type_of_shape = select.options[select.selectedIndex].value;

		//store the desired curve chosen by the user
		let chosen_trigonometric;

		if(type_of_shape == 0){				//sin
			chosen_trigonometric = function () {
			    return Math.sin(this);
			}
		} else if(type_of_shape == 1){			//cos
			chosen_trigonometric = function () {
			    return Math.cos(this);
			}
		} else if(type_of_shape == 2){			//tan
			chosen_trigonometric = function () {
				return Math.tan(this);
			}
		} else if(type_of_shape == 3){			//cot
			chosen_trigonometric = function () {
				return 1 / Math.tan(this);
			}
		} else if(type_of_shape == 4){			//sec
			chosen_trigonometric = function () {
				return 1 / Math.cos(this);
			}
		} else if(type_of_shape == 5){			//csc
			chosen_trigonometric = function () {
				return 1 / Math.sin(this);
			}
		}

		let x = 0;
		let y = 0;

		function draw_curve(){
			const interval = setTimeout(function () { //called every 50ms
                if(loop_status.get_status()){
    				x++;
    				if (x <= canvas.width) {
						y = canvas.height/2 - chosen_trigonometric.call(x*Math.PI/180)*canvas.height/4;

						ctx.beginPath();
						ctx.arc(x, y, 3, 0, 2 * Math.PI);
						ctx.fillStyle = "#1e90ff";
						ctx.fill();

                        //arc degrees
    					display_values("x_value", x - canvas.width/2);
                        //values between -1 and +1
    					display_values("y_value",(
                            //this also removes the negative zero
                             (1 - y/(canvas.height/2)).toFixed(3) == -0  ? 0 : (1 - y/(canvas.height/2)).toFixed(3))
                         );
    					draw_curve();
                    }
				}
			}, 50);
			if(!loop_status.get_status()){  //if it is false
				clearInterval(interval);
			}
		}
		draw_curve();

	}
}

function clear_canvas(){
    const canvas = document.getElementById("drawing_canvas");
    const ctx = canvas.getContext("2d");
    loop_status.change(false);
    display_values("x_value",0);
    display_values("y_value",0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid_axis();
}