import '../pages/index.css';
import { openModal, closeModal, addAnimateClassPopup } from './modal';
import { createCard, addCards, deleteCard, likeCard, addImgToPopup } from './cards';

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
// Массив кнопок закрытия модалок
const popupCloseButtons = document.querySelectorAll('.popup__close');
// Кнопки открытия модалок
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonAddCard = document.querySelector('.profile__add-button');
// Форма редактирования профиля и ее элементы
const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;
// Форма добавления карточек и ее элементы
const formAddCard = document.forms['new-place'];
const namePlaceInput = formAddCard.elements['place-name'];
const imgPlaceInput = formAddCard.elements.link;

export { cardTemplate, placeItems, popupImage };

// Функция добавления новой карточки
function handleSubmitAddCard(evt) {
	evt.preventDefault();

	const cardData = {
		name: namePlaceInput.value,
		link: imgPlaceInput.value
	}

	placeItems.prepend(createCard(cardData, deleteCard, likeCard, addImgToPopup));

	closeModal();	
}

// Функция редактирования профиля
function handleSubmitEditProfile(evt) {
    evt.preventDefault();

	const name = nameInput.value;
	const job = jobInput.value;

	const nameProfile = document.querySelector('.profile__title');
	const jobProfile = document.querySelector('.profile__description');

    nameProfile.textContent = name;
	jobProfile.textContent = job;

	closeModal();
}

// Добавляем на попапы необходимый класс для плавной анимации
addAnimateClassPopup(popupArr);

// Навешивание события скрытия попапов на все кнопки закрытия
popupCloseButtons.forEach( (button) => {
	button.addEventListener('click', closeModal);
});

// Навешивание событий на открытие и закрытие попапа, редактирующего профиль
buttonEditProfile.addEventListener('click', () => {
	nameInput.value = document.querySelector('.profile__title').textContent;
	jobInput.value = document.querySelector('.profile__description').textContent;

	openModal(popupEditProfile);
});

// Навешивание событий на открытие и закрытие попапа, добавляющий карточки
buttonAddCard.addEventListener('click', () => {
	namePlaceInput.value = '';
	imgPlaceInput.value = '';
	
	openModal(popupAddCard);
});

// Реализация лайка и открытия попапа через всплытие
/* placeItems.addEventListener('click', function(evt) {
	if (evt.target.classList.contains('card__image')) {
		addImgToPopup(evt);
		evt.target.onload = openModal(popupImage);
	}

	if (evt.target.classList.contains('card__like-button')) {
		likeCard(evt);
	} 
}); */

// Навешивание события на редактирование профиля
formEditProfile.addEventListener('submit', handleSubmitEditProfile);
// Навешивание события на добавление карточки
formAddCard.addEventListener('submit', handleSubmitAddCard);

// Выводим все имеющиеся карточки
addCards();