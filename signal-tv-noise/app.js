	"use strict";

	function closure_vars(){
		//closure used for animation start/stop and for sound
		let status = false;
		let audioApi;

		return {
			set_status(bool){
				status = bool;
			},
			get_status(){
				return status;
			},
			setAudioApi(obj){
				//used to memorize the AudioContext()
				audioApi = obj;
			},
			getAudioApi(){
				return audioApi;
			}
		}
	}

	const loop_status = closure_vars();

	function clear_canvas(){
		//used to clear the canvas
		let canvas = document.getElementById("drawing_canvas");
		let ctx = canvas.getContext("2d");
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}

	function draw_noise(){
		/*
		* draws random squares - only if we have the explict auth
		* performance is around 33-35 fps
		* the number of iterations of this loop is equal to
		* (canvas.height / INCREASE_COEFF_A) + (canvas.width/ INCREASE_COEFF_B)
		*/

		if(document.getElementById("run-auth").checked){
				
			clear_canvas();
			let canvas = document.getElementById("drawing_canvas");
			let ctx = canvas.getContext("2d");

			function random_boolean(){
				//returns a random boolean value
				return Math.round(Math.random()) == 1 ? true : false;
			}

			ctx.fillStyle = "black";

			const INCREASE_COEFF_A = 1.5;
			const INCREASE_COEFF_B = 2;

			for(let curr_height = 0; curr_height < canvas.height; curr_height = curr_height + INCREASE_COEFF_A){

				if(random_boolean()){
					continue;
				}

				for(let curr_width = 0; curr_width < canvas.width; curr_width = curr_width + INCREASE_COEFF_B){

					if(random_boolean()){
						continue;
					}

					//ctx.rect(x,y,width,height);
					ctx.fillRect(
						curr_width, 
						curr_height,
						2, 
						2
					);

				}

			}

			if(loop_status.get_status()){
				//update the animation on the monitor
				window.requestAnimationFrame(draw_noise);
			}

		} else {
			stop_noise();
		}
	}

	function generate_noise_sound(){
		let context = new AudioContext();
		loop_status.setAudioApi(context);
		const buffer_size = 4096;
		let noise = context.createScriptProcessor(buffer_size, 1, 1);
		noise.onaudioprocess = function(e) {
			let output = e.outputBuffer.getChannelData(0);
			for (let i = 0; i < buffer_size; i++) {
				output[i] = Math.random() * 2 - 1;
			}
		}
		noise.connect(context.destination);
	}

	function start_noise(){
		//starts the sound and image generation
		if(document.getElementById("run-auth").checked){
			//we must have the explicit auth
			document.getElementsByTagName("button")[0].disabled = true;
			document.getElementsByTagName("button")[1].disabled = false;
			loop_status.set_status(true);
			draw_noise();
			generate_noise_sound();
		}
	}

	function stop_noise(){
		/*
		* start button enabled, stop button disabled
		* image and sound generation stopped
		*/
		document.getElementsByTagName("button")[0].disabled = false;
		document.getElementsByTagName("button")[1].disabled = true;
		loop_status.set_status(false);
		loop_status.getAudioApi().close();
		clear_canvas();
	}
