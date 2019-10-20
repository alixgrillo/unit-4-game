$(document).ready(function() {
    
    var gameCharacter = {
        
        characters: [gryffindor = {
                name: "Gryffindor",
                image: "assets/images/gryffindor.PNG",
                healthScore: 0
                },

                slytherin = {
                    name: "Slytherin",
                    image: "assets/images/slytherin.PNG",
                    healthScore: 0
                },
            
                hufflepuff = {
                    name: "Hufflepuff",
                    image: "assets/images/hufflepuff.PNG",
                    healthScore: 0
                },

                ravenclaw = {
                    name: "Ravenclaw",
                    image: "assets/images/ravenclaw.PNG",
                    healthScore: 0
                }],

        // set initial healthscore for each character between 120 and 200
        setInitialHS: function(charNum){
            gameCharacter.characters[charNum].healthScore = Math.floor(Math.random()*80) +120;   
        }

        // move picked character to 

    }


    for(var i = 0; i<gameCharacter.characters.length; i++){
        var charButton = $("<div>");
        charButton.addClass("char-button " + gameCharacter.characters[i].name); 
        charButton.attr("char", gameCharacter.characters[i].name);
        charButton.append("<p>"+gameCharacter.characters[i].name + "</p>");
        charButton.append("<img src=" + gameCharacter.characters[i].image + " class='charImage' width = 100px>");
        gameCharacter.setInitialHS(i);
        charButton.append("<p>"+gameCharacter.characters[i].healthScore + "</p>");
        $("#pickACharacter").append(charButton);
    }

    $(".Gryffindor").on("click", function() {
        var charButton = $("<div>");
        var pickedChar = $(".Gryffindor");
        charButton.append(pickedChar);
        $("#yourCharacter").append(charButton);
        
        $("#pickACharacter").empty();

    })





})
