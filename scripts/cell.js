class Cell {
    constructor(x, y, parentRuleset) {
        this.x = x;
        this.y = y;
        if(colorMap[JSON.stringify(parentRuleset)] === undefined) colorMap[JSON.stringify(parentRuleset)] = randomRgb();
        this.color = colorMap[JSON.stringify(parentRuleset)];//im serious
        this.ruleset = parentRuleset;
        this.isSelected = false;
    }
    updateColor() {
        if(colorMap[JSON.stringify(this.ruleset)] === undefined) colorMap[JSON.stringify(this.ruleset)] = randomRgb();
        this.color = colorMap[JSON.stringify(this.ruleset)];
    }
    remove() {
        if(this == selectedCell) {
            selectedCell = null;
            selectedRuleset = defaultRuleset;
        }
        cellArray.splice(cellArray.indexOf(this), 1);
    }
    render() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x * UNIT - camera.x, this.y * UNIT - camera.y, UNIT, UNIT);
        if(this.isSelected) {
            ctx.strokeStyle = "red";
            ctx.lineWidth = 5;
            ctx.strokeRect(this.x * UNIT - camera.x, this.y * UNIT - camera.y, UNIT, UNIT);
        }
    }
    update() {
        //check the cell itself
        let count = 0;
        for(let i = 0; i < this.ruleset.checkedLocations.length; i++) {
            for(let i2 = 0; i2 < this.ruleset.checkedLocations[i].length; i2++) {
                if(i == 2 && i2 == 2) continue;
                if(this.ruleset.checkedLocations[i][i2] && getCellAt(this.x + i2 - 2, this.y + i - 2)) count++;
            }
        }
        if(!this.ruleset.conditionList[count]) {
            willBeRemoved.push(this);
        }
        //detects dead cells near
        for(let i = 0; i < defaultDead.checkedLocations.length; i++) {
            for(let i2 = 0; i2 < defaultDead.checkedLocations[i].length; i2++) {
                if(i == 2 && i2 == 2) continue;
                /*let target = getCellAt(this.x + i2 - 2, this.y + i - 2);
                if(defaultDead.checkedLocations[i][i2] && !target && !reqDeadCells.includes(JSON.stringify({x: this.x + i2 - 2, y: this.y + i - 2}))) {
                    reqDeadCells.push(JSON.stringify({x: this.x + i2 - 2, y: this.y + i - 2}));
                }*/
               if(defaultDead.checkedLocations[i][i2]) {
                    let target = getCellAt(this.x - i2 + 2, this.y - i  + 2);
                    if(!target && !reqDeadCells.includes(JSON.stringify({x: this.x - i2 + 2, y: this.y - i  + 2}))) {
                        reqDeadCells.push(JSON.stringify({x: this.x - i2 + 2, y: this.y - i  + 2}));
                    }
               }
            }
        }
    }
}