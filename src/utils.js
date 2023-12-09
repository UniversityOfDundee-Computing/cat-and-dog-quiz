// https://alvarotrigo.com/blog/wait-1-second-javascript/
function delay(milliseconds){
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function findIdByName(list, name) {
    var result = list.find(item => item.name === name);
    return result.id;
}

function dispatchAnswerCheckResultEvent(animaType, points){

    const answerCheckResult = new CustomEvent('answerCheckResult', {
        detail: {
            points: points,
            animalType: animaType
        }
    });

    document.dispatchEvent(answerCheckResult);
}

/**
 * Returns a html element which contains the answer within.
 * 
 * @param {string} answer 
 * @returns element containing the answer
 */
function createAnswerElement(answer){

    // Create button element
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary col-lg-4 col-sm-12';

    btn.innerHTML = answer;
    btn.id = answer;

    return btn;
}

function toggleAnswering(toggle){

    var answersContainer = document.getElementById('question-answers');
    var answers = answersContainer.children;

    if (toggle == 'on')
        answersContainer.removeAttribute('disabled');
    else if (toggle == 'off')
        answersContainer.setAttribute('disabled', true);

}