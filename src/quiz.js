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

    checkAnswer(){}

    gameOver(){

        console.log('game over');

    }

}

class BreedsQuiz extends Quiz {
    constructor(breeds, animalType) {
        super();
        this.animalType = animalType;
        this.breeds = breeds;
        this.questions = [];
        this.points = 0;
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

        console.log(this.questions)

        // Determine next action
        if (this.questions.length > 0) {

            const question = this.questions.pop();
            const animalID = findIdByName(this.breeds, question.answer);

            getAnimal(animalID, this.animalType)
                .then(data => {
                    question.displayQuestion(data[0].url);
                })

        } else {
            this.gameOver();
        }

    }

    async handleAnswerResult(points) {

        this.points += points;
    
        // Delay
        await delay(1000);
    
        // Show fact
        await getFact(this.animalType)
        .then(fact => displayFact(fact, () => {
            this.nextQuestion();
        }))
        .catch(err => this.nextQuestion());
    }

}