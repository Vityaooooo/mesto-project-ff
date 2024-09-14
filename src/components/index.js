import '../pages/index.css';
import { openModal, closeModal, addAnimateClassPopup } from './modal.js';
import { createCard, deleteCard, likeCard } from './cards.js';
// import { initialCards } from './initialCards.js';
import { enableValidation, clearValidation } from './validation.js';
import { getUserDataReq, getInitialCardsReq, patchUserDataReq, postCardReq, deleteCardReq, putLikeToCardReq, deleteLikeFromCardReq, patchNewProfilePhoto, checkLinkReq } from './api.js';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

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
	deleteCard, 
	likeCard, 
	addImgToPopup
};

const cardReq = {
	deleteCardReq, 
	putLikeToCardReq, 
	deleteLikeFromCardReq
};

export { cardTemplate };

// Функция уведомления пользователя о загрузке 
function renderLoadingButtonSave(button, isLoading) {	
	if (isLoading) {
		button.textContent = 'Сохранение ...';
	} else {
		button.textContent = 'Сохранить';
	}
};

// Функция уведомления пользователя о загрузке 
function renderLoadingButtonDelete(button, isLoading) {	
	if (isLoading) {
		button.textContent = 'Удаление ...';
	} else {
		button.textContent = 'Да';
	}
};

// Функция открытия модального окна для удаления карточки
function handleDeleteCard(evt) {
	const cardId = evt.target.closest('.card').dataset.cardId;
	popupDeleteCard.dataset.cardId = cardId;

	openModal(popupDeleteCard);
};

// Функция обновления фото пользователя 
function handleSubmitEditPhotoProfile(evt) {
	evt.preventDefault();

	const button = evt.target.querySelector('.button');
	const avatarLink = newPhotoProfileInput.value;

	renderLoadingButtonSave(button, true);

	checkLinkReq(avatarLink)
	.then( (response) => {
		// Почему локал хост
		console.log(URL.createObjectURL(response))
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
			const cardData = JSON.parse(JSON.stringify(response));
			const userId = response.owner['_id'];

			placeItems.prepend(createCard(cardData, cardFunctions, cardReq, userId, handleDeleteCard));
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
		jobProfile.textContent = response.job;
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
	// @todo: лоудер загрузки
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

// Функция вывода карточек на страницу
// function addCards(arrCards) {
// 	arrCards.forEach(card => {
// 		placeItems.append(createCard(card, cardFunctions, cardReq, userId, handleDeleteCard));
// 	});
// };

// Функция добавления картинки и текста в попап
function addImgToPopup(evt) {
    const imgCard = evt.target.closest('.card__image');
    const titleCard = evt.target.closest('.card').querySelector('.card__title');

	imgPopup.src = imgCard.src;
	imgPopup.alt = imgCard.alt;
    titlePopup.textContent = titleCard.textContent;

	openModal(popupImage);
};

// Функция вывода на страницу информацию о пользователе
function insertUserData() {
	getUserDataReq()
	.then( (userData) => {
		nameProfile.textContent = userData.name;
		jobProfile.textContent = userData.about;
		photoProfile.style.backgroundImage = `url('${userData.avatar}')`;
	})
	.catch( (err) => {
		console.log(err);
	})
};

// Функция добавления карточек на страницу
function insertCards() {
Promise.all([getUserDataReq(), getInitialCardsReq()])
.then( ([getUserDataResponse, getInitialCardsResponse]) => {
	const userId = getUserDataResponse['_id'];

	getInitialCardsResponse.forEach( (cardData) => {
		// placeItems.prepend(createCard(cardData, cardFunctions, cardReq, userId, handleDeleteCard))
		placeItems.append(createCard(cardData, cardFunctions, cardReq, userId, handleDeleteCard))
	});
})
.catch( (err) => {
	console.log(err);
})
};

// Выводим на страницу информацию о пользователе
insertUserData();

// Выводим карточки на страницу
insertCards();

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
	namePlaceInput.value = '';
	imgPlaceInput.value = '';

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

// Выводим все имеющиеся карточки
// addCards(initialCards);

// включение валидации вызовом enableValidation
enableValidation(validationConfig);