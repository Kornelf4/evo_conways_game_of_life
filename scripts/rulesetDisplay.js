function updateDisplay() {
    for(let i = 0; i < selectedRuleset.checkedLocations.length; i++) {
        for(let i2 = 0; i2 < selectedRuleset.checkedLocations[i].length; i2++) {
            if(i == 2 && i2 == 2) continue;
            if(selectedRuleset.checkedLocations[i][i2]) {
                document.getElementById(`l${i2}_${i}`).style.border = "5px solid orange";
            } else {
                document.getElementById(`l${i2}_${i}`).style.border = "0px solid orange";
            }
        }
    }
    document.getElementById("conditionContainer").innerHTML = "";
    for(let i = 0; i < selectedRuleset.conditionList.length; i++) {
        let conditionBox = document.createElement("div");
        conditionBox.classList.add("conditionBox");

        let conditionNum = document.createElement("div");
        conditionNum.classList.add("conditionNum");
        conditionNum.innerText = i;

        let conditionResult = document.createElement("div");
        conditionResult.classList.add(selectedRuleset.conditionList[i] ? "alive" : "dead");
        conditionResult.innerText = selectedRuleset.conditionList[i] ? "Alive" : "Dead";
        conditionResult.id = "c" + i;
        conditionResult.addEventListener("click", function() {
            if(this.innerText == "Alive") {
                this.innerText = "Dead";
                this.classList.remove("alive");
                this.classList.add("dead");
            } else {
                this.innerText = "Alive";
                this.classList.remove("dead");
                this.classList.add("alive");
            }
            let thisIndex = parseInt(this.id.slice(1))
            selectedRuleset.conditionList[thisIndex] = !selectedRuleset.conditionList[thisIndex];
        })

        conditionBox.appendChild(conditionNum);
        conditionBox.appendChild(conditionResult);
        document.getElementById("conditionContainer").appendChild(conditionBox);
    }
}