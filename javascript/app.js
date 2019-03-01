//Trivia javascript code

//Global variables

var correctAnswers = 0;
var incorrectAnswers = 0;
var notAnswered = 0;
var questionCounter = 0;
var timerInterval = 5;
var timerCountdown;
var isCorrect;

var questionList = [
    {
        question: "Brian Boyle's jersey number multiplied by three equals which Nashville Predator's star player??",
        possibleAnswers: ["Viktor Ardvisson", "P.K. Subban", "Pekka Rinne", "Roman Josi"],
        rightAnswer: 0,
        image: "https://media.giphy.com/media/xk5wljKzLIfgGG97jr/giphy.gif"
    },
    {
        question: "Which Nashville Predator goalie won the 2018 Vezina trophy?",
        possibleAnswers: ["Juuse Saros", "Pekka Rinne", "Carey Price", "Corey Crawford"],
        rightAnswer: 1,
        image: "https://media.giphy.com/media/fGCu9n4P6qN6SbFeBf/giphy.gif"
    },
    {
        question: "Who's jersey number is Calle Jarnkrok's number minus Colton Sissons?",
        possibleAnswers: ["Yannick Weber", "Matt Irwin", "Filip Forsberg", "Juuse Saros"],
        rightAnswer: 2,
        image: "https://media.giphy.com/media/xUA7aP1Qd8SNfPDLos/giphy.gif"
    },
    {
        question: "Which right wing player joined the Nashville Predators after trade with the Philadelphi Flyers?",
        possibleAnswers: ["Mike Fisher", "David Poile", "Ryan Hartman", "Wayne Simmonds"],
        rightAnswer: 3,
        image: "https://media.giphy.com/media/4HvgmTfWE6vgkQ5sfJ/giphy.gif"
    },

]

//Setting countdown timer for the game

function timer() {
    timerCountdown = setInterval(countDown, 1000);
}

//Function for adding the question to the page.  This function 
function addQuestion() {

    timerInterval = 5;

    timer();

    $('#cardCenter').empty();
    $('#cardCenter').append($('<div id=timeRemaining>').text("Time Remaining: " + timerInterval));


    var questionDiv = $('<div id=triviaQuestion>');
    questionDiv.text(questionList[questionCounter].question);

    addDivs(questionDiv);
    $('#cardCenter').append(questionDiv);



}

function setFunction() {
    if (questionCounter >= questionList.length) {
        giveStats();
    }
    else {
        addQuestion();
    }
}


//Function for counting down and displaying the time left
function countDown() {

    timerInterval--;
    $('#timeRemaining').text('Time Remaining: ' + timerInterval);

    if (timerInterval < 1) {
        clearInterval(timerCountdown)
        notAnswered++;
        isCorrect = false;
        giveAnswer(isCorrect);
    }

}


//Function for adding divs to parent.  Might be able to refactor givStats function to utilize this function

function addDivs(parentDiv) {

    for (var i = 0; i < questionList.length; i++) {
        var childDiv = $('<div class=question>');
        childDiv.text(questionList[questionCounter].possibleAnswers[i]);
        childDiv.attr("data-question-number", i);
        parentDiv.append(childDiv);
    }

}


//This function checks the answer the user provided
function checkAnswer(dataValue) {


    if (parseInt(dataValue) === questionList[questionCounter].rightAnswer) {
        correctAnswers++;
        isCorrect = true;
    }
    else {
        incorrectAnswers++;
        isCorrect = false;
    }

    giveAnswer(isCorrect);

}

function giveAnswer(isCorrect) {

    var parentDiv = $('#cardCenter');
    parentDiv.empty();

    var index = questionList[questionCounter].rightAnswer;

    var answer = $('<div id=triviaQuestion>');
    var correctAnswer = $('<div id=correctAnswer>')
    correctAnswer.text("The correct answer is: " + questionList[questionCounter].possibleAnswers[index] + ".");
    var giphy = $('<img id=gif src=' + questionList[questionCounter].image + '>');

    
    if (isCorrect) {
        answer.text('Congratulations!  You answered correctly.')
    }
    else {
        answer.text('Sorry!  Wrong answer.')
    }

    parentDiv.append(answer);
    parentDiv.append(correctAnswer);
    parentDiv.append(giphy);

    questionCounter++;
    var timeout = setTimeout(setFunction, 5000);

}
//This function modifies the html to display the statistics from the game.

function giveStats() {

    var parentDiv = $('#cardCenter');
    parentDiv.empty();

    timerInterval = 35;
    questionCounter = 0;

    parentDiv.append($('<div id=gameDone>').text("You're finished!  Here are your stats: "));

    var correctAnswersDiv = $('<div>').attr("class", "endGameStats");
    correctAnswersDiv.text('Correct Answers: ' + correctAnswers);
    parentDiv.append(correctAnswersDiv);

    var incorrectAnswersDiv = $('<div>').attr("class", "endGameStats");
    incorrectAnswersDiv.text('Incorrect Answers: ' + incorrectAnswers);
    parentDiv.append(incorrectAnswersDiv);

    var notAnsweredDiv = $('<div>').attr("class", "endGameStats");
    notAnsweredDiv.text('Not Answered: ' + notAnswered);
    parentDiv.append(notAnsweredDiv);

    correctAnswers = 0;
    incorrectAnswers = 0;
    notAnswered = 0;

    var start = $('<div>').attr("id", "startGame");
    start.text('Start Over');
    parentDiv.append(start);

 

}


$(document).ready(function () {

    $(document).on("click", "#startGame", addQuestion);

    $(document).on("click", "div.question", function (event) {
        var dataValue = $(this).attr("data-question-number");
        clearInterval(timerCountdown);
        checkAnswer(dataValue);
    });


});

