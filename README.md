# unit-4-game
Random Number Generator Face-off Game

As there were 4 characters, the fitting theme is Harry Potter, in which the houses face off against each
other.

Please access the game at https://alixgrillo.github.io/unit-4-game/.


## Table of Contents
* [About](#about)
* [How to Play](#how-to-play)
* [Technical Features](#technical-features)
* [Requirements](#requirements)
* [Build Tools](#build-tools)
* [Acknowledgements](#acknowledgements)
* [License](#license)


## About
The Harry Potter Attack Game is a character face off game. The user picks a character to be their attacker.
In order to win, they must compete and defeat all of the other characters. Each character is given a random
health score, between 120 and 200, which is displayed in the character button. The character is also assigned
a random fight score, between 5 and 30, which is initially unknown to the user. Each time there is an attack,
the character's health score will be reduced by their competitor's fight score. The attacker's initial fight score 
will be added to their fight score each round.

<img src="/assets/images/houses-background2.jpg" width= 75%>

## How to Play
To begin the game, the user should choose a character. And then choose a defender. The attacker will be the 
user's character for the remainder of the game.

<img src="/assets/images/game-startup.gif">

Once an attacker and defender is setup, the user should hit the attack button to allow the characters to face-
off. As soon as one of the character's healthscore falls below zero, the user will either need to pick a new
defender or the game is over. 

<img src="/assets/images/game-example.gif">

When the game is won or lost, a reset button will appear allowing the user to play again.

<img src="/assets/images/game-over.gif">

## Technical Features
* Each character resides in an array of objects that contains all pertinant information about that character,
including the `Math.floor(Math.random())` score and fight score.
* JQuery dynamically updates the DOM with each update in the game.

## Requirements
There are no requirements for this game.

## Build Tools
* HTML/CSS
* JQuery 3.2.1
* Google Font

## Acknowledgements
* Harry Potter Images