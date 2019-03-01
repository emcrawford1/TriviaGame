//Trivia javascript code

//Global variables

var correctAnswers = 0;
var incorrectAnswers = 0;
var notAnswered = 0;
var questionCounter = 0;
var timerInterval = 5;
var timerCountdown;
var isCorrect;


//Array of the list of questions, possible answers, actual answers, and the link to the gif to play after the question
//is answered
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
        question: "Which right wing player joined the Nashville Predators after a trade with the Philadelphia Flyers for Ryan Hartman?",
        possibleAnswers: ["Mike Fisher", "David Poile", "Ryan Hartman", "Wayne Simmonds"],
        rightAnswer: 3,
        image: "https://media.giphy.com/media/4HvgmTfWE6vgkQ5sfJ/giphy.gif"
    },

]

//This function handles the timer for the game.

function timer() {
    timerCountdown = setInterval(countDown, 1000);
}

//This function populates the page with new a new question at the beginning of the game, and after each question
function addQuestion() {

    timerInterval = 10;

    timer();

    $('#cardCenter').empty();
    $('#cardCenter').append($('<div id=timeRemaining>').text("Time Remaining: " + timerInterval));


    var questionDiv = $('<div id=triviaQuestion>');
    questionDiv.text(questionList[questionCounter].question);

    addDivs(questionDiv);
    $('#cardCenter').append(questionDiv);



}


//This function handles the decision for populating a new question or showing the stats.  It will only show the stats
//after all of the questions have been asked.
function setFunction() {
    if (questionCounter >= questionList.length) {
        giveStats();
    }
    else {
        addQuestion();
    }
}


//Function for counting down and displaying the time left.  This function is called by the timer function.  If time
//is up, this function clears the interval, iterates the notAnswered variable and passes a false bool (isCorrect variable)
//to the giveAnswer function.
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


//This function is called by the addQuestion function and adds the answer choices to the parent div which is passed
//to the function.
function addDivs(parentDiv) {

    for (var i = 0; i < questionList.length; i++) {
        var childDiv = $('<div class=question>');
        childDiv.text(questionList[questionCounter].possibleAnswers[i]);
        childDiv.attr("data-question-number", i);
        parentDiv.append(childDiv);
    }

}


//This function checks the answer the user provided.  If the user guessed correctly, it assigns the isCorrect variable
//to true.  If not it assigns false to the isCorrect variable.  This value is then passed to the giveAnswer function.
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

//This function displays whether the user got the answer correct, the correct answer, and a gif related to the question.
//The isCorrect bool variable is passed so that the function knows whether to tell the user that they got the answer 
//correct or not.
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


//This function displays the stats of the game and is called by the setFunction when all of the questions have been
//asked.  
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

//Just normal ol jQuery stuff.

$(document).ready(function () {

    $(document).on("click", "#startGame", addQuestion);

    $(document).on("click", "div.question", function (event) {
        var dataValue = $(this).attr("data-question-number");
        clearInterval(timerCountdown);
        checkAnswer(dataValue);
    });


});

