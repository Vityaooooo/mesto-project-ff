import '../pages/index.css'; // импорт главного файла стилей
import { initialCards } from './cards'; // импорт массива карточек 

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeItems = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCardFunc) {
	const card = cardTemplate.querySelector('.card').cloneNode(true);
		
	const cardImg = card.querySelector('.card__image');
	cardImg.src = cardData.link;
	cardImg.alt = cardData.name;
	
	card.querySelector('.card__title').textContent = cardData.name;
	card.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);

	return card;
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const card = evt.target.closest('.card');
  card.remove();
};

// @todo: Вывести карточки на страницу
function addCards() {
	initialCards.forEach(element => {
		placeItems.append(createCard(element, deleteCard));
	});
};

addCards();