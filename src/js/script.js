var currentQuiz;

function displayAvailableQuizzes() {

    window.localStorage.removeItem('activeQuiz');

    document.getElementById('quizzes').classList.remove('hidden');

    document.getElementById('quiz').classList.add('hidden');
    document.getElementById('game-over').classList.add('hidden');

}

function startQuiz(quiz) {

    document.getElementById('quizzes').classList.add('hidden');

    if (currentQuiz != null) {
        document.removeEventListener('answerCheckResult', (data) => {
            currentQuiz.handleAnswerResult(data.detail);
        });
    }

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
            const questions = QuestionFactory.createMultipleChoiceBreedQuestions(data, 2, animal);

            currentQuiz = new BreedsQuiz(quizTitle, theme, questions, animal);

            currentQuiz.start();

        })
        .then(() => {

            document.addEventListener('answerCheckResult', (data) => {
                console.log('helo')
                currentQuiz.handleAnswerResult(data.detail);
            });

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
            const questions = QuestionFactory.createCatDogMultipleChoiceBreedQuestions(catBreeds, data, 2);

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

window.onload = function () {

    hidePopUp();
    displayAvailableQuizzes();
//     currentQuiz = loadQuiz();
//     currentQuiz = null;

//    if(currentQuiz){

//         console.log(currentQuiz);
//         currentQuiz.start();

//         document.addEventListener('answerCheckResult', (data) => {
//             currentQuiz.handleAnswerResult(data.detail.points);
//         });

//    }else{
//         displayAvailableQuizzes();
//    }


    var startQuizBtns = document.getElementsByClassName('start-quiz-btn');

    startQuizBtns = Array.from(startQuizBtns);

    startQuizBtns.forEach(button => {

        button.addEventListener('click', (event) => {
            startQuiz(event.target.value);
        });
    });

    document.getElementById('return-btn').addEventListener('click', displayAvailableQuizzes);

}