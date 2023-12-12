// https://alvarotrigo.com/blog/wait-1-second-javascript/
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function dispatchAnswerCheckResultEvent(animaType, points) {

    const answerCheckResult = new CustomEvent('answerCheckResult', {
        detail: {
            points: points,
            animalType: animaType
        }
    });

    document.dispatchEvent(answerCheckResult);
}

/**
 * Returns a html element which contains the answer within.
 * 
 * @param {string} answer 
 * @returns element containing the answer
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


// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Fisher-Yates (aka Knuth) Shuffle.
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

function deleteElementById(id) {

    var element = document.getElementById(id);

    if (element)
        element.remove()

}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function getMultipleUniqueBreeds(animalBreeds, amount, includedBreed = null) {

    var uniqueBreeds = [];
    var breeds = animalBreeds;

    // Include breed if passed
    if (includedBreed != null)
        uniqueBreeds.push(includedBreed);

    // Get unique breeds
    while (uniqueBreeds.length < amount) {
        var ranIndex = Math.floor(Math.random() * breeds.length);

        const newBreed = breeds.splice(ranIndex, 1)[0];

        // Check if breed already exists in unique breeds
        if (!uniqueBreeds.includes(newBreed.name))
            uniqueBreeds.push(newBreed.name);
    }

    return shuffle(uniqueBreeds);
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

function loadQuiz(){

    var quizData = window.localStorage.getItem('activeQuiz');

    // If quiz is stored
    if (quizData){

        var parsedQuizData = JSON.parse(quizData);

        // Display single animal quiz
        if(parsedQuizData.name === 'Cat Quiz' || parsedQuizData.name === 'Dog Quiz' ){

            var questions = []

            // Reconstruct questions
            parsedQuizData.questions.forEach(data => {

                const question = QuestionFactory.createMultipleChoiceQuestion(data.question, data.answer, data.possibleAnswers, data.animalType, data.animalID);
                questions.push(question)
                
            });
            
            return new BreedsQuiz(parsedQuizData.name, parsedQuizData.theme, questions);
        }

        return null;
    }

    return null;
}