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

function displayFact(fact, callback) {

    // Remove any popups
    document.getElementById('pop-up').innerHTML = '';

    // Create card container
    var cardDiv = document.createElement('div');
    cardDiv.className = 'card border-primary mb-3';
    cardDiv.id = 'fact';

    // Create the card body element
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body text-center';

    // Create card tile element
    var cardTitle = document.createElement('h4');
    cardTitle.className = 'card-title text-center';
    cardTitle.innerHTML = 'Fact';

    // Create card text element
    var cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = fact;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-primary col-lg-4 col-sm-12 mb-3';
    btn.innerHTML = 'Next Question';

    btn.addEventListener('click', callback);

    // Create card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);

    // Create card
    cardDiv.appendChild(cardBody);
    cardDiv.appendChild(btn);

    document.getElementById('pop-up').appendChild(cardDiv)

}