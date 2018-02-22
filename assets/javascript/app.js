$(document).ready(function() {
  var questions = [];
  var randQuestion;
  var opt;
  var intervalId;
  initializeArray();

  console.log(randQuestion);

  function initializeArray() {
    questions = [{text:"What color is the sky?",
                  options: ["white", "blue", "green", "lemonchiffon"],
                  answer: "blue"
                 },
                 {text:"What color is the ground?",
                  options: ["white", "blue", "green", "lemonchiffon"],
                  answer: "blue"
                 },
                 {text:"What color is the tree?",
                  options: ["white", "blue", "green", "lemonchiffon"],
                  answer: "blue"
                 }
    ];
    $("#questions").html("<button id='start' \
      class='startButton'>Start</button>");
  }
  function initialize() {
    randQuestion = questions[Math.floor(Math.random()*questions.length)];
    $("#questions").html(randQuestion.text);
    for (var i = 0; i < randQuestion.options.length; i++) {
      $("#questions").append("<br> <button id='options' class='options'>"+randQuestion.options[i] +
      "</button><br>");
    }

  }




  $("#start").on("click", function () {
    intervalId = setInterval(initialize, 2000);


  });

  $("#questions").on("click","button.options", function () {
    opt = $(this).text();
    if(opt === randQuestion.answer){
      console.log("correct");
    }
  });


});
