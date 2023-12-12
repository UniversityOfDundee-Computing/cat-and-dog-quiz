/**
 * https://alvarotrigo.com/blog/wait-1-second-javascript/
 * 
 * Add a delay
 * 
 * @param {number} milliseconds - Milliseconds to delay for
 * @returns - Timeout promise
 */
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

/**
 * https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
 * Fisher-Yates (aka Knuth) Shuffle.
 * 
 * Shuffle elements in the array
 * 
 * @param {[]} array - Array to shuffle
 * @returns Shuffled array
 */
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

/**
 * Capitalism first character of a string
 * 
 * @param {string} str - String to capitalize first character of
 * @returns First character capitalized string
 */
function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}




/**
 * Create an element for an answer
 * 
 * @param {string} answer - Answer to display
 * @returns Button element containing the answer
 */
function createAnswerElement(answer) {

    // Create button element
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'question-answer col-lg-4 col-sm-12';

    btn.innerHTML = answer;
    btn.id = answer;

    return btn;
}

/**
 * Delete an element by id
 * 
 * @param {string} id - Id of element to delete
 */
function deleteElementById(id) {

    var element = document.getElementById(id);

    if (element)
        element.remove()

}



function getUniqueSubset(array, size, include=null) {

    var unique = [];
    var values = array;

    // Include breed if passed
    if (include != null)
        unique.push(include);

    // Get unique breeds
    while (unique.length < size) {

        var ranIndex = Math.floor(Math.random() * values.length);

        const newValue = values.splice(ranIndex, 1)[0];

        // Check if breed already exists in unique breeds
        if (!unique.includes(newValue.name))
            unique.push(newValue.name);
    }

    return shuffle(unique);
}

function hidePopUp(){
    document.getElementById('fact').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
}

function updateGameOver(scoreElement, result){

    document.getElementById('game-over').classList.remove('hidden');
    document.getElementById('score').innerHTML = '';
    document.getElementById('score').append(scoreElement);
    document.getElementById('rank').innerText = result;
}


function saveQuiz(quiz){
    const quizString = JSON.stringify(quiz);
    window.localStorage.setItem('activeQuiz', quizString);
}