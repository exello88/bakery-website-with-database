function drawingCatalogBlock(response) {
    let catalog = document.querySelector('.catalog__areaCard');
    catalog.innerHTML = '';
    Object.keys(response).forEach(cardID => {
        if (response[cardID] !== null) {
            catalog.innerHTML += `
                <div class="areaCard__card catalogCard${cardID}">
                <div class="card__content">
                    <img src="" alt="cardImage" class="card__Img  catalogCardIMG${cardID}">
                    <p class="card__title  catalogCardTitle${cardID}"></p>
                    <p class="card__price  catalogCardPrice${cardID}"></p>
                </div>
            </div>`
            let catalogCardIMG = document.querySelector('.catalogCardIMG' + cardID);
            let catalogCardTitle = document.querySelector('.catalogCardTitle' + cardID);
            let catalogCardPrice = document.querySelector('.catalogCardPrice' + cardID);

            const bytes = response[cardID].img.split(' ').map(Number);
            const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpg' }); // Возможно, вам нужно изменить тип контента в зависимости от исходного изображения
            const imageUrl = URL.createObjectURL(blob);
            catalogCardIMG.src = imageUrl;
            catalogCardTitle.textContent = response[cardID].text;
            catalogCardPrice.textContent = response[cardID].price;
        }
    });
}

fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG.json')
    .then(response => response.json())
    .then(catalogCards => {
        drawingCatalogBlock(catalogCards);
    });

import { drawingReviewBlock } from './reviewScriptForMainPage.js';
fetch('https://testproject-11c31-default-rtdb.firebaseio.com/REVIEW.json')
    .then(response => response.json())
    .then(catalogCards => {
        drawingReviewBlock(catalogCards);
    });

import { sendOrder } from './orderScript.js';
const emailInput = document.querySelector('.emailInputAndTitle__emailInput');
const nameInput = document.querySelector('.emailInputAndTitle__nameInput');
const adressInput = document.querySelector('.emailInputAndTitle__addressInput');
const messageInput = document.querySelector('.emailInputAndTitle__messageInput');
const makeOrder = document.querySelector('.makeOrder__btn');
makeOrder.addEventListener('click', () => {
    if ((emailInput.value != '') && (nameInput.value != '') && (adressInput.value != '') && (messageInput.value != ''))
        sendOrder(emailInput.value, nameInput.value, adressInput.value, messageInput.value);
    else alert("Error.You can't leave empty lines")
});

let arrayForNumID = [];
import {drawingBlockOnMaingPage} from './bestChoiveScript.js';
fetch('https://testproject-11c31-default-rtdb.firebaseio.com/BESTCHOICE.json')
    .then(response => response.json())
    .then(CardsNum => {
        Object.keys(CardsNum).forEach(cardID => {
            if (CardsNum[cardID] != null)
                arrayForNumID.push(CardsNum[cardID]);
        });
        drawingBlockOnMaingPage(arrayForNumID);
    });

