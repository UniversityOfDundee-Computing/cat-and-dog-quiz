class Quiz {
    constructor(name) {
        this.name = name;
        this.questions = [];
    }

    createQuestions(amount) { }

    start() {
        if (this.questions.length > 0) {
            this.displayQuiz();
            this.nextQuestion();
        }
        else
            console.log('No Questions Present');
    }

    displayQuiz() {
        document.getElementById('quiz-header').textContent = this.name;
        document.getElementById('quiz').classList.remove('hidden');

    }

    nextQuestion() { }

    checkAnswer() { }

    quizOver() {
        console.log('game over');
    }

    determineOutcome() { }

}

class BreedsQuiz extends Quiz {
    constructor(name, breeds, animalType) {
        super(name);
        this.animalType = animalType;
        this.breeds = breeds;
        this.questions = [];
        this.points = 0;
    }

    createQuestions(amount) {

        for (let i = 0; i < amount; i++) {

            var randomBreed = this.breeds[Math.floor(Math.random() * this.breeds.length)];
            var possibleAnswers = getMultipleUniqueBreeds(this.breeds, 4, randomBreed.name);

            let newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, this.animalType, randomBreed.id);
            this.questions.push(newQuestion);
        }

        this.questionAmount = this.questions.length;
    }

    nextQuestion() {

        // Remove any popups
        document.getElementById('pop-up').innerHTML = '';

        // Determine next action
        if (this.questions.length > 0) {

            const question = this.questions.pop();
            this.displayQuestion(question);

        } else {
            this.quizOver();
        }

    }

    displayQuestion(question) {
        getAnimalDetails(question.animalID, question.animalType)
            .then(data => {
                question.displayQuestion(data[0].url);
            })
    }

    findIDofBreed(name) {
        // console.log(name);
        var result = list.find(item => item.name === name);
        return result.id;
    }

    async handleAnswerResult(result) {

        this.points += result.points;

        // Delay
        await delay(1000);

        // Show fact
        await getFact(this.animalType)
            .then(fact => displayFact(fact, () => {
                this.nextQuestion();
            }))
            .catch(err => this.nextQuestion());
    }

    quizOver() {

        // Create the paragraph 
        var par = document.createElement('p');
        par.textContent = 'You are a .....';

        var cardTitle = document.createElement('h4');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = this.determineOutcome();

        displayGameOver(cardTitle);

    }

    determineOutcome() {

        const points = this.points;
        const maxScore = this.questionAmount;

        const animalType = capitalizeFirstLetter(this.animalType) + 's';

        if (points === maxScore)
            return 'King of ' + animalType;
        else if (points === 0)
            return 'Sad Person';
        // else if (points > maxScore/2)
        //     return 'Duke of ' + animalType;
        else if (points >= maxScore / 2)
            return 'Knight of ' + animalType;
        else if (points < maxScore / 2)
            return 'Squire of ' + animalType;
        else
            return 'Sad Person';

    }

}

class MultipleAnimalsBreedsQuiz extends BreedsQuiz {
    constructor(name, catBreeds, dogBreeds) {
        super(name);
        this.catBreeds = catBreeds;
        this.dogBreeds = dogBreeds;
        this.questions = [];
        this.catPoints = 0;
        this.dogPoints = 0;
    }

    createQuestions(amount) {

        for (let i = 0; i < amount; i++) {

            var newQuestion;

            if (i % 2 === 0) {
                var randomBreed = this.catBreeds[Math.floor(Math.random() * this.catBreeds.length)];
                var possibleAnswers = getMultipleUniqueBreeds(this.catBreeds, 4, randomBreed.name);

                newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, 'cat', randomBreed.id);
            }
            else {
                var randomBreed = this.dogBreeds[Math.floor(Math.random() * this.dogBreeds.length)];
                var possibleAnswers = getMultipleUniqueBreeds(this.dogBreeds, 4, randomBreed.name);

                newQuestion = new MultipleChoiceQuestion('What is the Breed?', randomBreed.name, possibleAnswers, 'dog', randomBreed.id);
            }

            this.questions.push(newQuestion);
        }

        this.questionAmount = this.questions.length;
    }

    async handleAnswerResult(result) {

        if (result.animalType == 'dog')
            this.dogPoints += result.points;
        else if (result.animalType == 'cat')
            this.catPoints += result.points;

        // Delay
        await delay(1000);

        // Show fact
        await getFact(result.animalType)
            .then(fact => displayFact(fact, () => {
                this.nextQuestion();
            }))
            .catch(err => this.nextQuestion());
    }

    determineOutcome() {

        const catPoints = this.catPoints;
        const dogPoints = this.dogPoints;
        const maxScore = this.questionAmount;

        if (catPoints == 0 && dogPoints == 0)
            return 'Sad Person'
        else if (catPoints == dogPoints)
            return 'Cat-Dog Person';
        else if (catPoints > dogPoints)
            return 'Cat Person';
        else if (dogPoints > catPoints)
            return 'Dog Person';
        else
            return '???????';

    }

}