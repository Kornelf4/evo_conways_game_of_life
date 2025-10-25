var cellArray = [];
var pressedKeys = {};
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var UNIT = 50;
var camera = { x: 0, y: 0 };
var cameraSpeed = 5;
var cameraMoveFPS = 60;
var updateSpeedFPS = 3;
var reqDeadCells = [];
var willBeRemoved = [];
var willBeAdded = [];
var isPaused = true;
var intervalID = null;
var mutationRate = 0;
var colorMap = {};
var grid = false;
var selectedCell = false;
var selectedRuleset = defaultRuleset;
colorMap[JSON.stringify(defaultRuleset)] = "rgba(2, 91, 8, 1)";

function start() {
    cellArray.push(new Cell(1, 2, JSON.parse(JSON.stringify(defaultRuleset))));
    initLocBoxes();
    updateDisplay();
    let boxElems = document.getElementsByClassName("locBox");
    for (let i = 0; i < boxElems.length; i++) {
        boxElems[i].addEventListener("click", function () {
            let thisX = this.id.slice(1).split("_")[0];
            let thisY = this.id.slice(1).split("_")[1];
            if (selectedRuleset.checkedLocations[thisY][thisX]) {
                selectedRuleset.conditionList.pop();
            } else {
                selectedRuleset.conditionList.push(false);
            }
            selectedRuleset.checkedLocations[thisY][thisX] = !selectedRuleset.checkedLocations[thisY][thisX];
            updateDisplay();
            if(selectedCell) selectedCell.updateColor();
        })
    }
}
function initLocBoxes() {
    let target = document.getElementById("locationContainer");
    for (let i = 0; i < 5; i++) {
        for (let i2 = 0; i2 < 5; i2++) {
            let actual = document.createElement("div");
            actual.classList.add("locBox");
            actual.id = `l${i2}_${i}`;
            target.appendChild(actual);
        }
    }
}
function renderCells() {
    canvas.setAttribute("width", document.getElementsByTagName("body")[0].clientWidth);
    canvas.setAttribute("height", document.getElementsByTagName("body")[0].clientHeight);
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    for (let i = 0; i < cellArray.length; i++) {
        cellArray[i].render();
    }
}
function updateCells() {
    //ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
    for (let i = 0; i < cellArray.length; i++) {
        cellArray[i].update();
    }
}
function getCellAt(x, y) {
    for (let i = 0; i < cellArray.length; i++) {
        if (cellArray[i].x == x && cellArray[i].y == y) return cellArray[i];
    }
    return false;
}
function toggleCellAt(x, y, ruleSet) {
    let target = getCellAt(x, y)
    if (target) {
        target.remove();
    } else {
        cellArray.push(new Cell(x, y, ruleSet));
    }
}
function selectCellAt(x, y) {
    if(getCellAt(x, y)) {
        if (selectedCell == getCellAt(x, y)) {
            selectedCell.isSelected = false;
            selectedCell = null;
            selectedRuleset = defaultRuleset;
            document.getElementById("modSelect").innerText = "default";
        } else {
            if(selectedCell) selectedCell.isSelected = false;
            selectedCell = getCellAt(x, y);
            selectedCell.isSelected = true;
            selectedRuleset = selectedCell.ruleset;
            document.getElementById("modSelect").innerText = "selected";
        }
    } else {
        if(selectedCell) selectedCell.isSelected = false;
        selectedCell = null;
        selectedRuleset = defaultDead;
        document.getElementById("modSelect").innerText = "dead";
    }
    updateDisplay();
}
function updateDeadCells() {
    for (let i = 0; i < reqDeadCells.length; i++) {
        let actDeadCell = JSON.parse(reqDeadCells[i]);
        let counter = 0;
        let possibleParentRulesets = [];
        for (let i = 0; i < defaultDead.checkedLocations.length; i++) {
            for (let i2 = 0; i2 < defaultDead.checkedLocations[i].length; i2++) {
                if (i == 2 && i2 == 2) continue;
                let target = getCellAt(actDeadCell.x + i2 - 2, actDeadCell.y + i - 2);
                if (defaultDead.checkedLocations[i][i2] && target) {
                    //Count living cells
                    counter++;
                    //Cache parent rulesets
                    possibleParentRulesets.push(target.ruleset);
                }
            }
        }
        //Select random ruleset
        let randRuleset = possibleParentRulesets[getRndInteger(0, possibleParentRulesets.length - 1)];
        if (defaultDead.conditionList[counter]) willBeAdded.push(new Cell(actDeadCell.x, actDeadCell.y, mutRuleset(randRuleset)));
    }
}
function updateState() {
    reqDeadCells = [];
    willBeRemoved = [];
    willBeAdded = [];
    updateCells();
    updateDeadCells();
    for (let i = 0; i < willBeRemoved.length; i++) {
        willBeRemoved[i].remove();
    }
    for (let i = 0; i < willBeAdded.length; i++) {
        cellArray.push(willBeAdded[i]);
    }
    renderCells();
}
function updateGameSpeed(to) {
    updateSpeedFPS = to;
    clearInterval(intervalID);
    intervalID = window.setInterval(() => {
        if (!isPaused) updateState();
        renderCells();
    }, 1000 / updateSpeedFPS);
}
window.setInterval(() => {
    //Update the camera on every gen? Abolutely.
    moveCamera();
}, 1000 / cameraMoveFPS);
intervalID = window.setInterval(() => {
    if (!isPaused) updateState();
    renderCells();
}, 1000 / updateSpeedFPS);