$(document).ready(function() {
  var questions = [];
  var randQuestion;
  var opt;
  var intervalId;
  var timer = 10;
  var index;
  var isEnd = false;
  var length;
  var endCount = 0;
  var isTimeUp = false;
  initializeArray();


  function initializeArray() {
     $.ajax({
        url: "https://opentdb.com/api.php?amount=10&category=9&type=multiple",
        method: "GET"
      }).then(function (response) {
        questions = response.results;
        console.log(questions);
      });
    // questions = [{text:"What color is the sky?",
    //               incorrect_answers: ["white", "blue", "green", "lemonchiffon"],
    //               answer: "blue",
    //               answered: false
    //              },
    //              {text:"What color is the ground?",
    //               incorrect_answers: ["white", "blue", "green", "lemonchiffon"],
    //               answer: "blue",
    //               answered: false
    //              },
    //              {text:"What color is the tree?",
    //               incorrect_answers: ["white", "blue", "green", "lemonchiffon"],
    //               answer: "blue",
    //               answered: false
    //              }
    // ];
    length = questions.length;
    $("#questions").html("<button id='start' \
      class='startButton'>Start</button>");
  }
  function initialize() {
    if(questions.length < 1){
      clearInterval(intervalId);
      $("#questions").html("Out of Questions.")
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
      questions.splice(index, 1);
      console.log(questions);
      randQuestion.incorrect_answers.push(randQuestion.correct_answer);
      $("#questions").html(randQuestion.question);
      for (var i = 0; i < randQuestion.incorrect_answers.length; i++) {
        $("#questions").append("<br> <button id='options' \
        class='options'>"+randQuestion.incorrect_answers[i] +
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
      timesUp();
    }
    else {
      $("#questions").html("INCORRECT <br>");
      $("#questions").append("Correct answer: "
      + randQuestion.correct_answer);
      timesUp();
    }
  });


});
