import { cardTemplate } from "./index.js";

// Функция создания карточки
function createCard(cardData, cardFunctions, userId) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	
	const cardDeleteButton = card.querySelector('.card__delete-button');
	const cardLikeButton = card.querySelector('.card__like-button');
	const cardLikeCounter = card.querySelector('.card__like-counter');
	const cardImg = card.querySelector('.card__image');

	const cardId = cardData['_id'];
	card.dataset.cardId = cardId;
	
	card.querySelector('.card__title').textContent = cardData.name;
	
    cardImg.addEventListener('click', cardFunctions.addImgToPopup);
	cardImg.src = cardData.link;
	cardImg.alt = cardData.name;
		
	cardLikeCounter.textContent = cardData.likes.length;
		
	if (hasLikeUser(cardData.likes, userId)) {
		likeCard(cardLikeButton);
	}

    cardLikeButton.addEventListener('click', (evt) => {
		cardFunctions.handleLikeCard(cardData, userId, cardLikeCounter, evt.target);
	});
	
	if (checkUserCard(cardData, userId)) {
		cardDeleteButton.addEventListener('click', (evt) => {
			cardFunctions.handleDeleteCard(evt);
		});
	} else {
		cardDeleteButton.remove();
	}

	return card;
};

// Функция проверки наличия пользователя в массиве лайков
function hasLikeUser(likeArr, userId) {
	return likeArr.some( (user) => {
		return user['_id'] === userId;
 	});
};

// Функция проверки принадлежности карточки пользователю
function checkUserCard(cardData, userId) {
	return (userId === cardData.owner['_id']);
};

// Функция удаления карточки
function deleteCard(cardId) {
	const card = document.querySelector(`.card[data-card-id="${cardId}"]`);
    card.remove();
};

// Функция добавления лайка на карточку
function likeCard(cardLikeButton) {
    cardLikeButton.classList.toggle('card__like-button_is-active');
}; 

export { createCard, deleteCard, likeCard, hasLikeUser };