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
 * @returns div element containing the answer
 */
function createAnswerElement(answer){

    const div = document.createElement('div');
    div.className = 'card border-primary mb-3 col-lg-4 col-sm-12';

    const innerDiv = document.createElement('div');
    innerDiv.className = 'card-body';

    const h4 = document.createElement('h4');
    h4.className = 'card-title text-center mb-0';
    h4.textContent = answer;

    innerDiv.appendChild(h4);
    div.appendChild(innerDiv);

    return div;
}