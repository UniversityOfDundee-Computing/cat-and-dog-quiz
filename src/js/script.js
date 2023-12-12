var currentQuiz;


function displayAvailableQuizzes() {

    removeAnswerEventListener();

    // Remove any stored data
    window.localStorage.removeItem('activeQuiz');

    // Show available quiz buttons
    document.getElementById('quizzes').classList.remove('hidden');

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');

}

function startQuiz(quiz) {

    hidePopUp();

    // Hide start quiz buttons
    document.getElementById('quizzes').classList.add('hidden');

    // Remove event listeners for answer result events
    // if (currentQuiz != null) {
    //     removeAnswerEventListener();
    // }

    if (quiz === 'cat' || quiz === 'dog') {
        startSingleAnimalBreedsQuiz(quiz);
    }
    else if (quiz === 'cat-dog') {
        startCatDogQuiz();
    }

}

async function startSingleAnimalBreedsQuiz(animal) {

    currentQuiz = await QuizFactory.createAnimalQuiz(animal, 4);
    currentQuiz.start();
}

async function startCatDogQuiz() {

    currentQuiz = await QuizFactory.createCatDogQuiz(4);
    currentQuiz.start();
}

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

window.onload = function () {

    setupEventListeners();

    // displayAvailableQuizzes();

    currentQuiz = loadQuiz();

    if(currentQuiz){

        console.log(currentQuiz);
        currentQuiz.start();

    }else{
        displayAvailableQuizzes();
    }

}