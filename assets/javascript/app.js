
$(document).ready(function() {
  //global variables
  var questions = [];
  var randQuestion;
  var opt;
  var intervalId;
  var timer = 10;
  var index;
  var rand;
  var isEnd = false;
  var correctCount = 0;
  var incorrectCount = 0;


  $("#questions").html("<button id='start' \
    class='btn-lg btn-primary startButton'>START</button>");

  //function to initialize the questions array using triva api (ajax call)
  function initializeArray() {
     $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=9&type=multiple",
        method: "GET"
      }).then(function (response) {
        questions = response.results;
        initialize();
        length = questions.length;
        console.log(questions);
      });


  }

  //function to pick the question and print it on the screen
  function initialize() {

    //if there are no questions left the game is over
    if(questions.length < 1){
      clearInterval(intervalId);
      $("#questions").html("Out of Questions. <br>");
      $("#questions").append("Correct: " + correctCount + "<br>");
      $("#questions").append("Incorrect: " + incorrectCount+ "<br>");
      $("#questions").append("<button id='restart' \
        class='restart'>Restart</button>");
    }
    //else pick a random question from the question array
    else {
      if(isEnd){
        clearInterval(intervalId);
        timer = 10;
        intervalId = setInterval(decrement, 1000);
        isEnd = false;
      }
      //create a random index from the questions array
      index = Math.floor(Math.random()*questions.length);
      randQuestion = questions[index];

      //create another random index for the answers array and remove it from the questions array
      rand = Math.floor(Math.random()*randQuestion.incorrect_answers.length);
      questions.splice(index, 1);

      //append the correct answer to the incorrect_answer array to display it for the user
      randQuestion.incorrect_answers.splice(rand,
        0,randQuestion.correct_answer);

      //print the question to the webpage
      $("#questions").html(randQuestion.question);
      for (var i = 0; i < randQuestion.incorrect_answers.length; i++) {
        $("#questions").append("<br> <button id='options' \
        class='btn-primary options'>"+randQuestion.incorrect_answers[i] +
        "</button><br>");
      }
    }
  }

  //helper function to decrement the timer
  function decrement() {
    timer--;
    $("#timer").html("Time left: "+timer);
    //check if the timer has run out and if so then mark as incorrect
    if(timer === 0){
      $("#questions").html("times up!!!");
      $("#questions").append("Correct answer: "
      + randQuestion.correct_answer);
      incorrectCount++;
      timesUp();
    }
  }

  //helper function to set the timer between questions
  function timesUp() {
    isEnd = true;
    clearInterval(intervalId);
    timer = 4;
    intervalId = setInterval(function () {
      $("#timer").html("Time left: "+timer);
      timer--;
    }, 1000);
    setTimeout(initialize, 1000);
  }

  //start the game
  $("#start").on("click", function () {
    intervalId = setInterval(decrement, 1000);
    initializeArray();

  });

  //Check what answer the user picked (right or wrong)
  $("#questions").on("click","button.options", function () {
    opt = $(this).text();
    if(opt === randQuestion.correct_answer){
      $("#questions").html("CORRECT!!!");
      correctCount++;
      timesUp();
    }
    else {
      $("#questions").html("INCORRECT <br>");
      $("#questions").append("Correct answer: "
      + randQuestion.correct_answer);
      incorrectCount++;
      timesUp();
    }
  });

  //Restart the game and reset everything
  $("#questions").on("click","button.restart", function () {
    timer = 10;
    isEnd = false;
    intervalId = setInterval(decrement, 1000);
    correctCount = 0;
    incorrectCount = 0;
    initializeArray();
  });
});
