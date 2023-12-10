class Quiz {
    constructor() {
        this.questions = [];
    }

    createQuestions(amount){}

    start() {
        if (this.questions.length > 0)
            this.nextQuestion();
        else
            console.log('No Questions Present');
    }

    nextQuestion(){}

    gameOver(){}

}

class BreedsQuiz extends Quiz {

    constructor(breeds, animalType) {
        super();
        this.animalType = animalType;
        this.breeds = breeds;
        this.questions = [];
    }

    createQuestions(amount) {

        for (let i = 0; i < amount; i++) {

            var randomBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
            var possibleAnswers = getMultipleUniqueBreeds(this.breeds, 4, randomBreed.name);

            let newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, this.animalType);
            this.questions.push(newQuestion);
        }
    }

    nextQuestion() {

        // Remove any popups
        document.getElementById('pop-up').innerHTML = '';

        // Determine next action
        if (this.questions.length > 0) {

            var question = this.questions.pop();
            var animalID = findIdByName(this.breeds, question.answer);

            getAnimal(animalID, this.animalType)
                .then(data => {
                    question.displayQuestion(data[0].url);
                })

        } else {
            gameOver();
        }

    }

}