class Question {

    /**
     * @param {string} question - Question of the question
     * @param {*} answer - Answer to the question
     * @param {*} animalType - Type of animal the question is about
     * @param {*} animalID - Id of the animal the question is a bout
     */
    constructor(question, answer, animalType, animalID) {
        this.question = question;
        this.answer = answer;
        this.animalType = animalType;
        this.animalID = animalID;
    }

    /**
     * Display the question
     * 
     * @param {string} imgUrl - URL to the image 
     */
    displayQuestion(imgUrl) {

        // Display question img
        var questionImg = document.getElementById('question-img');
        questionImg.src = imgUrl;

        var questionText = document.getElementById('question-text');
        questionText.innerHTML = this.question;

        this.displayPossibleAnswers();
    }

    displayPossibleAnswers() { }

    /**
     * Check the answer to the question
     * 
     * @param {string} answer - Answer given to the question 
     */
    checkAnswer(answer) {
        var result = answer === this.answer ? 1 : 0;

        // Dispatch event
        dispatchAnswerCheckResultEvent(this.animalType, result);
    }

    /**
     * Turn answering on/ff
     * 
     * @param {element} answerEl - Element to disable/enable 
     * @param {*} mode - Where to disable/enable
     */
    enableAnswering(answerEl, mode){
        if (mode == 'on')
            answerEl.removeAttribute('disabled');
        else if (mode == 'off')
            answerEl.setAttribute('disabled', true);
    }
}

/**
 * Question with multiple choices to pick from
 */
class MultipleChoiceQuestion extends Question {

    /**
     * @param {string} question - Question of the question
     * @param {*} answer - Answer to the question
     * @param {*} possibleAnswers - Possible answers to the question
     * @param {*} animalType - Type of animal the question is about
     * @param {*} animalID - Id of the animal the question is a bout
     */
    constructor(question, answer, possibleAnswers, animalType, animalID) {
        super(question, answer, animalType, animalID);
        this.possibleAnswers = possibleAnswers;
    }

    /**
     * Display possible answers as elements
     */
    displayPossibleAnswers() {

        // Find element to contain answers
        var answersContainer = document.getElementById('question-answers');
        answersContainer.innerHTML = "";

        // Create answer element for each possible answer
        this.possibleAnswers.forEach(ans => {

            var answerEl = createAnswerElement(ans);

            answerEl.addEventListener('click', () => {

                this.enableAnswering(false);
                this.checkAnswer(ans);
                this.updateAnswerElement(answerEl, ans);

            });

            answersContainer.appendChild(answerEl);
        });
    }

    /**
     * Show whether the answer was correct or not.
     * Display correct answer if it was not correct
     * 
     * @param {*} answerEl 
     * @param {*} selectedAnswer 
     */
    updateAnswerElement(answerEl, selectedAnswer) {

        // Check if the selected answer is correct
        var isCorrect = selectedAnswer === this.answer;

        if (isCorrect)
            answerEl.classList.add('correct-answer');
        else{
            // Show the answer was wrong
            answerEl.classList.add('wrong-answer');

            // Show correct answer
            document.getElementById(this.answer).classList.add('correct-answer');
        }
    }

    /**
     * Disable multiple choice answers
     * 
     * @param {*} mode - Whether to disable/enable
     */
    enableAnswering(mode){

        // For each possible answer element
        this.possibleAnswers.forEach(answer => {

            var answerEl = document.getElementById(answer);

            if (mode == true)
                answerEl.removeAttribute('disabled');
            else if (mode == false)
                answerEl.setAttribute('disabled', true);

        });
    }
}