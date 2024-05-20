let lastCardID = 0;
export function drawingReviewBlock(response) {
    let review = document.querySelector('.peopleReview__areaCardReview');
    review.innerHTML = '';
    Object.keys(response).forEach(cardID => {
        if (response[cardID] !== null) {
            review.innerHTML += `
            <div class="areaCardReview__card rewiewCard${cardID}">
            <img src="./img/imgCake4.jpg" alt="imgCake" class="cardReview__Img rewiewCardImg${cardID}">
            <p class="cardReview__name rewiewCardName${cardID}">Olga Ivanova</p>
            <p class="cardReview__mainText rewiewCardText${cardID}">Proin sed libero enim sed faucibus turpis. At imperdiet dui
                accumsan
                sit amet nulla facilisi morbi tempus. Ut sem nulla pharetra diam sit amet nisl. </p>
            <p class="cardReview__date rewiewCardDate${cardID}">MONDAY, MAY 2022</p>
        </div>`
            let reviewCardName = document.querySelector('.rewiewCardName' + cardID);
            let reviewCardIMG = document.querySelector('.rewiewCardImg' + cardID);
            let reviewCardText = document.querySelector('.rewiewCardText' + cardID);
            let reviewCardDate = document.querySelector('.rewiewCardDate' + cardID);

            const bytes = response[cardID].img.split(' ').map(Number);
            const blob = new Blob([new Uint8Array(bytes)], { type: 'image/jpg' }); // Возможно, вам нужно изменить тип контента в зависимости от исходного изображения
            const imageUrl = URL.createObjectURL(blob);
            reviewCardIMG.src = imageUrl;
            reviewCardName.textContent = response[cardID].name;
            reviewCardText.textContent = response[cardID].text;
            reviewCardDate.textContent = response[cardID].date;
            lastCardID = cardID;
        }
    });
}

let peopleReviewText = document.querySelector('.peopleReviewInput__review');
let peopleReviewImg = document.querySelector('.peopleReviewInput__img');
let peopleReviewDate = document.querySelector('.peopleReviewInput__date');
const peopleReviewName = document.querySelector('.peopleReviewInput__name');
const peopleReviewBtn = document.querySelector('.peopleReviewInput__btn');


peopleReviewBtn.addEventListener('click', () => {

    if ((peopleReviewName.value != '') && (peopleReviewText.value != '') && (peopleReviewDate.value != '') && (peopleReviewImg.value != '')) {
        const file = peopleReviewImg.files[0];
        const reader = new FileReader();

        let cardID = (+lastCardID + 1);
        reader.onload = () => {
            const bytes = new Uint8Array(reader.result);
            const bytesStr = bytes.join(' ');
            fetch('https://testproject-11c31-default-rtdb.firebaseio.com/REVIEW/' + cardID + '.json', {
                method: 'PUT',
                body: JSON.stringify({
                    "img": bytesStr,
                    "text": peopleReviewText.value,
                    "date": peopleReviewDate.value,
                    "name": peopleReviewName.value
                })
            })
        };

        reader.readAsArrayBuffer(file);
        let areaCardReview = document.querySelector('.peopleReview__areaCardReview');
        areaCardReview.innerHTML += `
                <div class="areaCardReview__card rewiewCard${cardID}">
                <img src="" alt="imgCake" class="cardReview__Img rewiewCardImg${cardID}">
                <p class="cardReview__name rewiewCardName${cardID}">${peopleReviewName.value}</p>
                <p class="cardReview__mainText rewiewCardText${cardID}">${peopleReviewText.value}</p>
                <p class="cardReview__date rewiewCardDate${cardID}">${peopleReviewDate.value}</p>
            </div>`
        let imageURL = URL.createObjectURL(file);
        let cardIMG = document.querySelector('.rewiewCardImg' + cardID);
        cardIMG.src = imageURL;
        lastCardID =(+lastCardID + 1);
    }
    else alert("Error.You can't leave empty lines")
});

