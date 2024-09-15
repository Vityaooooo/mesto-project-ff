import '../pages/index.css';
import { openModal, closeModal, addAnimateClassPopup } from './modal.js';
import { createCard, deleteCard, likeCard, hasLikeUser } from './cards.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserDataReq, getInitialCardsReq, patchUserDataReq, postCardReq, deleteCardReq, putLikeToCardReq, deleteLikeFromCardReq, patchNewProfilePhoto, checkLinkReq } from './api.js';

// DOM узлы
// Контейнер размещения карточек
const placeItems = document.querySelector('.places__list');
// Модалки
const popupArr = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const popupEditPhoto = document.querySelector('.popup_type_update_photo-profile');
const popupDeleteCard = document.querySelector('.popup_type_delete-card');
// Элементы модульного окна с изображением
const imgPopup = popupImage.querySelector('.popup__image');
const titlePopup = popupImage.querySelector('.popup__caption');
// Массив кнопок закрытия модалок
const popupCloseButtons = document.querySelectorAll('.popup__close');
// Кнопки открытия модалок
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// Элементы профиля 
const nameProfile = document.querySelector('.profile__title');
const jobProfile = document.querySelector('.profile__description');
const photoProfile = document.querySelector('.profile__image');
// Форма обновления фото пользователя
const formEditPhotoProfile = document.forms['new-avatar'];
const newPhotoProfileInput = formEditPhotoProfile.elements.link;
// Форма редактирования профиля и ее элементы
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
// Форма добавления карточек и ее элементы
const formAddCard = document.forms['new-place'];
const namePlaceInput = formAddCard.elements['place-name'];
const imgPlaceInput = formAddCard.elements.link;
// Форма удаления карточки
const formDeleteCard = document.forms['delete-card'];

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
};

const cardFunctions = {
	handleDeleteCard,
	handleLikeCard,
	addImgToPopup
};

// Функция уведомления пользователя о загрузке 
function renderLoadingButtonSave(button, isLoading) {	
	button.textContent = isLoading ? 'Сохранение ...' : 'Сохранить'
};

// Функция уведомления пользователя о загрузке 
function renderLoadingButtonDelete(button, isLoading) {	
	button.textContent = isLoading ? 'Удаление ...' : 'Да'
};

// Функция открытия модального окна для удаления карточки
function handleDeleteCard(evt) {
	const cardId = evt.target.closest('.card').dataset.cardId;
	popupDeleteCard.dataset.cardId = cardId;

	openModal(popupDeleteCard);
};

// Функция обновления лайков
function handleLikeCard(cardData, userId, cardLikeCounter, cardLikeButton) {
	if (!hasLikeUser(cardData.likes, userId)) {
		addLikeToCard(cardData, cardLikeCounter, cardLikeButton);
	} else {
		deleteLikeFromCard(cardData, cardLikeCounter, cardLikeButton);
	}
};

// Функция добавления лайка на карточку
function addLikeToCard(cardData, cardLikeCounter, cardLikeButton) {
	putLikeToCardReq(cardData['_id'])
	.then( (response) => {
		cardData.likes = response.likes;
		cardLikeCounter.textContent = response.likes.length;
		likeCard(cardLikeButton);
	})
	.catch( (err) => {
		console.log(err);
	})
};

// Функция удаления лайка с карточку
function deleteLikeFromCard(cardData, cardLikeCounter, cardLikeButton) {
	deleteLikeFromCardReq(cardData['_id'])
	.then( (response) => {
		cardData.likes = response.likes;
		cardLikeCounter.textContent = response.likes.length;
		likeCard(cardLikeButton);
	})
	.catch( (err) => {
		console.log(err);
	})
};

// Функция обновления фото пользователя 
function handleSubmitEditPhotoProfile(evt) {
	evt.preventDefault();

	const button = evt.target.querySelector('.button');
	const avatarLink = newPhotoProfileInput.value;

	renderLoadingButtonSave(button, true);

	checkLinkReq(avatarLink)
	.then( (response) => {
		// Why is localhost
		// URL.createObjectURL(response);
		patchNewProfilePhoto(avatarLink)
		.then( (response) => {
			photoProfile.style.backgroundImage = `url('${response.avatar}')`;
		})
	})
	.catch( (err) => {
		console.log(err);
	})
	.finally( () => {
		renderLoadingButtonSave(button, false);
		closeModal(popupEditPhoto);
	});
}

// Функция добавления новой карточки
function handleSubmitAddCard(evt) {
	evt.preventDefault();

	const namePlace = namePlaceInput.value;
	const imgPlace = imgPlaceInput.value;
	const button = evt.target.querySelector('.button');

	renderLoadingButtonSave(button, true);

	checkLinkReq(imgPlace)
	.then( (response) => {
		postCardReq(namePlace, imgPlace)
		.then( (response) => {
			const userId = response.owner['_id'];

			placeItems.prepend(createCard(response, cardFunctions, userId));
		})
	})
	.catch( (err) => {
		console.log(err);
	})
	.finally( () => {
		renderLoadingButtonSave(button, false);
		closeModal(popupAddCard);
	});	
}

// Функция редактирования профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;
	const button = evt.target.querySelector('.button');

	renderLoadingButtonSave(button, true);

	patchUserDataReq(name, job)
	.then( (response) => {
		nameProfile.textContent = response.name;
		jobProfile.textContent = response.about;
	})
	.catch( (err) => {
		console.log(err);
	})
	.finally( () => {
		renderLoadingButtonSave(button, false);
		closeModal(popupEditProfile);
	});
}

// Функция удаления карточки
function handleSubmitDeleteCard(evt) {
	evt.preventDefault();

	const cardId = popupDeleteCard.dataset.cardId;
	const button = evt.target.querySelector('.button');

	renderLoadingButtonDelete(button, true);

	deleteCardReq(cardId)
	.then( (response) => {
		deleteCard(cardId);
	})
	.catch( (err) => {
		console.log(err);
	})
	.finally( () => {
		popupDeleteCard.dataset.cardId = '';
		
		renderLoadingButtonDelete(button, false);
		closeModal(popupDeleteCard);
	});
};

// Функция добавления картинки и текста в попап
function addImgToPopup(evt) {
    const imgCard = evt.target.closest('.card__image');
    const titleCard = evt.target.closest('.card').querySelector('.card__title');

	imgPopup.src = imgCard.src;
	imgPopup.alt = imgCard.alt;
    titlePopup.textContent = titleCard.textContent;

	openModal(popupImage);
};

// Функция добавления карточек на страницу
function insertData() {
Promise.all([getUserDataReq(), getInitialCardsReq()])
.then( ([getUserDataResponse, getInitialCardsResponse]) => {
	const userId = getUserDataResponse['_id'];

	nameProfile.textContent = getUserDataResponse.name;
	jobProfile.textContent = getUserDataResponse.about;
	photoProfile.style.backgroundImage = `url('${getUserDataResponse.avatar}')`;

	getInitialCardsResponse.forEach( (cardData) => {
		placeItems.append(createCard(cardData, cardFunctions, userId))
	});
})
.catch( (err) => {
	console.log(err);
})
};

// Выводим карточки и информацию о пользователе на страницу
insertData();

// Добавляем на попапы необходимый класс для плавной анимации
addAnimateClassPopup(popupArr);

// Навешивание события скрытия попапов на все кнопки закрытия
popupCloseButtons.forEach( (button, index) => {
	button.addEventListener('click', () => {
		closeModal(popupArr[index]);
	});
});

// Навешивание событий на открытие и закрытие попапа, обновляющее фото пользователя
photoProfile.addEventListener('click', () => {
	newPhotoProfileInput.value = '';
	
	openModal(popupEditPhoto);
});

// Навешивание событий на открытие и закрытие попапа, редактирующего профиль
buttonEditProfile.addEventListener('click', () => {
	nameInput.value = nameProfile.textContent;
	jobInput.value = jobProfile.textContent;

	clearValidation(popupEditProfile, validationConfig);

	openModal(popupEditProfile);
});

// Навешивание событий на открытие и закрытие попапа, добавляющий карточки
buttonAddCard.addEventListener('click', () => {
	formAddCard.reset();

	clearValidation(popupAddCard, validationConfig);
	
	openModal(popupAddCard);
});

// Навешивание события на обновление фото профиля
formEditPhotoProfile.addEventListener('submit', handleSubmitEditPhotoProfile);
// Навешивание события на редактирование профиля
formEditProfile.addEventListener('submit', handleSubmitEditProfile);
// Навешивание события на добавление карточки
formAddCard.addEventListener('submit', handleSubmitAddCard);
// Навешиванем событие на удаление карточки
formDeleteCard.addEventListener('submit', handleSubmitDeleteCard);

// включение валидации вызовом enableValidation
enableValidation(validationConfig);