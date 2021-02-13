var buttonColors = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];


var gamePattern = [];

var level = 0;


var isStarted = false;

$(document).keydown(function() {
  if (isStarted === false) {
    $("#level-title").text("Level " + level);
    nextSequence();
    isStarted = true;

  }



});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      console.log("sucess");
      setTimeout(function() {
        nextSequence();
      }, 1000);


    }

  } else {
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();


    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }


}


function startOver(){
  level = 0;
  gamePattern =[];
  isStarted = false;
}



function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
  playSound(randomChosenColour);


}

$(".btn").click(function() {
  var userChoseColour = $(this).attr("id");
  userClickedPattern.push(userChoseColour);
  playSound(userChoseColour);
  animatePress(userChoseColour);
  console.log("clicked");
  checkAnswer(userClickedPattern.length-1);
});

function playSound(nameOfColor) {
  var audio = new Audio("sounds/" + nameOfColor + ".mp3");
  audio.play();

}

function animatePress(currentColor) {

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}
