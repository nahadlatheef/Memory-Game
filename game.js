var buttonColours = ["red","blue","green","yellow"];
var gamePattern=[];
var userCLickedPattern= [];
var level = 0;

$(".btn").click(function(){
    var userChosenColour = this.id;
    userCLickedPattern.push(userChosenColour);
    
    $("#"+userChosenColour).addClass("pressed");
    setTimeout(function(){
        $("#"+userChosenColour).removeClass("pressed");
    },100);
    var audio = new Audio("sounds/" + userChosenColour +".mp3" );
    audio.play();

    checkAnswer(userCLickedPattern.length-1);
});


$(document).one("keypress", function(event){
    nextSequence();
})


function nextSequence(){
    
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    var audio = new Audio("sounds/"+randomChosenColour+".mp3");
    audio.play();

    level++;
    $("h1").text("Level " +level);
       
   
}


function checkAnswer(currentLevel){
    if (userCLickedPattern[currentLevel] === gamePattern[currentLevel]){

       if(userCLickedPattern.length == gamePattern.length){
        setTimeout(function(){
            nextSequence();
            userCLickedPattern = [];
        },750);
       }
       
    }else{
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function (){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        $("h1").css("line-height", "1.5");
        startOver();
        $(document).one("keypress", function(event){
            nextSequence();
        });
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userCLickedPattern = [];
}