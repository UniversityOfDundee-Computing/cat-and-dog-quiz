class Question {
    constructor(question, answer, animalType, animalID) {
        this.question = question;
        this.answer = answer;
        this.animalType = animalType;
        this.animalID = animalID;
    }

    displayQuestion(imgUrl) {
        var questionImg = document.getElementById('question-img');
        questionImg.src = imgUrl;

        var questionText = document.getElementById('question-text');
        questionText.innerHTML = this.question;

        this.displayPossibleAnswers();
    }

    displayPossibleAnswers() { }

    checkAnswer(answer) {
        var result = answer == this.answer ? 1 : 0;
        dispatchAnswerCheckResultEvent(this.animalType, result)
    }

    enableAnswering(answerEl, mode){
        if (mode == 'on')
            answerEl.removeAttribute('disabled');
        else if (mode == 'off')
            answerEl.setAttribute('disabled', true);
    }
}

class MultipleChoiceQuestion extends Question {

    constructor(question, answer, possibleAnswers, animalType, animalID) {
        super(question, answer, animalType, animalID);
        this.possibleAnswers = possibleAnswers;
    }

    displayPossibleAnswers() {
        var answersContainer = document.getElementById('question-answers');
        answersContainer.innerHTML = "";

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

    updateAnswerElement(answerEl, selectedAnswer) {

        // Check if the selected answer is correct
        var isCorrect = selectedAnswer === this.answer;

        if (isCorrect)
            answerEl.classList.add('correct-answer');
        else{
            answerEl.classList.add('wrong-answer');
            document.getElementById(this.answer).classList.add('correct-answer');
        }
    }

    enableAnswering(mode){

        this.possibleAnswers.forEach(answer => {

            var answerEl = document.getElementById(answer);

            if (mode == true)
                answerEl.removeAttribute('disabled');
            else if (mode == false)
                answerEl.setAttribute('disabled', true);

        });
    }
}