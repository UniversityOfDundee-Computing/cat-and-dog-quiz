class Question{
    constructor(question, answer, animalType){
        this.question = question;
        this.answer = answer;
        this.animalType = animalType;
    }

    displayQuestion(imgUrl){
        var questionImg = document.getElementById('question-img');
        questionImg.src = imgUrl;
        
        var questionText = document.getElementById('question-text');
        questionText.innerHTML = this.question;
    
        this.displayPossibleAnswers();
    }

    displayPossibleAnswers(){}

    checkAnswer(answer){

        var result = answer == this.answer ? 1 : 0;
        dispatchAnswerCheckResultEvent(this.animalType, result)
    }
}

class MultipleChoiceQuestion extends Question{

    constructor(question, answer, possibleAnswers, animalType){
        super(question, answer, animalType);
        this.possibleAnswers = possibleAnswers;
    }

    displayPossibleAnswers(){
        var answersContainer = document.getElementById('question-answers');
        answersContainer.innerHTML = "";
    
        this.possibleAnswers.forEach(ans => {

            var answerEl = createAnswerElement(ans);
    
            answerEl.addEventListener('click', () => {
                this.checkAnswer(ans);
                this.updateAnswerElement(answerEl, ans);
            });
    
            answersContainer.appendChild(answerEl);
        });
    }

    updateAnswerElement(answerEl, selectedAnswer){

       // Check if the selected answer is correct
       var isCorrect = selectedAnswer === this.answer;

       // Update element
       answerEl.style.color = isCorrect ? 'green' : 'red';

    }
}