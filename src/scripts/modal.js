import { popupArr } from './index.js';

const openModalArr = [];

function openModal(popup) {
    openModalArr.push(popup);

    document.addEventListener('keydown', closeModalEscape);
    popup.addEventListener('click', closeModalOverlay);

	popup.classList.toggle('popup_is-opened');
};

function closeModal() {
    document.removeEventListener('keydown', closeModalEscape);
    openModalArr[0].removeEventListener('click', closeModalOverlay);

    openModalArr[0].classList.remove('popup_is-opened');
    openModalArr.pop();
};

function closeModalEscape(evt) {
    if (evt.key === 'Escape') {
        document.removeEventListener('keydown', closeModalEscape);
        openModalArr[0].removeEventListener('click', closeModalOverlay);

        openModalArr[0].classList.toggle('popup_is-opened');
        openModalArr.pop();
    }
};

function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        document.removeEventListener('keydown', closeModalEscape);
        openModalArr[0].removeEventListener('click', closeModalOverlay);
        
        openModalArr[0].classList.toggle('popup_is-opened');
        openModalArr.pop();
    }
};

function removeModalEvtLis() {
    document.removeEventListener('keydown', closeModal);
    openModalArr[0].removeEventListener('click', closeModal);
}

export { openModal, closeModal };

// @todo: not working
// addAnimatePopup(popupArr);
// function addAnimatePopup(arr) {
//     arr.forEach(( popup ) => {
//         popup.classList.add('popup_is-animated');
//     });
// };

// Добавляем класс на все модалки для плавной анимации
// popupArr.forEach(( popup ) => {
// 	popup.classList.add('popup_is-animated');
// });