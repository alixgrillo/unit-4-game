** Setup
- 4 characters setup - they are all assigned a health score value

** Play
- User clicks on one image to pick a player
    - Player moves to attacker section
    - Other three characters move to defender section

- User clicks on 1 defender
    - Character moves to defender section
    - Attack button becomes visible

- User clicks attack button
    - Attacker and defender are assigned a random number - this is fixed for game
    - This random number is deducted from both attacker and defender health scores
    - Each time attacker attacks, their random number is added to their attack value

- If attacker's health score falls below 0, then the game is lost.
    - Reset button appears

- If defender's health score falls below 0, then the user needs to pick another defender
    - New defender gets a random number assigned
    - Attacker's number continues to grow from previous attack amount

- If all defender's are defeated, then the game is won.
    - Reset button appears


** Character object
- Name
- Image
- Health score
- Attack/Defend value
- Function - Move locations on screen
- Function - attack (continue to grow amount)
