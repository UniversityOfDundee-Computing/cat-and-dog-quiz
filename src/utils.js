// https://alvarotrigo.com/blog/wait-1-second-javascript/
function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}

function findIdByName(list, name) {

    console.log(name);
    var result = list.find(item => item.name === name);
    return result.id;
}

function dispatchAnswerCheckResultEvent(animaType, points) {

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
function createAnswerElement(answer) {

    // Create button element
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary col-lg-4 col-sm-12';

    btn.innerHTML = answer;
    btn.id = answer;

    return btn;
}


// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
// Fisher-Yates (aka Knuth) Shuffle.
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function deleteElementById(id){

    var element = document.getElementById(id);

    if(element)
        element.remove()
    
}

function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}