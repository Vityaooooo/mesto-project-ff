// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeItems = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, deleteCardFunc) {
	const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
		
	cardElement.querySelector('.card__image').src = cardData.link;
	cardElement.querySelector('.card__title').textContent = cardData.name;
	cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCardFunc);

	return cardElement;
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