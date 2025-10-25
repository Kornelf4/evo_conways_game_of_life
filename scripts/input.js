window.addEventListener("keydown", (e) => pressedKeys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", (e) => delete pressedKeys[e.key.toLowerCase()]);
canvas.addEventListener('click', function(event) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    if(pressedKeys.c) {
        selectCellAt(Math.floor((x + camera.x) / UNIT), Math.floor((y + camera.y) / UNIT));
    } else {
        toggleCellAt(Math.floor((x + camera.x) / UNIT), Math.floor((y + camera.y) / UNIT), JSON.parse(JSON.stringify(defaultRuleset)));
    }
});
document.getElementById("simSpeed").addEventListener("keydown", function(e)  {
    if(e.key === "Enter") {
        updateGameSpeed(parseFloat(this.value));
        this.blur();
    }
})
document.getElementById("mutRate").addEventListener("keydown", function(e)  {
    if(e.key === "Enter") {
        mutationRate = parseInt(this.value);
        this.blur();
    }
})
document.getElementById("pauseButton").onclick = function() {
    isPaused = !isPaused;
    if(isPaused) {
        this.value = "Start";
    } else {
        this.value = "Pause";
    }
}
document.getElementById("stepButton").onclick = updateState;
document.getElementById("zoomInButton").onclick = () => {
    //TODO: This is kinda stupid
    let cameraCenterX = camera.x + canvas.clientWidth / 2;
    let cameraCenterY = camera.y + canvas.clientHeight / 2;
    let zoomingFactor = (UNIT + 5) / UNIT;
    cameraCenterX *= zoomingFactor;
    cameraCenterY *= zoomingFactor;
    camera.x = cameraCenterX - canvas.clientWidth / 2;
    camera.y = cameraCenterY - canvas.clientHeight / 2;
    UNIT += 5;
}
document.getElementById("zoomOutButton").onclick = () => {
    if (UNIT - 5 <= 0) return;
    let cameraCenterX = camera.x + canvas.clientWidth / 2;
    let cameraCenterY = camera.y + canvas.clientHeight / 2;
    let zoomingFactor = (UNIT - 5) / UNIT;
    cameraCenterX *= zoomingFactor;
    cameraCenterY *= zoomingFactor;
    camera.x = cameraCenterX - canvas.clientWidth / 2;
    camera.y = cameraCenterY - canvas.clientHeight / 2;
    UNIT -= 5;
}
document.getElementById("clearButton").onclick = () => {
    cellArray = [];
}
document.getElementById("randomPlot").onclick = () => {
    let squareSize = prompt("Size of square?");
    let plotChance = prompt("Chance on evry UNIT?");
    for(let i = 0;i < squareSize; i++) {
        for(let i2 = 0; i2 < squareSize; i2++) {
            if(Math.random() > plotChance) {
                cellArray.push(new Cell(i2, i, JSON.parse(JSON.stringify(defaultRuleset))));
            }
        }
    }
}