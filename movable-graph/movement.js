/***************************************************************
* code used to manage chart movement on the page
****************************************************************/
function movementMng(){

    let canMove = false;

    return{
        allow: function(){
            canMove = true;
        },
        block:  function(){
            canMove = false;
        },
        isMovable: function(){
            return canMove;
        },
        graph: function(x, y) {
            const SVGelement = document.getElementById('movable-graph');
            SVGelement.style.left=x+"px";
            SVGelement.style.top=y+"px";
        }
    }
}