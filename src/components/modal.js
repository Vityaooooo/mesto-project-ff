// Функция открытия попапа
function openModal(popup) {
    document.addEventListener('keydown', closeModalEscape);
    popup.addEventListener('click', closeModalOverlay);

	popup.classList.add('popup_is-opened');
};

// Функция закрытия попапа при нажатии на крестик или событии submit
function closeModal(popup) {
    document.removeEventListener('keydown', closeModalEscape);

    popup.removeEventListener('click', closeModalOverlay);
    popup.classList.remove('popup_is-opened');
};

// Функция закрытия попапа при нажатии Esc
function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
        document.removeEventListener('keydown', closeModalEscape);

        const openPopup = document.querySelector('.popup_is-opened');
        openPopup.removeEventListener('click', closeModalOverlay);
        openPopup.classList.remove('popup_is-opened');
    }
};

// Функция закрытия попапа при нажатии на overlay
function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        document.removeEventListener('keydown', closeModalEscape);

        const openPopup = document.querySelector('.popup_is-opened');
        openPopup.removeEventListener('click', closeModalOverlay);
        openPopup.classList.remove('popup_is-opened');
    }
};

// Функция добавления класса для анимации попапов
function addAnimateClassPopup(arrPopups) {
    arrPopups.forEach(( popup ) => {
        popup.classList.add('popup_is-animated');
    });
};

export { openModal, closeModal, addAnimateClassPopup };