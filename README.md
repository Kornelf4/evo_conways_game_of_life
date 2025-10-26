# Evo Conway's Game of Life
(If you don't know what is Conway's Game of Life: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
Simple, minimalist JavaScript implementation of Conway's Game of Life, with one special feature: Every cell can have a different ruleset, which can mutate in every generation, so it shows some signs of natural selection.
## Controls
- You can choose the simulation speed (turns/second)
- You can choose how likely are the mutations. That means if you change the mutation rate to 20, there will be 20% chance in every new living cell will have the mutated version of the parent's rulesets. (I prefer 1%)
- If you change a value in a text box, you have to hit enter after.
You can find more about controls on the game.
## How to try it
You have two optons:
1. Go to itch.io page: https://kornelf.itch.io/conways-game-of-life-evolution
2. Download or clone this repository and open index.html in a browser.
## Bonus info
- The cells with the same ruleset have the same color.
- You can move the windows
- The simulated world is infinite
- Two types of mutation exists:
1. The checked area changes.
2. The reaction to the different amount of living neighbours (cells in the checked area) changes.
- This program was made in one day, without external libraries or AI.