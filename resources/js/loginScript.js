const Name = document.querySelector('.loginField__inputName');
const Password = document.querySelector('.loginField__inputPassword');
const loginBtn = document.querySelector('.loginField__loginBtn');
const errorField = document.querySelector('.loginField__errorField');
import { startDrawingAndWorkCatalog } from '../js/catalogSctipt.js';
import { startDrawingAndWorkOrder } from './orderScript.js';
import { startDrawingAndWorkBestChoice } from './bestChoiveScript.js'

loginBtn.addEventListener('click', () => {
    if (Name.value === 'Name' && Password.value === '1') {
        let bodyElement = document.querySelector('body');

        while (bodyElement.firstChild) {
            bodyElement.removeChild(bodyElement.firstChild);
        }


        bodyElement.innerHTML = `    
        <div class = "divmainTitle">
        <p class="mainTitle">Admin Field</p>
        </div>
    
        <div class="catalog">
        <p class="catalog__title">Catalog</p>
        <div class="catalog__areaCard">
        </div>
        <div class="newProduct">
        <p class="textForInputNameProduct">Enter product name</p>
        <input type="text" class="InputNameProduct">
        <p class="textForInputPriceProduct">Enter the price of the product</p>
        <input type="text" class="InputPriceProduct">
        <input type="file" class="InputImgProduct" accept="image/*">
        <div class="addCatalogBtn">
            <p class="addCatalogBtn__text">Add</p>
        </div>
    </div>
    </div>
    <p class="orderArea__title">BestChoise</p>
    <div class="best">
        <div class="bestChoice__areaCard">
        </div>
        </div>
    </div>
    <p class="orderArea__title">Review</p>
    <div class="orderArea"></div>`;
        startDrawingAndWorkCatalog();
        startDrawingAndWorkOrder();
        startDrawingAndWorkBestChoice();
    }
    else {
        errorField.textContent = 'Wrong login or password';
    }
});