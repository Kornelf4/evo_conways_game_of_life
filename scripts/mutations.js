function getRndInteger(min, max) { // both included
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function randomRgb() {
    return `rgb(${getRndInteger(0, 255)}, ${getRndInteger(0, 255)}, ${getRndInteger(0, 255)})`;
}
function getRandLoc() {
    let result = {x: 2, y: 2};
    while(result.x == 2 && result.y == 2) { //The optimal solution.......
        result = {x: getRndInteger(0, 4), y: getRndInteger(0, 4)};
    }
    return result;
}
function mutRuleset(ruleset) {
    if(getRndInteger(0, 99) < mutationRate) {
        //Mutate the checked area
        let result = JSON.parse(JSON.stringify(ruleset));
        if(getRndInteger(0, 1) == 0) {
            let targetLoc = getRandLoc();
            if(result.checkedLocations[targetLoc.y][targetLoc.x]) {
                result.conditionList.pop();
            } else {
                result.conditionList.push(false); //Consider making this random
            }
            result.checkedLocations[targetLoc.y][targetLoc.x] = !result.checkedLocations[targetLoc.y][targetLoc.x];
        } else {
            //Mutate the livung conditions
            let targetIndex = getRndInteger(0, result.conditionList.length - 1);
            result.conditionList[targetIndex] = !result.conditionList[targetIndex];
        }
        colorMap[JSON.stringify(result)] = randomRgb();
        return result;
    } else {return ruleset;}
}