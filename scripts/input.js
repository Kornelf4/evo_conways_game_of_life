window.addEventListener("keydown", (e) => pressedKeys[e.key.toLowerCase()] = true);
window.addEventListener("keyup", (e) => delete pressedKeys[e.key.toLowerCase()]);
canvas.addEventListener('click', function(event) {
    const rect = this.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    toggleCellAt(Math.floor((x + camera.x) / UNIT), Math.floor((y + camera.y) / UNIT), defaultRuleset);
});
document.getElementById("simSpeed").addEventListener("keydown", function(e)  {
    if(e.key === "Enter") updateGameSpeed(parseFloat(this.value));
})
document.getElementById("mutRate").addEventListener("keydown", function(e)  {
    if(e.key === "Enter") mutationRate = parseInt(this.value);
})