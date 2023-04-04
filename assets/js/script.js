fetch('data/questions.json')
    .then(response => response.json())
    .then(data => {
        console.log(data); 
    })
    .catch(error => console.error(error));

let playBtn = document.querySelector('#playBtn');

/**
Changes the class name of the play button based on the type of mouse event received.
If the mouse is pressed down on the button, changes the class to "button-down".
If the mouse is released from the button, changes the class back to "button-up".
The changing classes animate the box-shadow and color of the button 
making it appear to move up and down
@param {MouseEvent} event - The mouse event object.
*/
function clickButton(event) {
    if (event.type === "mousedown") {
        playBtn.classList.remove("button-up");
        playBtn.classList.add("button-down");
    } else if (event.type === "mouseup") {
        playBtn.classList.remove("button-down");
        playBtn.classList.add("button-up");
    }
}

playBtn.addEventListener("mousedown", clickButton);
playBtn.addEventListener("mouseup", clickButton);