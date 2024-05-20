let arrayForNumID = [];

async function checkValueUniqueness(value) {
    if (arrayForNumID.includes(+value)) {
        return false;
    }

    const response = await fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG.json');
    const catalogData = await response.json();
    if (catalogData[value]) {
        return true;
    } else {
        return false;
    }
}

function drawingBlock() {
    let best = document.querySelector('.bestChoice__areaCard')
    best.innerHTML = '';
    let number = 0;
    arrayForNumID.forEach(num => {
        fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG/' + num + '.json')
            .then(response => response.json())
            .then(elementJSON => {
                best.innerHTML += `<div class="areaCard__card card${num}">
                <div class="card__content">
                <img src="" alt="cardImage" class="card__Img card__img${num}">
                <p class="card__title card__title${num}"></p>
                <p class="card__price card__price${num}"></p>
                </div>
                <div class="areaForChange">
                <input type="number" class="areaForChange__input inputID${num}" placeholder="Enter the ID you want to change">
                <div class="change__btn change__btnID${num} ${number}">
                    <p class="changeBtn__text">Change</p>
                </div>
                </div>
                </div>`
                number += 1;
                let card__img = document.querySelector(`.card__img${num}`);
                let card__title = document.querySelector(`.card__title${num}`);
                let card__price = document.querySelector(`.card__price${num}`);

                const bytes = elementJSON.img.split(' ').map(Number);
                const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpg' }); // Возможно, вам нужно изменить тип контента в зависимости от исходного изображения
                const imageUrl = URL.createObjectURL(blob);
                card__img.src = imageUrl;
                card__title.textContent = elementJSON.text;
                card__price.textContent = elementJSON.price;


                let changeBtn = document.querySelectorAll(`.change__btn`);
                changeBtn.forEach(Btn => {
                    Btn.addEventListener('click', async () => {
                        const ID = Btn.classList[2];
                        const num = Btn.classList[1].replace('change__btnID', '');
                        let input = document.querySelector(`.inputID${num}`);
                        if (input.value != '') {
                            const isValueUnique = await checkValueUniqueness(+input.value);
                            if (isValueUnique) {
                                arrayForNumID[ID] = +input.value;
                                fetch('https://testproject-11c31-default-rtdb.firebaseio.com/BESTCHOICE/' + ID + '.json', {
                                    method: 'PUT',
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify(+input.value)
                                })
                                drawingBlock();
                            }
                            else console.log('Input Error');
                        }
                    });
                });
            });
    });
}


export function drawingBlockOnMaingPage(arrayForNumID) {
    let best = document.querySelector('.bestChoice__areaCard')
    best.innerHTML = '';
    let number = 0;
    arrayForNumID.forEach(num => {
        fetch('https://testproject-11c31-default-rtdb.firebaseio.com/CATALOG/' + num + '.json')
            .then(response => response.json())
            .then(elementJSON => {
                best.innerHTML += `<div class="areaCard__card card${num}">
                <div class="card__content">
                <img src="" alt="cardImage" class="card__Img card__img${num}">
                <p class="card__title card__title${num}"></p>
                <p class="card__price card__price${num}"></p>
                </div>
                </div>`
                number += 1;
                let card__img = document.querySelector(`.card__img${num}`);
                let card__title = document.querySelector(`.card__title${num}`);
                let card__price = document.querySelector(`.card__price${num}`);

                const bytes = elementJSON.img.split(' ').map(Number);
                const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpg' }); // Возможно, вам нужно изменить тип контента в зависимости от исходного изображения
                const imageUrl = URL.createObjectURL(blob);
                card__img.src = imageUrl;
                card__title.textContent = elementJSON.text;
                card__price.textContent = elementJSON.price;
            });
    });
}

export function startDrawingAndWorkBestChoice() {
    fetch('https://testproject-11c31-default-rtdb.firebaseio.com/BESTCHOICE.json')
        .then(response => response.json())
        .then(CardsNum => {
            Object.keys(CardsNum).forEach(cardID => {
                if (CardsNum[cardID] != null)
                    arrayForNumID.push(CardsNum[cardID]);
            });


            drawingBlock();
        });
}
