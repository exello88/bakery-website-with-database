let lastCardID = 0;

export function sendOrder(email, name, adress, message) {
    console.log('okich0');
    fetch('https://testproject-11c31-default-rtdb.firebaseio.com/ORDERS.json')
        .then(response => response.json())
        .then(catalogCards => {
            Object.keys(catalogCards).forEach(cardID => {
                lastCardID = cardID;
            });
            fetch('https://testproject-11c31-default-rtdb.firebaseio.com/ORDERS/' + (+lastCardID + 1) + '.json', {
                method: 'PUT',
                body: JSON.stringify({
                    "email": email,
                    "name": name,
                    "adress": adress,
                    "message": message
                })
            })
            lastCardID = (+lastCardID + 1);
        });
}

function drawingOrderBlock(response) {
    let order = document.querySelector('.orderArea');
    order.innerHTML = '';
    Object.keys(response).forEach(cardID => {
        if (response[cardID] !== null) {
            order.innerHTML += `
                <div class="orderArea__ordeBlock orderCard${cardID}">
                <p class="orderBlock__textBeforeForEmail">Email:</p>
                <p class="orderBlock__textForEmail card__email${cardID}"></p>
                <p class="orderBlock__textBeforeForName">Name:</p>
                <p class="orderBlock__textForName card__name${cardID}"></p>
                <p class="orderBlock__textBeforeForAdress">Adress:</p>
                <p class="orderBlock__textForAdress card__adress${cardID}"></p>
                <p class="orderBlock__textBeforeForMessage">Message:</p>
                <p class="orderBlock__textForMessage card__message${cardID}"></p>
                <div class="order__deleteBTN deleteBTN${cardID}">
                    <p class="deleteBTN__title">Delete</p>
                </div>
            </div>`
            let card__email = document.querySelector(`.card__email${cardID}`);
            let card__name = document.querySelector(`.card__name${cardID}`);
            let card__adress = document.querySelector(`.card__adress${cardID}`);
            let card__message = document.querySelector(`.card__message${cardID}`);

            card__email.textContent = response[cardID].email;
            card__name.textContent = response[cardID].name;
            card__adress.textContent = response[cardID].adress;
            card__message.textContent = response[cardID].message;
            lastCardID = cardID;
        }
    });
}

export function startDrawingAndWorkOrder() {
    fetch('https://testproject-11c31-default-rtdb.firebaseio.com/ORDERS.json')
        .then(response => response.json())
        .then(catalogCards => {
            drawingOrderBlock(catalogCards);
            let deleteBtn = document.querySelectorAll(`.order__deleteBTN`);
            deleteBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    const ID = btn.classList[1].replace('deleteBTN', '');
                    console.log(ID);
                    fetch('https://testproject-11c31-default-rtdb.firebaseio.com/ORDERS/' + ID + '.json', {
                        method: 'DELETE'
                    })

                    let elementsToRemove = document.querySelectorAll(`.orderCard${ID}`);
                    elementsToRemove.forEach(function (element) {
                        element.remove();
                    });
                });
            });
        });
}