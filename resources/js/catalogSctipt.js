let lastCardID = 0;

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
                    <div class="card__deleteBTN catalogCardDelete${cardID}">
                        <p class="deleteBTN__title">Delete</p>
                    </div>
                </div>
            </div>`
            let catalogCardIMG = document.querySelector('.catalogCardIMG' + cardID);
            let catalogCardTitle = document.querySelector('.catalogCardTitle' + cardID);
            let catalogCardPrice = document.querySelector('.catalogCardPrice' + cardID);

            const bytes = response[cardID].img.split(' ').map(Number);
            const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpg' }); // Возможно, вам нужно изменить тип контента в зависимости от исходного изображения
            const imageUrl = URL.createObjectURL(blob);
            catalogCardIMG.src = imageUrl;
            catalogCardTitle.textContent = response[cardID].text + ' (ID:' + cardID + ')';
            catalogCardPrice.textContent = response[cardID].price;
            lastCardID = cardID;
        }
    });
}


export function startDrawingAndWorkCatalog() {
    fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG.json')
        .then(response => response.json())
        .then(catalogCards => {
            drawingCatalogBlock(catalogCards);
            const card__deleteBTN = document.querySelectorAll('.card__deleteBTN');

            card__deleteBTN.forEach(btn => {
                btn.addEventListener('click', () => {
                    const ID = btn.classList[1].replace('catalogCardDelete', '');
                    console.log(ID);
                    fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG/' + ID + '.json', {
                        method: 'DELETE'
                    })

                    let elementsToRemove = document.querySelectorAll('.catalogCard' + ID);
                    elementsToRemove.forEach(function (element) {
                        element.remove();
                    });
                });
            });
        });
    const addCatalogBtn = document.querySelector('.addCatalogBtn');
    const InputImgProduct = document.querySelector('.InputImgProduct');
    const InputNameProduct = document.querySelector('.InputNameProduct');
    const InputPriceProduct = document.querySelector('.InputPriceProduct');
    addCatalogBtn.addEventListener('click', () => {
        if ((InputImgProduct.files.length === 0) || (InputPriceProduct.value === '') || (InputNameProduct.value === '')) {
            console.log('Input Error');
        }
        else {
            const file = InputImgProduct.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                const bytes = new Uint8Array(reader.result);
                console.log(`Массив байтов: ${bytes}`);
                const bytesStr = bytes.join(' ');

                const newCardId = (+lastCardID + 1).toString();
                fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG/' + newCardId + '.json', {
                    method: 'PUT',
                    body: JSON.stringify({
                        "img": bytesStr,
                        "text": InputNameProduct.value,
                        "price": InputPriceProduct.value
                    })
                });

                let catalog = document.querySelector('.catalog__areaCard');
                catalog.innerHTML += `
    <div class="areaCard__card catalogCard${newCardId}">
    <div class="card__content">
        <img src="" alt="cardImage" class="card__Img  catalogCardIMG${newCardId}">
        <p class="card__title  catalogCardTitle${newCardId}">${InputNameProduct.value}</p>
        <p class="card__price  catalogCardPrice${newCardId}">${InputPriceProduct.value}</p>
        <div class="card__deleteBTN catalogCardDelete${newCardId}">
            <p class="deleteBTN__title">Delete</p>
        </div>
    </div>
</div>`
                lastCardID = +lastCardID + 1;
                let imageURL = URL.createObjectURL(file);
                let cardIMG = document.querySelector('.catalogCardIMG' + newCardId);
                cardIMG.src = imageURL;
                const card__deleteBTN = document.querySelectorAll('.card__deleteBTN');

                card__deleteBTN.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const ID = btn.classList[1].replace('catalogCardDelete', '');
                        console.log(ID);
                        fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG/' + ID + '.json', {
                            method: 'DELETE'
                        })

                        let elementsToRemove = document.querySelectorAll('.catalogCard' + ID);
                        elementsToRemove.forEach(function (element) {
                            element.remove();
                        });
                    });
                });
            };
            reader.readAsArrayBuffer(file);
        }
    });
}