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
  initializeArray();


  function initializeArray() {
    questions = [{text:"What color is the sky?",
                  options: ["white", "blue", "green", "lemonchiffon"],
                  answer: "blue",
                  answered: false
                 },
                 {text:"What color is the ground?",
                  options: ["white", "blue", "green", "lemonchiffon"],
                  answer: "blue",
                  answered: false
                 },
                 {text:"What color is the tree?",
                  options: ["white", "blue", "green", "lemonchiffon"],
                  answer: "blue",
                  answered: false
                 }
    ];
    length = questions.length;
    $("#questions").html("<button id='start' \
      class='startButton'>Start</button>");
  }
  function initialize() {
    if(isEnd){
      clearInterval(intervalId);
      timer = 10;
      intervalId = setInterval(decrement, 1000);
      isEnd = false;
    }
    index = Math.floor(Math.random()*questions.length);
    randQuestion = questions[index];
reCheck:
      if(questions[index].answered === false){
      randQuestion = questions[index];
      questions[index].answered = true;
      endCount++;
    } else{
      index = Math.floor(Math.random()*questions.length);
      break reCheck;
    }
    if(endCount === length){
      $("#questions").html("Out of Questions");
    }
    $("#questions").html(randQuestion.text);
    for (var i = 0; i < randQuestion.options.length; i++) {
      $("#questions").append("<br> <button id='options' \
      class='options'>"+randQuestion.options[i] +
      "</button><br>");
    }

  }

  function decrement() {

    //  Decrease number by one.
    timer--;
    $("#timer").html("Time left: "+timer);
    if(timer === 0){
      console.log("times up");
      //questions.splice(index,1);
      isEnd = true;
      clearInterval(intervalId);
      initialize();
    }
  }

  function correct() {
    console.log("here");
    $("#questions").html("CORRECT!!!");
  }


  $("#start").on("click", function () {
    intervalId = setInterval(decrement, 1000);
    initialize();

  });

  $("#questions").on("click","button.options", function () {
    opt = $(this).text();
    if(opt === randQuestion.answer){
      correct();
      clearInterval(intervalId);
      setTimeout(initialize, 4000);
      isEnd = true;
    }
  });


});
