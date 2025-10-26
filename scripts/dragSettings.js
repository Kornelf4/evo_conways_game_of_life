function onMouseDrag(event, element) {
    let leftValue = parseInt(window.getComputedStyle(element).left);
    let topValue = parseInt(window.getComputedStyle(element).top);
    element.style.left = `${leftValue + event.movementX}px`;
    element.style.top = `${topValue + event.movementY}px`;
}
let draggableElements = [
    document.getElementById("settingsBox"),
    document.getElementById("rulesetBox"),
    document.getElementById("helpBox")
]
for(let i = 0; i < draggableElements.length; i++) {
    draggableElements[i].addEventListener("mousedown", (e) => {
        const onMove = (event) => onMouseDrag(event, draggableElements[i]); 

        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", () => {
            document.removeEventListener("mousemove", onMove);
        }, { once: true });
    });
}