function draw_grid_axis(){

    var canvas = document.getElementById("drawing_canvas");
    var ctx = canvas.getContext("2d");

	//draws the grid
	for(i=0;i<canvas.width/8;i++){
		for(l=0;l<canvas.height/4;l++){
			ctx.beginPath();
			ctx.rect(i *canvas.width/8,l * canvas.height/4,canvas.width/4,canvas.height/4);
			ctx.stroke();
			ctx.fillStyle = "#cccccc";
			ctx.fill();
		}
	}

	//draws the X axis
	ctx.moveTo(0, canvas.height/2);
	ctx.lineTo(canvas.width, canvas.height/2);
	ctx.stroke();

	//draws the Y axis
	ctx.moveTo(canvas.width/2, 0);
	ctx.lineTo(canvas.width/2, canvas.height);
	ctx.stroke();

}

draw_grid_axis();

//used to display numeric x and y values
function display_values(span_id,value_to_display){
	var span = document.getElementById(span_id);
	span.removeChild(span.firstChild); 	//remove last child created
	var txt = document.createTextNode(value_to_display);
	span.appendChild(txt);
}

//closure for the loop
function closure_vars(){
    var status = false;
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
    var canvas = document.getElementById("drawing_canvas");
    var ctx = canvas.getContext("2d");
	if(!loop_status.get_status()){	//called only one time

		loop_status.change(true);

		var select = document.getElementById("user_choice");
		var type_of_shape = select.options[select.selectedIndex].value;

		//store the desired curve chosen by the user
		var chosen_trigonometric;

		if(type_of_shape == 0){				//sin
			ctx.moveTo(0,canvas.height/2);
			chosen_trigonometric = function () {
			    return Math.sin(this);
			}
		} else if(type_of_shape == 1){			//cos
			ctx.moveTo(1,canvas.height/2);
			chosen_trigonometric = function () {
			    return Math.cos(this);
			}
		}

		var x = 0;
		var y = 0;

		function draw_curve(){
			var interval = setTimeout(function () { //called every 50ms
                if(loop_status.get_status()){
    				x++;
    				if (x <= canvas.width) {
    					y = canvas.height/2 - chosen_trigonometric.call(x*Math.PI/180)*canvas.height/2;
    					ctx.lineTo(x,y);
    					ctx.stroke();
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
    var canvas = document.getElementById("drawing_canvas");
    var ctx = canvas.getContext("2d");
    loop_status.change(false);
    display_values("x_value",0);
    display_values("y_value",0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw_grid_axis();
}