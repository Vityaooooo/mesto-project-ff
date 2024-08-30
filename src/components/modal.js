// Функция открытия попапа
function openModal(popup) {
    document.addEventListener('keydown', closeModalEscape);
    popup.addEventListener('click', closeModalOverlay);

	popup.classList.add('popup_is-opened');
};

// Функция закрытия попапа при нажатии на крестик или событии submit
function closeModal() {
    removeModalEvtLis();
    removePopupClass();
};

// Функция закрытия попапа при нажатии Esc
function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
        removeModalEvtLis();
        removePopupClass();
    }
};

// Функция закрытия попапа при нажатии на overlay
function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        removeModalEvtLis();
        removePopupClass();
    }
};

// Функция удаления слушателей событий при закрытии попапа
function removeModalEvtLis() {
    document.removeEventListener('keydown', closeModalEscape);
    document.querySelector('.popup_is-opened').removeEventListener('click', closeModalOverlay);
};

// Функция переключения класса попапа для закрытия
function removePopupClass() {
    document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
};

// Функция добавления класса для анимации попапов
function addAnimateClassPopup(arrPopups) {
    arrPopups.forEach(( popup ) => {
        popup.classList.add('popup_is-animated');
    });
};

export { openModal, closeModal, addAnimateClassPopup };