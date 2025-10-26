# The Silent Plane: Cellural automaton simulator and toolbox
(If you don't know what is Conway's Game of Life: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life)
Simple, minimalist JavaScript implementation of Conway's Game of Life and many similar cellural automatons. You can edit and view the cells rulesets, you can ever create your own! Interestingly, you can simulate multiple different cellural automatons at once, and you can also enable mutations (basically, there is a chance that the child cell will have slightly changed ruleset of the parent's) for a chaotic, but fun experience.
# Controls
- You can choose the simulation speed (turns/second)
- You can choose how likely are the mutations. That means if you change the mutation rate to 20, there will be 20% chance in every new living cell will have the mutated version of the parent's rulesets. (I prefer 1%)
- If you change a value in a text box, you have to hit enter after.
You can find more about controls on the game.
## How to try it
Two optons:
1. Go to itch.io page: https://kornelf.itch.io/conways-game-of-life-evolution
2. Download or clone this repository and open index.html in a browser.
## Bonus info
- The cells with the same ruleset have the same color.
- You can move the windows.
- The simulated world is infinite.
- Two types of mutation exists:
1. The checked area changes.
2. The reaction to the different amount of living neighbours (cells in the checked area) changes.
- This program was made in a few days, without external libraries or AI.
Note: I'm not an expert in this, and I'm still learning. I don't really know the complex math behind this, and I know that my code has a lot of limitations. But I know that it looks good and it's fun. If you like it give it a star, and if you have feedback or issue, feel free the create an issue here or ping me on discord (I'm in the ConwayLife server).