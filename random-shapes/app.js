(function () {

    document.getElementById("start_button").addEventListener("click", start_shapes);
    document.getElementById("end_button").addEventListener("click", stop_shapes);
    document.getElementById("clear_button").addEventListener("click", clear_canvas);

    function vars_fx() {
        var run = false;
        var interval;
        return {
            set_run_status: function(new_value) {
                run = new_value;
            },
            get_run_status: function() {
                return run;
            },
            set_loop(){
                interval = setInterval(draw,250);
            },
            cancel_loop(){
                clearInterval(interval);
            }
        }
    };

    var status = vars_fx();

    function start_shapes(){
        if(!(status.get_run_status())){ //this prevents changes to the interval when draw is running
            status.set_run_status(true);
            status.set_loop();
        }
    }

    function stop_shapes(){
        status.set_run_status(false);
        status.cancel_loop();
    }

    function draw(){
        var select = document.getElementById("user_choice");
        var type_of_shape = select.options[select.selectedIndex].value;
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        ctx.beginPath();
        if(type_of_shape == 0){ //lines
            ctx.strokeStyle = random_hex_color();
            ctx.moveTo(random_num(600),random_num(300));
            ctx.lineTo(random_num(600),random_num(300));
            ctx.stroke();
        } else if(type_of_shape == 1){ //circles
            ctx.fillStyle = random_hex_color();
            ctx.arc(random_num(600),random_num(300), random_num(100), 0, 2 * Math.PI, false);
            ctx.fill();
        } else if(type_of_shape == 2){ //rectangles
            ctx.fillStyle = random_hex_color();
            ctx.rect(random_num(600),random_num(300),random_num(150),random_num(150));
            ctx.fill();
        }
    }

    function random_num(interval){
        return Math.floor(Math.random() * (interval));
    }

    function random_hex_color(){
        return "#000000".replace(/0/g,function(){
            return (~~(Math.random()*16)).toString(16);
        });
    }

    function clear_canvas(){
        var canvas = document.getElementById('canvas');
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, 600, 300);
    }

})();