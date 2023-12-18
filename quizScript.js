//keeps count of which question to select from the quizArray array
let count = 1;

let score = 0;

//variable to keep track of whether the quiz has ended, which is used in the timer
let quizEnded = false;

//for countdown timer
let currentTime = 90;

//keeps count of the number of correct and wrong answers chosen by user
let correctCount = 0;
let wrongCount = 0;

// array of radio buttons assigned to variable array "answer_radio"
let answer_radio = document.getElementsByName("answer_radio")


// function to display the instructions menu inside the card
function instructions() {
    document.getElementById("welcomeMsg").style.display = "none";
    document.getElementById("instructions_btn").style.display = "none";
    document.getElementById("quizCard").style.width = "600px";
    document.getElementById("instructions").style.display = "flex";
}

//function to start the quiz
function start() {
    document.getElementById("start_btn").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("questionsContainer").style.display = "block";

    //function to go to the next question
    nextQuestion();

    //function to start countdown timer when the user hits the start button
    startTimer();
}


// function that starts the countdown timer
function startTimer() {

    //timerID is assigned the token ID of setInterval which is used to stop the timer using clearInterval()
    let timerID = setInterval(() => {

        //variable used to add an extra '0' infront of single digit numbers
        let additionalCharacter = "";

        //decrements the current time by 1 for each second that passes
        currentTime--;

        //if the timer exceeds 0, a message to be displayed is sent to the endQuiz() function as an argument
        if (currentTime < 0) {
            endQuiz("You ran out of time.");
        }

        //the timer will be cleared if the timer exceeds 0, or if the user has completed the quiz before the timer runs out
        if ((currentTime < 0) || (quizEnded)) {
            clearInterval(timerID);
        }
        else {
            //adds an extra '0' infront of single digit numbers
            if (currentTime < 10) {
                additionalCharacter = "0";
            }

            //displays the current time in the "timer" div
            document.getElementById("timer").innerText = ("Time Remaining: " + additionalCharacter + currentTime);
        }

        //completes the above actions every 1000ms (1s)    
    }, 1000)
}


//function to go to the next question
function nextQuestion() {
    //if the user has not yet reached the end of the quiz, go to the 
    if (count < quizArray.length) {

        //function that displays the current question
        displayQuestion();

        //increments the question count by 1 to go to the next question
        count++;
    }
    else {
        //if the user has reached the end of the quiz, quizEnded will be assigned "true"
        quizEnded = true;

        //if the user reached the end of the quiz, a message to be displayed is sent to the endQuiz() function as an argument
        endQuiz("Congratulations!\nYou reached the end of the quiz.");
    }
}

// function that displays the current question along with the answers
function displayQuestion() {

    // variable "question" is assigned the value of the property "question" at the index "count" of the quizArray
    let question = count + ". " + quizArray[count]["question"];

    // the array "answers" is assigned the value of the property "answers" at the index "count" of the quizArray
    let answers = quizArray[count]["answers"];

    //the variable "correct" is assigned the value of the property "correct" at the index "count" of the quizArray. the formatting is made to create the correct answer's id
    let correct = "answer" + quizArray[count]["correct"];

    //the array "icons" is assigned the array containing answer numbers (ex: answer "a" , answer "b") which is at the 0th index of the quizArray
    let icons = quizArray[0];

    // function that sets all the radio buttons to unchecked after each question
    setDefault(answer_radio);

    // the current question is displayed at the "question" div element
    document.getElementById("question").textContent = question;

    //function to enable all radio buttons for each question so that the user can select an answer now."false" is sent as an argument to enable the buttons
    disableButtons(false);

    //for loop used to display the icon and answer in the "answer" div    
    for (let i = 1; i < 5; i++) {

        // "answer_id" is assigned the current answer's id to access it
        let answer_id = "answer" + i;

        //adding styles to the icons
        let icon = "<div class=\"icons\"><p>" + icons[i - 1] + "</p></div>";

        //setting the current answer and icon to the div with the current answer_id
        document.getElementById(answer_id).labels[0].innerHTML = icon + answers[i - 1];
    }


    //each radio button is looped through
    for (let i = 0, max = answer_radio.length; i < max; i++) {

        //if a radio button is clicked, the clicked() function is called with the "correct" variable as an argument
        answer_radio[i].onclick = function () {

            //assigning the return values of clicked() to the two variables "selected" and "isCorrect"
            //"isCorrect" is a variable used to denote if the answer selected by the user is correct or not. "selected" is the id of the selected radio button
            let { selected, isCorrect } = clicked(correct);

            //if the next_btn button is clicked, the removeColors() function and the nextQuestion() function is called 
            document.getElementById("next_btn").onclick = function () {

                //removes the outlined colours of the correct and wrong answers
                removeColors(correct, selected, isCorrect);

                //displays next question
                nextQuestion();
            }
        }
    }

}

//a function that is called when the user clicks on a radio button to select an answer. takes a variable "correct" as a parameter, which is the id of the correct answer
function clicked(correct) {

    //variable to keep track of whether the chosen answer is correct
    let isCorrect;

    //variable that holds the id of the selected radio button
    let selected;

    //loops through each radio button and assigned the checked one's id to the "selected" variable
    for (let i = 0; i < answer_radio.length; i++) {
        if (answer_radio[i].checked) {
            selected = answer_radio[i].id;
        }
    }

    //if the selected answer is incorrect, these actions are taken
    if (selected != correct) {

        //the number of wrong answers is incremented by 1
        wrongCount += 1;

        //the label of the selected radio button is given the styles in the "incorrect" class
        document.getElementById(selected).labels[0].classList.add("incorrect");

        isCorrect = false;

        //a cross is displayed next to the wrong answer
        document.getElementById(selected).labels[0].innerHTML += "<p style=\"color:#f00;\"class=\"checkmark_cross\">&nbsp;&cross;</p>";

    }
    //if the selected answer is incorrect, these actions are taken
    else {
        //the number of correct answers is incremented by 1
        correctCount += 1;

        //a checkmark is displayed next to the correct answer chosen
        document.getElementById(selected).labels[0].innerHTML += "<p style=\"color:#10d84f;\"class=\"checkmark_cross\">&nbsp;&checkmark;</p>";

        //the score is incremented by 1
        score++;
    }

    //displays the current score
    document.getElementById("score").innerHTML = "Score: " + score;

    //the label of the correct answer's radio button is given the styles in the "correct" class
    document.getElementById(correct).labels[0].classList.add("correct");

    // function to disable all radio buttons after the user has selected once to avoid multiple selected answers. "true" is sent as an argument to disable the buttons
    disableButtons(true);

    //the selected radio button's id and the "isCorrect" variable are returned
    return { selected, isCorrect };
}


//function used to disable the radio buttons after one of them is selected to avoid multiple answers being chosen
//"true" is sent as a parameter to disable the buttons, and "false" is sent as a parameter to enable the buttons
function disableButtons(value) {

    //each radio button is looped through and disabled
    for (let i = 1; i < 5; i++) {
        //answer_id is assigned the id of each button in order to disable them
        let answer_id = "answer" + i;

        //sets the disabled attribute to either true or false depending on the 
        document.getElementById(answer_id).disabled = value;
    }
}

//sets all the radio buttons to unchecked after each question ends
function setDefault(answer_radio) {
    for (let i = 0; i < answer_radio.length; i++) {
        answer_radio[i].checked = false;
    }
}

//removes all styles from the previous question's answers in order to proceed to the next question. (ex: the previous questions's incorrect answer's styles and cross are removed)
function removeColors(correct, selected, isCorrect) {
    document.getElementById(correct).labels[0].classList.remove("correct");
    if (!isCorrect) {
        document.getElementById(selected).labels[0].classList.remove("incorrect");
    }

}

//a function that takes the variable "message" as a parameter to display at the end of the quiz
function endQuiz(message) {

    //a variable that holds the grade and performance message 
    let comment = calculateGrade();

    //variable that holds all the information needed to be displayed at the end of the quiz
    let endInfo = ("Thank you for playing!\nYour score was: " + (score + "/" + (quizArray.length - 1)) + " , Wrong Answers: " + wrongCount + "\nTime Taken: " + (89 - currentTime) + " seconds");


    document.getElementById("quizCard").style.width = "400px";
    document.getElementById("quizEnd").style.display = "flex";
    document.getElementById("questionsContainer").style.display = "none";

    //displays the message at the "message" div
    document.getElementById("message").innerText = (message);

    //displays the endInfo at the "endInfo" div
    document.getElementById("endInfo").innerText = (endInfo);

    //adds the grade and comment at the "comment" div
    document.getElementById("comment").innerHTML = "\nGrade: " + comment;
}


//function that calculates the grade and returns the grade and a comment about performance
function calculateGrade() {

    //calculates the grade out of 100, rounded to an integer percentage
    let grade = Math.round((score / (quizArray.length - 1)) * 100);
    let comment;

    //adds a colour to the grade and performance message according to the performace (ex: if grade>65, colour is green)
    if (grade > 65) {
        comment = grade + "% , Well Done!  :)";
        document.getElementById("comment").style.color = "#0dac55";
    }
    else if (grade > 30) {
        comment = grade + "% , There is room for improvement :|";
        document.getElementById("comment").style.color = "rgb(174, 81, 5)";
    }
    else {
        comment = grade + "% , You can do better than that :(";
        document.getElementById("comment").style.color = "red";

    }
    //the comment is returned
    return comment
}


//function called if the user hits the "replay" button at the end screen
function replay() {

    //initialises all the values to erase the old game's data and start a new game
    count = 1;
    score = 0;
    quizEnded = false;
    //for countdown timer
    currentTime = 90;
    wrongCount = 0;
    correctCount = 0;

    document.getElementById("quizCard").style.width = "600px";
    document.getElementById("quizEnd").style.display = "none";
    document.getElementById("score").innerHTML = "Score: 0";
    document.getElementById("timer").innerHTML = "Time Remaining: 90";

    //the start() function is called to start the game again
    start();
}



