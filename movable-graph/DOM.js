/***************************************************************
* code used to manage the DOM of the chart
****************************************************************/

function updateGraph(polylineId,dataToRead,pointColor){
	/*
	* function used to update graphs
	* polylineId is that of the polyline
	* dataToRead is the one-dimensional array with data
	* pointColor is the color to use for the added points
	*/
	function pointToAdd(x,y){
		/*
		* returns the coordinates for the points of the polylines
		* also for individual SVG points
		*/
		const x1 = x*5;
		const y1 = y;
		return [x1,y1];
	}

	function addSVGDot(x,y){
		//I add the SVG point on the graph
		const svgns = "http://www.w3.org/2000/svg";
		let container = document.getElementById("movable-graph");
		let circle = document.createElementNS(svgns, 'circle');
		circle.classList.add("graph-dots");
		circle.setAttributeNS(null, 'cx', x);
		circle.setAttributeNS(null, 'cy', y);
		circle.setAttributeNS(null, 'r', 2);
		circle.setAttributeNS(
			null, 'style',
			'fill: ' + pointColor + ' ; stroke: ' + pointColor + ' ; stroke-width: 1px;' 
		);
		container.appendChild(circle);
	}

	function resetGraph(polylineId){
		//removes the old points from the graph
		const polyline = document.getElementById(polylineId);
		polyline.setAttribute('points',"");

		var paras = document.getElementsByClassName('graph-dots');
		while(paras[0]){
		paras[0].parentNode.removeChild(paras[0]);
		}
	}

	// ----- part to update polyline and to add points -----//

	resetGraph(polylineId);
	
	const polyline = document.getElementById(polylineId);
	let points = polyline.getAttribute("points");
	for(let i = 0; i< dataToRead.length; i++){
		
		//saved data.js value
		const savedValue = dataToRead[i];
		const data = pointToAdd(i,savedValue);
		const x = data[0];
		const y = data[1]; 
		points += x + ", " + y + " ";
		addSVGDot(x,y);
	}
	polyline.setAttribute('points',points);
}