const buttonColours = ['red', 'blue', 'green', 'yellow'];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//-----------------------------------------------------------------------
$(".btn").click(function() {
  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound('sounds/' + userChosenColour + '.mp3');
  checkUserSequence();
});

//-----------------------------------------------------------------------
$(document).keydown(function() {
  if (level === 0) {
    nextSequence();
  }
});

//-----------------------------------------------------------------------
function nextSequence() {
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#level-title").text("Level " + level);

  $("#" + randomChosenColour).fadeOut(200).fadeIn(200);
  playSound('sounds/' + randomChosenColour + '.mp3');
  level++;
}

//-----------------------------------------------------------------------
function playSound(name) {
  var audio = new Audio(name);
  audio.play();
}

//-----------------------------------------------------------------------
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//-----------------------------------------------------------------------
function animateGameOver() {
  $("body").addClass("game-over");
  playSound('sounds/wrong.mp3');
  setTimeout(function() {
    $("body").removeClass("game-over");
  }, 300);
}

//-----------------------------------------------------------------------
function checkUserSequence() {
  const lastIndex = userClickedPattern.length - 1;
  if (userClickedPattern[lastIndex] !== gamePattern[lastIndex]) {
    gameOver();
    return;
  }
  if (lastIndex === gamePattern.length - 1) {
    levelWon();
  }
}

//-----------------------------------------------------------------------
function gameOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;

  animateGameOver();
  $("#level-title").text("Game Over!! Press Any Button To Restart");
}

//-----------------------------------------------------------------------
function levelWon() {
  userClickedPattern = [];
  nextSequence();
}
