var currentQuiz;

/**
 * Show all available quizzes
 */
function displayAvailableQuizzes() {

    removeAnswerEventListener();

    // Remove any stored data
    window.localStorage.removeItem('activeQuiz');

    // Show available quiz buttons
    document.getElementById('quizzes').classList.remove('hidden');

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');
}

/**
 * Start a quiz
 * 
 * @param {string} quiz - Name of quiz to start 
 */
function startQuiz(quiz) {

    hidePopUp();

    // Hide start quiz buttons
    document.getElementById('quizzes').classList.add('hidden');

    if (quiz === 'cat' || quiz === 'dog') {
        startAnimalQuiz(quiz);
    }
    else if (quiz === 'cat-dog') {
        startCatDogQuiz();
    }

}

/**
 * Start a quiz about a single animal
 * 
 * @param {string} animal - Animal to make a questions about
 */
async function startAnimalQuiz(animal) {

    currentQuiz = await QuizFactory.createAnimalQuiz(animal, 4);
    currentQuiz.start();
}

/**
 * Start cat dog quiz
 */
async function startCatDogQuiz() {

    currentQuiz = await QuizFactory.createCatDogQuiz(4);
    currentQuiz.start();
}

/**
 * Add event listeners
 */
function setupEventListeners(){

    // Find all quiz start buttons
    var startQuizBtns = document.getElementsByClassName('start-quiz-btn');
    startQuizBtns = Array.from(startQuizBtns);

    // Add event to all start quiz buttons
    startQuizBtns.forEach(button => {
        button.addEventListener('click', (event) => {
            startQuiz(event.target.value);
        });
    });

    // Add event listener to game over screen button
    document.getElementById('return-btn').addEventListener('click', displayAvailableQuizzes);
}

window.onload = async function () {

    setupEventListeners();

    var quizData = window.localStorage.getItem('activeQuiz');

    // If stored data about quiz exists
    if(quizData){
        currentQuiz = await QuizFactory.createQuizFromStoredData(quizData);
        currentQuiz.start();
    }else{
        displayAvailableQuizzes();
    }

}