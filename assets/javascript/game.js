$(document).ready(function() {
    
    var gameCharacter = {
        
        // array object that contains each character and associated properties
        characters: [gryffindor = {
                name: "Gryffindor",
                image: "assets/images/gryffindor.PNG",
                healthScore: 0,
                role: "",
                fightScore: 0
                },

                slytherin = {
                    name: "Slytherin",
                    image: "assets/images/slytherin.PNG",
                    healthScore: 0,
                    role: "",
                    fightScore: 0
                },
            
                hufflepuff = {
                    name: "Hufflepuff",
                    image: "assets/images/hufflepuff.PNG",
                    healthScore: 0,
                    role: "",
                    fightScore: 0
                },

                ravenclaw = {
                    name: "Ravenclaw",
                    image: "assets/images/ravenclaw.PNG",
                    healthScore: 0,
                    role: "",
                    fightScore: 0
                }],
        
        // sets some trackers to help game keep track of characters
        currentAttacker: 0,
        currentDefender: 0,
        attackerExists: false,
        defenderExists: false,

        // set initial healthscore for each character between 120 and 200
        setInitialHS: function(charNum){
            gameCharacter.characters[charNum].healthScore = Math.floor(Math.random()*80) +120;   
            gameCharacter.characters[charNum].fightScore = Math.floor(Math.random()*25 + 5);
        },

        // function to pick attacker - this will move character to the attacker section and reset 
        // classes in order to keep track of character as attacker
        pickAttacker: function(charNum){
    
            var pickedChar = $("." + gameCharacter.characters[charNum].name);
            gameCharacter.characters[charNum].role = "attacker";
            gameCharacter.currentAttacker = charNum;
            gameCharacter.attackerExists = true;
            attackAmount = gameCharacter.characters[charNum].fightScore;
            pickedChar.addClass(gameCharacter.characters[charNum].name + "attacker");
            pickedChar.removeClass(gameCharacter.characters[charNum].name);
            $("#yourCharacter").append(pickedChar);
            // moves the other 3 characters to the section that the user can pick defenders
            $.each(gameCharacter.characters, function(i, char){
                if(i !== charNum){
                    var unpickedChar = $("." + gameCharacter.characters[i].name);
                    gameCharacter.characters[i].role = "defender";
                    unpickedChar.removeClass(gameCharacter.characters[i].name);
                    unpickedChar.addClass(gameCharacter.characters[i].name + "-defender");
                    $("#enemies").append(unpickedChar);
                }
            })
            $("#pickACharacter").empty();
        },

        // function for the user to pick a defender, moves the character to the defender
        // section
        pickDefender: function(charNum){
            if(gameCharacter.defenderExists){
                $("#attackInfo").html("<p>Defender is already setup. Please attack.</p>");
            } else{
                var pickedChar = $("." + gameCharacter.characters[charNum].name + "-defender");
                gameCharacter.currentDefender = charNum;
                gameCharacter.defenderExists = true; 
                $("#defender").append(pickedChar);
                $("#enemies").remove("." + gameCharacter.characters[charNum].name + "-defender");
            }
        }

    }

    // initial function to start the page - iterates through the character list and creates an icon
    // that will be used as a button - this has name, picture, and fight score 
    initialize();

    function initialize(){
        for(var i = 0; i<gameCharacter.characters.length; i++){
            var charButton = $("<div>");
            charButton.addClass("char-button " + gameCharacter.characters[i].name); 
            charButton.attr("char", i);
            charButton.append("<p class=char-btn>"+gameCharacter.characters[i].name + "</p>");
            charButton.append("<img src=" + gameCharacter.characters[i].image + " class='charImage' width = 100px>");
            gameCharacter.setInitialHS(i);
            charButton.append("<p class=char-btn id=" + gameCharacter.characters[i].name + "score>"+gameCharacter.characters[i].healthScore + "</p>");
            $("#pickACharacter").append(charButton);
        }
    }

    // whenever a character button is pushed, it will determine if it needs to pick an attacker (if one
    // doesn't exist) or defender (if there is already an attacker)
    // the attribute on the character is the index of the character array so that it will know which character
    // to populate
    $(".char-button").on("click", function() {
            var idx = $(this).attr("char");
            console.log(idx);
            if(gameCharacter.characters[idx].role===""){
                gameCharacter.pickAttacker(idx);
            } else if(gameCharacter.characters[idx].role==="defender"){
                gameCharacter.pickDefender(idx);
            }
        })

        // this is the attack section. when an attacker and a defender is chosen, then the attack button 
        // will work (it will otherwise tell the user to pick a character). The attack button will determine
        // the current attack/defend amount by character and then subtract from the character's health score. As
        // the character's health score goes to zero, it determines if the game is won or loss. The attacker has to 
        // get through all three defenders to win.
    var numAttack = 1;
    var attackAmount = 0;
    var numDefendersDefeated = 0;
    $("#attack").on("click", function(){
        if(gameCharacter.attackerExists===false || gameCharacter.defenderExists===false){
            $("#attackInfo").html("<p> Please pick a character before attacking. </p>");
        } else {
            // the attack amount for the attacker will add their fight score each time it attacks
            attackAmount = gameCharacter.characters[gameCharacter.currentAttacker].fightScore*numAttack;
            // displays how many points the characters lose
            $("#attackInfo").html("<p> " + gameCharacter.characters[gameCharacter.currentAttacker].name 
                + " is attacking with " + attackAmount + " points. <br>"
                + gameCharacter.characters[gameCharacter.currentDefender].name + " is defending with " + 
                gameCharacter.characters[gameCharacter.currentDefender].fightScore + " points.</p>");
            gameCharacter.characters[gameCharacter.currentAttacker].healthScore -= gameCharacter.characters[gameCharacter.currentDefender].fightScore;
            gameCharacter.characters[gameCharacter.currentDefender].healthScore -= attackAmount;
            $("#" + gameCharacter.characters[gameCharacter.currentAttacker].name + "score").text(gameCharacter.characters[gameCharacter.currentAttacker].healthScore);
            $("#" + gameCharacter.characters[gameCharacter.currentDefender].name + "score").text(gameCharacter.characters[gameCharacter.currentDefender].healthScore);
            // determines if a character's health score falls below zero - meaning that round or the game is won/lost
            if(gameCharacter.characters[gameCharacter.currentAttacker].healthScore<=0){
                $("#attackInfo").html("<p>Game Over... You lose. Please reset to play again. </p>");
                $(".reset-button").css("visibility", "visible");
            } else if(gameCharacter.characters[gameCharacter.currentDefender].healthScore<=0 && numDefendersDefeated<2){
                $("#attackInfo").html("<p>Congrats! You beat " + gameCharacter.characters[gameCharacter.currentDefender].name + 
                ". Please pick another defender to attack.</p>");
                $("#defender").empty();
                gameCharacter.defenderExists=false;
                numDefendersDefeated++;
            } else if(gameCharacter.characters[gameCharacter.currentDefender].healthScore<=0 && numDefendersDefeated===2){
                $("#attackInfo").html("<p>Congrats! You beat " + gameCharacter.characters[gameCharacter.currentDefender].name + 
                ". YOU WIN!</p>");
                $("#defender").empty();
                $(".reset-button").css("visibility", "visible");
            }

            numAttack++;
        }
    })
  
    // resets the game - as there are no variables that need to be kept track of, it just re-loads the page
    $(".reset-button").on("click", function(){
        location.reload();
    })





})


// $(".reset-button").on("click", function(){
//     console.log("button is pushed");
//     initialize();
//     $("#yourCharacter, #enemies, #errors, #defender, #attackInfo, #reset").empty();
//     gameCharacter.setInitialHS();
//     gameCharacter.currentAttacker = 0; 
//     gameCharacter.currentDefender = 0;
//     gameCharacter.defenderExists = false;
//     gameCharacter.attackerExists = false;
// })

    // $('[char="Gryffindor"]').on("click", function() {
    //     gameCharacter.pickAttacker(0);
    // })
    // $('[char="Slytherin"]').on("click", function() {
    //     gameCharacter.pickAttacker(1);
    // })
    // $('[char="Hufflepuff"]').on("click", function() {
    //     gameCharacter.pickAttacker(2);
    // })
    // $('[char="Ravenclaw"]').on("click", function() {
    //     gameCharacter.pickAttacker(3);
    // })
    // $('[char="Gryffindordefender"]').on("click", function() {
    //     gameCharacter.pickDefender(0);
    // })
    // $('[char="Slytherindefender"]').on("click", function() {
    //     gameCharacter.pickDefender(1);
    // })
    // $('[char="Hufflepuffdefender"]').on("click", function() {
    //     gameCharacter.pickDefender(2);
    // })
    // $('[char="Ravenclawdefender"]').on("click", function() {
    //     gameCharacter.pickDefender(3);
    // })

    // $(".Gryffindor").on("click", function() {
    //     if(gameCharacter.characters[0].role===""){
    //         gameCharacter.pickAttacker(0);
    //     } else if(gameCharacter.characters[0].role==="defender"){
    //         console.log("button is being pushed");
    //         gameCharacter.pickDefender(0);
    //     }
        
    // })
    // $(".Slytherin").on("click", function() {
    //     if(gameCharacter.characters[1].role===""){
    //         gameCharacter.pickAttacker(1);
    //     } else if(gameCharacter.characters[1].role==="defender"){
    //         console.log("button is being pushed");
    //         gameCharacter.pickDefender(1);
    //     }
    // })
    // $(".Hufflepuff").on("click", function() {
    //     if(gameCharacter.characters[2].role===""){
    //         gameCharacter.pickAttacker(2);
    //     } else if(gameCharacter.characters[2].role==="defender"){
    //         console.log("button is being pushed");
    //         gameCharacter.pickDefender(2);
    //     }
    // })
    // $(".Ravenclaw").on("click", function() {
    //     if(gameCharacter.characters[3].role===""){
    //         gameCharacter.pickAttacker(3);
    //     } else if(gameCharacter.characters[3].role==="defender"){
    //         console.log("button is being pushed");
    //         gameCharacter.pickDefender(3);
    //     }
    // })
