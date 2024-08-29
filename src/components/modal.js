const openModalArr = [];

// Функция открытия попапа
function openModal(popup) {
    openModalArr.push(popup);

    document.addEventListener('keydown', closeModalEscape);
    popup.addEventListener('click', closeModalOverlay);

	popup.classList.toggle('popup_is-opened');
};

// Функция закрытия попапа при нажатии на крестик или событии submit
function closeModal() {
    removeModalEvtLis();
    togglePopupClass();
};

// Функция закрытия попапа при нажатии Esc
function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
        removeModalEvtLis();
        togglePopupClass();
    }
};

// Функция закрытия попапа при нажатии на overlay
function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        removeModalEvtLis();
        togglePopupClass();
    }
};

// Функция удаления слушателей событий при закрытии попапа
function removeModalEvtLis() {
    document.removeEventListener('keydown', closeModalEscape);
    openModalArr[0].removeEventListener('click', closeModalOverlay);
};

// Функция переключения класса попапа для закрытия
function togglePopupClass() {
    openModalArr[0].classList.toggle('popup_is-opened');
    openModalArr.pop();
};

// Функция добавления класса для анимации попапов
function addAnimateClassPopup(popups) {
    popups.forEach(( popup ) => {
        popup.classList.add('popup_is-animated');
    });
};

export { openModal, closeModal, addAnimateClassPopup };