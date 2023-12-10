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
    cardDiv.className = 'card card-custom';
    cardDiv.id = 'fact';

    var cardHeader = document.createElement('div');
    cardHeader.className = 'card-header text-center';
    cardHeader.innerHTML = 'FACT';

    // Create the card body element
    var cardBody = document.createElement('div');
    cardBody.className = 'card-body';


    // Create card text element
    var cardText = document.createElement('p');
    cardText.className = 'card-text';
    cardText.textContent = fact;

    var buttonDiv = document.createElement('div');
    buttonDiv.className = 'd-flex justify-content-end';

    // Create button element
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'button';
    btn.innerHTML = 'Next';

    btn.addEventListener('click', callback);

    buttonDiv.appendChild(btn);

    // Create card body
    cardBody.appendChild(cardText);
    cardBody.appendChild(buttonDiv)

    // Create card
    cardDiv.append(cardHeader)
    cardDiv.appendChild(cardBody);;

    document.getElementById('pop-up').appendChild(cardDiv)

}