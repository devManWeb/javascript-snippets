const data = new graphData();
const move = new movementMng();

setInterval(function(){

    const newRandom = Math.floor((Math.random() * 100) + 1);
    data.add({
        newValue:newRandom
    })

    updateGraph(
        "memorized-values",
        data.read().numValues,
        "#07d900"
    );
},1000);

document.getElementById('movable-graph').addEventListener('mousedown', e => {
    move.allow();
});

window.addEventListener('mousemove', e => {
    if (move.isMovable()) {
        move.graph(e.clientX, e.clientY);
    }
});

window.addEventListener('mouseup', e => {
    move.block();
});