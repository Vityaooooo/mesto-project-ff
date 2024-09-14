import { cardTemplate } from "./index.js";

// Функция создания карточки
function createCard(cardData, cardFunctions, cardReq, userId, handleDeleteCard) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
	
	const cardId = cardData['_id'];
	card.dataset.cardId = cardId;
	
	const cardImg = card.querySelector('.card__image');
    cardImg.addEventListener('click', cardFunctions.addImgToPopup);
	cardImg.src = cardData.link;
	cardImg.alt = cardData.name;

	card.querySelector('.card__title').textContent = cardData.name;

	const cardDeleteButton = card.querySelector('.card__delete-button');

	const cardLikeButton = card.querySelector('.card__like-button');
	const cardLikeCounter = card.querySelector('.card__like-counter');
	cardLikeCounter.textContent = cardData.likes.length;
	
	if (checkUserCard(cardData, userId)) {
		cardDeleteButton.addEventListener('click', (evt) => {
			handleDeleteCard(evt);
		});
	} else {
		cardDeleteButton.remove();
	}
	
	if (hasLikeUser(cardData.likes, userId)) {
		cardFunctions.likeCard(cardLikeButton);
	}

    cardLikeButton.addEventListener('click', (evt) => {
		handleLikeCard(cardData, userId, cardLikeCounter, cardFunctions.likeCard, cardReq, evt.target);
	});

	return card;
};

// Функция обновления лайков
function handleLikeCard(cardData, userId, cardLikeCounter, likeCardFunc, cardReq, cardLikeButton) {
	if (!hasLikeUser(cardData.likes, userId)) {
		addLikeToCard(cardData, cardLikeCounter, likeCardFunc, cardReq.putLikeToCardReq, cardLikeButton);
	} else {
		deleteLikeFromCard(cardData, cardLikeCounter, likeCardFunc, cardReq.deleteLikeFromCardReq, cardLikeButton);
	}
};

// Функция добавления лайка на карточку
function addLikeToCard(cardData, cardLikeCounter, likeCardFunc, putLikeToCardReq, cardLikeButton) {
	putLikeToCardReq(cardData['_id'])
	.then( (response) => {
		cardData.likes = response.likes;
		cardLikeCounter.textContent = response.likes.length;
		likeCardFunc(cardLikeButton);
	})
	.catch( (err) => {
		console.log(err);
	})
};

// Функция удаления лайка с карточку
function deleteLikeFromCard(cardData, cardLikeCounter, likeCardFunc, deleteLikeFromCardReq, cardLikeButton) {
	deleteLikeFromCardReq(cardData['_id'])
	.then( (response) => {
		cardData.likes = response.likes;
		cardLikeCounter.textContent = response.likes.length;
		likeCardFunc(cardLikeButton);
	})
	.catch( (err) => {
		console.log(err);
	})
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

export { createCard, deleteCard, likeCard };