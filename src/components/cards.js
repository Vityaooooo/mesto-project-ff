import { cardTemplate } from "./index.js";

// Функция создания карточки
function createCard(cardData, deleteCardFunc, likeCard, addImgToPopup) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
		
	const cardImg = card.querySelector('.card__image');
    cardImg.addEventListener('click', addImgToPopup);
	cardImg.src = cardData.link;
	cardImg.alt = cardData.name;
	
	card.querySelector('.card__title').textContent = cardData.name;
	card.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);
    card.querySelector('.card__like-button').addEventListener('click', likeCard);

	return card;
};

// Функция удаления карточки
function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
};

// Функция добавления лайка на карточку
function likeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}; 

export { createCard, deleteCard, likeCard };