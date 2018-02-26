$(document).ready(function() {
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

  initializeArray();


  function initializeArray() {
     $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=9&type=multiple",
        method: "GET"
      }).then(function (response) {
        questions = response.results;
        console.log(questions);
      });
    length = questions.length;
    $("#questions").html("<button id='start' \
      class='btn-lg btn-primary startButton'>START</button>");
  }

  function initialize() {
    if(questions.length < 1){
      clearInterval(intervalId);
      $("#questions").html("Out of Questions. <br>");
      $("#questions").append("Correct: " + correctCount + "<br>");
      $("#questions").append("Incorrect: " + incorrectCount+ "<br>");
      $("#questions").append("<button id='restart' \
        class='restart'>Restart</button>");
    }
    else {
      if(isEnd){
        clearInterval(intervalId);
        timer = 10;
        intervalId = setInterval(decrement, 1000);
        isEnd = false;
      }
      index = Math.floor(Math.random()*questions.length);
      randQuestion = questions[index];
      rand = Math.floor(Math.random()*randQuestion.incorrect_answers.length);
      questions.splice(index, 1);
      randQuestion.incorrect_answers.splice(rand,
        0,randQuestion.correct_answer);
      $("#questions").html(randQuestion.question);
      for (var i = 0; i < randQuestion.incorrect_answers.length; i++) {
        $("#questions").append("<br> <button id='options' \
        class='btn-primary options'>"+randQuestion.incorrect_answers[i] +
        "</button><br>");
      }
    }
  }

  function decrement() {
    //  Decrease number by one.
    timer--;
    $("#timer").html("Time left: "+timer);
    if(timer === 0){
      $("#questions").html("times up!!!");
      $("#questions").append("Correct answer: "
      + randQuestion.correct_answer);
      incorrectCount++;
      timesUp();
    }

  }

  function timesUp() {
    isEnd = true;
    console.log("here");
    clearInterval(intervalId);
    timer = 4;
    intervalId = setInterval(function () {
      $("#timer").html("Time left: "+timer);
      timer--;
    }, 1000);
    setTimeout(initialize, 4000);
  }

  $("#start").on("click", function () {
    intervalId = setInterval(decrement, 1000);
    initialize();

  });

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

  $("#questions").on("click","button.restart", function () {
    timer = 10;
    isEnd = false;
    intervalId = setInterval(decrement, 1000);
    correctCount = 0;
    incorrectCount = 0;
    initializeArray();
    initialize();
  });

});
