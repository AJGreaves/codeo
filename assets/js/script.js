let displayedQuestion = "";

fetch('data/questions.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let question = data[0];
        displayQuestion(question);
        displayAnswerOptions(question);
        displayedQuestion = question;
    })
    .catch(error => console.error(error));

let submitBtn = document.querySelector('#submitBtn');

/**
* Changes the class name of the play button based on the type of mouse event received.
* If the mouse is pressed down on the button, changes the class to "button-down".
* If the mouse is released from the button, changes the class back to "button-up".
* The changing classes animate the box-shadow and color of the button 
* making it appear to move up and down
@param {MouseEvent} event - The mouse event object.
*/
function clickButton(event) {
    if (event.type === "mousedown") {
        submitBtn.classList.remove("button-up");
        submitBtn.classList.add("button-down");
    } else if (event.type === "mouseup") {
        submitBtn.classList.remove("button-down");
        submitBtn.classList.add("button-up");
        checkAnswer();
    }
}

submitBtn.addEventListener("mousedown", clickButton);
submitBtn.addEventListener("mouseup", clickButton);

function displayQuestion(question) {
    console.log(question.challenge);
    document.querySelector("#instruction").innerText = question.instruction;
    let challengeBox = document.querySelector("#challenge");
    challengeBox.innerText = question.challenge;
    if (question.challengeType === "describe") {
        challengeBox.classList.add("code");
    } else if (question.challengeType === "write code") {
        challengeBox.classList.remove("code");
    }
}

/**
* Displays the answer options for a given question on the HTML page.
* @param {Object} question - The question object containing the answer options.
* This function shuffles the answer options and then dynamically generates HTML
* content to display the answer options on the page. Each answer option is displayed as a
* clickable block within the "answerOptionsBox" div element.
* Finally, event listeners are added to each option block, so that when an option block is clicked,
* the "selectBlock" function is called.
*/
function displayAnswerOptions(question) {
    console.log(question.answerOptions);
    let answerOptions = question.answerOptions.sort(() => Math.random() - 0.5);
    let htmlContent = ``
    for (i = 0; i < answerOptions.length; i++) {
        htmlContent += `<div class="optionBlock">${answerOptions[i]}</div>`;
    }
    document.querySelector("#answerOptionsBox").innerHTML = htmlContent;

    let optionBlocks = document.getElementsByClassName("optionBlock");
    for (i = 0; i < optionBlocks.length; i++) {
        optionBlocks[i].addEventListener("click", selectBlock);
    }
}

/**
* Selects an answer option when it is clicked and moves it to the appropriate container on the HTML page.
* This function is called when an answer option block is clicked. It first identifies whether the block
* is currently in the "answerOptionsBox" or the "answerBox" container, and then moves it to the other.
 */
function selectBlock() {
    let answerBox = document.getElementById("answerBox");
    let answerOptionsBox = document.getElementById("answerOptionsBox");

    if (this.parentElement === answerOptionsBox) {
        answerOptionsBox.removeChild(this);
        answerBox.appendChild(this);
    } else if (this.parentElement === answerBox) {
        answerBox.removeChild(this);
        answerOptionsBox.appendChild(this);
    }
}


function checkAnswer() {
    let answerBox = document.getElementById("answerBox");
    let optionBlocks = answerBox.getElementsByClassName("optionBlock");
    let guess = "";

    for (i = 0; i < optionBlocks.length; i++) {
        guess += optionBlocks[i].textContent + " ";
    }

    if (displayedQuestion.validAnswers.includes(guess.slice(0, -1))) {
        alert("correct!");
    } else {
        alert(`Incorrect, the correct answer is:
        ${displayedQuestion.validAnswers[0]}`);
    }

}