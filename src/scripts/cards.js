import { placeItems, cardTemplate, popupImage } from "./index.js";
import { openModal } from "./modal.js";

const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

// Функция создания карточки
function createCard(cardData, deleteCardFunc, likeCard, addImgToPopup) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
		
	const cardImg = card.querySelector('.card__image');
	cardImg.src = cardData.link;
	cardImg.alt = cardData.name;
	
	card.querySelector('.card__title').textContent = cardData.name;
	card.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    card.querySelector('.card__like-button').addEventListener('click', likeCard);
    card.querySelector('.card__image').addEventListener('click', addImgToPopup);

	return card;
};

// Функция удаления карточки
function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
};

// Вывести карточки на страницу
function addCards() {
	initialCards.forEach(card => {
		placeItems.append(createCard(card, deleteCard, likeCard, addImgToPopup));
	});
};

// Функция добавления лайка на карточку
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}; 

// Функция добавления картинки в попап
function addImgToPopup(evt) {
    const imgPopup = popupImage.querySelector('.popup__image');
    const imgCard = evt.target.closest('.card__image');

	imgPopup.src = imgCard.src;
	imgPopup.alt = imgCard.alt;

    openModal(popupImage);
}

export { createCard, deleteCard, addCards, likeCard, addImgToPopup };
