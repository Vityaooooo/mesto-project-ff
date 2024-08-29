import '../pages/index.css';
import { createCard, addCards, deleteCard, likeCard, addImgToPopup } from './cards';
import { openModal, closeModal } from './modal';

// Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placeItems = document.querySelector('.places__list');

const popupArr = document.querySelectorAll('.popup');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const popupCloseButtons = document.querySelectorAll('.popup__close');

const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

const formEditProfile = document.forms['edit-profile'];
const nameInput = formEditProfile.elements.name;
const jobInput = formEditProfile.elements.description;

const formAddCard = document.forms['new-place'];
const namePlace = formAddCard.elements['place-name'];
const imgPlace = formAddCard.elements.link;

export { cardTemplate, placeItems, popupArr, popupImage };

// Функция добавления новой карточки
function handleSubmitAddCard(evt) {
    evt.preventDefault();

	const cardData = {
		name: namePlace.value,
		link: imgPlace.value
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

// Навешивание события скрытия попапов на все кнопки закрытия
popupCloseButtons.forEach( (button) => {
	button.addEventListener('click', closeModal);
});

// Навешивание событий на открытие и закрытие попапа, редактирующего профиль
editProfileButton.addEventListener('click', () => {
	openModal(popupEditProfile);
});

// Навешивание событий на открытие и закрытие попапа, добавляющий карточки
addCardButton.addEventListener('click', () => {
	openModal(popupAddCard);
});

// Реализация лайка и открытия попапа через всплытие
/* placeItems.addEventListener('click', function(evt) {
	if (evt.target.classList.contains('card__image')) {
		addImgToPopup(evt);
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