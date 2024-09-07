import '../pages/index.css';
import { openModal, closeModal, addAnimateClassPopup } from './modal.js';
import { createCard, deleteCard, likeCard } from './cards.js';
import { initialCards } from './initialCards.js';
import { enableValidation, clearValidation } from './validation.js';

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
// Форма редактирования профиля и ее элементы
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
// Форма добавления карточек и ее элементы
const formAddCard = document.forms['new-place'];
const namePlaceInput = formAddCard.elements['place-name'];
const imgPlaceInput = formAddCard.elements.link;

const validationConfig = {
	formSelector: '.popup__form',
	inputSelector: '.popup__input',
	submitButtonSelector: '.popup__button',
	inactiveButtonClass: 'popup__button_disabled',
	inputErrorClass: 'popup__input_type_error',
	errorClass: 'popup__error_visible'
  };

export { cardTemplate, placeItems, popupImage };

// Функция добавления новой карточки
function handleSubmitAddCard(evt) {
	evt.preventDefault();

	const cardData = {
		name: namePlaceInput.value,
		link: imgPlaceInput.value
	}

	placeItems.prepend(createCard(cardData, deleteCard, likeCard, addImgToPopup));

	closeModal(popupAddCard);	
}

// Функция редактирования профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

    nameProfile.textContent = name;
	jobProfile.textContent = job;

	closeModal(popupEditProfile);
}

// Функция вывода карточек на страницу
function addCards(arrCards) {
	arrCards.forEach(card => {
		placeItems.append(createCard(card, deleteCard, likeCard, addImgToPopup));
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

// Добавляем на попапы необходимый класс для плавной анимации
addAnimateClassPopup(popupArr);

// Навешивание события скрытия попапов на все кнопки закрытия
popupCloseButtons.forEach( (button) => {
	button.addEventListener('click', () => {
		closeModal(button.closest('.popup'));
	});
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

// Навешивание события на редактирование профиля
formEditProfile.addEventListener('submit', handleSubmitEditProfile);
// Навешивание события на добавление карточки
formAddCard.addEventListener('submit', handleSubmitAddCard);

// Выводим все имеющиеся карточки
addCards(initialCards);

// включение валидации вызовом enableValidation
enableValidation(validationConfig);