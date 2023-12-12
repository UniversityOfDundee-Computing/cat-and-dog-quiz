async function getFact(animalType) {

    const maxRetries = 15;

    var retries = 0;
    var foundValidFact = false;

    while (!foundValidFact && retries <= maxRetries) {

        const response = await fetch(`https://cat-fact.herokuapp.com/facts/random?animal_type=${animalType}`);
        const data = await response.json();

        if (data.status.verified === true) {
            return data.text;
        }
        else {
            console.log('ATTEMPT ' + retries)
            retries++;
        }
    }

    throw new Error('Failed to get verified fact');

}

function updateFact(fact, callback){

    // Show fact pop up
    document.getElementById('fact').classList.remove('hidden');

    document.getElementById('fact-text').textContent = fact;

    // Remove prev buton due to ahvign an event listiner
    document.getElementById('next-question-btn').remove();

    // Create button to go to next question
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button';
    btn.innerHTML = 'Next';
    btn.id = 'next-question-btn';

    btn.addEventListener('click', callback);
    
    document.getElementById('fact-btns').appendChild(btn);
}
