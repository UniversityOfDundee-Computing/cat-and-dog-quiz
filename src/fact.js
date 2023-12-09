async function getFact(animalType) {

    const maxRetries = 50;

    var retries = 0;
    var foundValidFact = false;

    while (!foundValidFact && retries <= maxRetries) {

        const response = await fetch(`https://cat-fact.herokuapp.com/facts/random?animal_type=${animalType}`);
        const data = await response.json();

        if (data.status.verified === true) {
            return data.text;
        }
        else {
            retries++;
        }
    }

    throw new Error('Failed to get verified fact');

}

async function displayFactWithDelay(fact, delayTime){

    displayFact(fact);

    await delay(delayTime);

    deleteElementById('fact');
}

function displayFact(fact) {

    // Remove any popups
    document.getElementById('pop-up').innerHTML = '';

    // Create card container
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card border-primary mb-3';
    cardDiv.id = 'fact';

    // Create the card header
    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header text-center';
    cardHeader.textContent = 'Fact';

    // Create the card body element
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body text-center';

    var cardTitle = document.createElement('h4');
    cardTitle.className = 'card-title';
    cardTitle.textContent = fact;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary col-lg-4 col-sm-12 mb-3';
    btn.innerHTML = 'Next Question';

    btn.addEventListener('click', nextQuestion);

    // Create card body
    cardBody.appendChild(cardTitle);

    // Create card
    cardDiv.appendChild(cardHeader);
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(btn);

    document.getElementById('pop-up').appendChild(cardDiv)

}