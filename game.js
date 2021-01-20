//simon game

//variable
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var l=0;
var level =0;

//next-color-sequence
function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber= Math.floor(Math.random()*4);
  var randomChosenColour=buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  flash(randomChosenColour);
  play(randomChosenColour);
}

//click-flash
function flash(randomChosenColour){
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

//sound-function
function play(randomChosenColour){
  var aud = new Audio("sounds/"+randomChosenColour+".mp3");
  aud.play();
}

//click function
$(".btn").click( function() {
var userChosenColour=$(this).attr("id");
userClickedPattern.push(userChosenColour);
play(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
});

//click animation
function animatePress(currentColour){
  $("#"+currentColour ).addClass("pressed");
  setTimeout(() => {$("#"+currentColour).removeClass("pressed");}, 100);
}

//level and game-sart

  $(document).keypress(function(){
    if (l==0) {
    $("#level-title").text("level "+ level);
    nextSequence();
    l=1;
}
  });



//answer-check

function checkAnswer(currentLevel) {
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  console.log("success");
  if (userClickedPattern.length === gamePattern.length){
    setTimeout(function () {  nextSequence();  }, 1000);
  }
} else {
  var aud = new Audio("sounds/wrong.mp3");
  aud.play();
  $("body").addClass("game-over");
  setTimeout(() => {$("body").removeClass("game-over ");}, 200);
  $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
}
}

//Restart
function startOver(){
  l=0;
  level=0;
  gamePattern=[];
}

document.querySelector(".rule-button").addEventListener("click",function(){
  document.querySelector(".rule").classList.toggle("hide");
});
