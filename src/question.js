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
    
        this.possibleAnswers.forEach(x => {

            var answerEl = createAnswerElement(x);
    
            answerEl.addEventListener('click', () => {
                this.checkAnswer(x);
            });
    
            answersContainer.appendChild(answerEl);
        });
    }
}