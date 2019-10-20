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

        //characters : [gryffindor, slytherin, hufflepuff, ravenclaw],

    }
    console.log(gameCharacter.characters);

    for(var i = 0; i<gameCharacter.characters.length; i++){
        var charButton = $("<div>");
        charButton.addClass("char-button " + gameCharacter.characters[i].name); 
        charButton.attr("char", gameCharacter.characters[i].name);
        charButton.append("<p>"+gameCharacter.characters[i].name + "</p>");
        charButton.append("<img src=" + gameCharacter.characters[i].image + " class='charImage' width = 100px>");
        charButton.append("<p>"+gameCharacter.characters[i].healthScore + "</p>");
        $("#pickACharacter").append(charButton);
    }




})
