"use strict";

function clear_input(){
    document.getElementsByTagName("textarea")[0].value = "";
    document.getElementsByTagName("textarea")[1].value = "";
}

function reduce_text(){

    const MAX_CHARS = document.getElementsByTagName("input")[0].value;

    function process_line(line_str){
        /*
        * take every word of a line and remove a character,
        * repeat the process if we are still above MAX_CHARS,
        * if a word reaches a minumum of two characters, keep it that way
        * if we can no longer reduce anything, it raise an error
        * numbers are not reduced
        */
        if(line_str.length <= MAX_CHARS){
            return line_str;
        } else {
            
            //array of words divided by a space or a dot
            let to_reduce = line_str.split(/[ .]/); 
            
            function remove_empty(value) {
                //used by the filter above
                return value != "";
            }
            let temp_arr = to_reduce.filter(remove_empty);
            
            /*
            * we can still reduce one of the words present?
            * numbers are never reduced
            */
            let are_words_too_long = true;
            temp_arr.forEach(function(word) {
                if((word.length >= 3) && (/^\d+$/.test(word) == false)){
                    are_words_too_long = false;
                }
            });

            if(are_words_too_long){
                throw new Error("This sentence is too long to be shortened - please check this line!");
            } 	
              
            let part_proc_str = "";

            temp_arr.forEach(function(word,index) {
                if((word.length <= 2) && (word.length > 0)){ 
                    //if it is impossible to shorten this word, we keep it intact and we add a dot
                    part_proc_str += word;
                } else if (/^\d+$/.test(word)){ 
                    //if we have a number, keep it intact
                    part_proc_str += word;
                } else if (word[word.length] == "."){
                    //If there is already an abbreviation
                    part_proc_str += word.slice(0,-2); 
                } else {
                    part_proc_str += word.slice(0,-1); 
                }

                part_proc_str += ".";
      
            });

            return process_line(part_proc_str); //recursion
        }
    }

    let user_str = document.getElementsByTagName("textarea")[0].value;
    user_str.replace(/(\r\n|\r)/gm, "\n"); //we replace new lines with standard \n
    let user_arr = user_str.split("\n");

    let result_str = "";

    for (let item of user_arr) {
        try {
            result_str += process_line(item) + "\n";
        } catch(error) {
            result_str += error + " - The original phrase was: " + item + "\n"; 
        }
    }

    let result = document.getElementsByTagName("textarea")[1];
    result.value = "";
    result.value += result_str;
    
}

function select_text(){
    let result = document.getElementsByTagName("textarea")[1];
    result.focus();
    result.select();
}