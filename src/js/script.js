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

function startSingleAnimalBreedsQuiz(animal) {

    getBreeds(animal)
        .then(data => {

            // Create quiz name
            const quizTitle = capitalizeFirstLetter(animal) + ' Quiz';

            // Determine theme based on animal type
            const theme = animal == 'cat' ? 'theme-purple' : 'theme-blue'; 

            // Create questions
            const questions = QuestionFactory.createMultipleChoiceBreedQuestions(data, 10, animal);

            currentQuiz = new BreedsQuiz(quizTitle, theme, questions, animal);

            currentQuiz.start();

        })
        .then(() => {

        })
        .catch(err => {
            console.log(err);
        })
}

function startCatDogQuiz() {
    var catBreeds;

    getBreeds('cat')
        .then(data => {
            catBreeds = data;
            return getBreeds('dog');
        })
        .then(data => {

            // Create quiz name
            const quizTitle = 'Cat-Dog Quiz';

            // Determine theme based on animal type
            const theme = 'theme-pink'; 

            // Create questions
            const questions = QuestionFactory.createCatDogMultipleChoiceBreedQuestions(catBreeds, data, 10);

            currentQuiz = new CatDogQuiz(quizTitle, theme, questions);

            currentQuiz.start();

        })
        .then(() => {

            document.addEventListener('answerCheckResult', (data) => {
                currentQuiz.handleAnswerResult(data.detail);
            });

        })
        .catch(err => {
            console.log(err);
        })
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