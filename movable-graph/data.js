/***************************************************************
* code used for the chart data
****************************************************************/

function graphData(){

    //object used to store data for the graph
    let data = {
        numValues: [],
        timeObject: []
    };

    return {
        add : function(object){
            //it is used to update the data, I provide an object
            //I do the necessary checks on the data to be added
            const newValue = Number(object.newValue);

            if(Number.isNaN(newValue) == false){                       
                data.numValues.push(newValue);
            }

            function keepOnly20(array){
                //it only keeps the last 20 most recent values
                while (array.length > 20){
                    array.shift();
                }
                return array; 
            }

            data.numValues = keepOnly20(data.numValues);
            data.timeObject = keepOnly20(data.timeObject)
        },

        read : function(){
            return data;
        }
    }
}