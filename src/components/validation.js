// Функция добавления валидации на каждую форму
function enableValidation( { formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } ) {
    const formList = Array.from(document.querySelectorAll(`${formSelector}`));
    formList.forEach( (formElement) => {
        setEventListeners( {formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } );
    });
};

// Функция добавления валидации на каждый инпут
function setEventListeners( {formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass } ) {
    const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));

    toggleButtonState( {formElement, inputList, submitButtonSelector, inactiveButtonClass} );

    inputList.forEach( (inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid( {formElement, inputElement, inputErrorClass, errorClass } );
            toggleButtonState( {formElement, inputList, submitButtonSelector, inactiveButtonClass} );
        });
    });
};

// Функция проверки валидности инпута
function isValid( {formElement, inputElement, inputErrorClass, errorClass } ) {
    isValidPatternMismatch(inputElement);
    
    if (!inputElement.validity.valid) {
        showInputError( {formElement, inputElement, inputErrorClass, errorClass } );
    } else {
        hideInputError( {formElement, inputElement, inputErrorClass, errorClass } );
    }
}

// Функция проверки валидности инпута в соответствии с регуляркой
function isValidPatternMismatch(inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity('');
    }
};

// Функция отображения ошибки инпута
function showInputError( {formElement, inputElement, inputErrorClass, errorClass } ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}__error`);

    inputElement.classList.add(inputErrorClass);
    
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
};

// Функция скрытия ошибки интпута
function hideInputError( {formElement, inputElement, inputErrorClass, errorClass } ) {
    const errorElement = formElement.querySelector(`.${inputElement.id}__error`);

    inputElement.classList.remove(inputErrorClass);
    
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
};

// Функция переключения отображения кнопки submit 
function toggleButtonState( {formElement, inputList, submitButtonSelector, inactiveButtonClass} ) {
    const submitButton = formElement.querySelector(submitButtonSelector);
    
    if (hasValidInput(inputList)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.setAttribute('disabled', true);
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled', false);
    }
};

// Функции проверки наличия невалидных инпутов в форме
function hasValidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
  })
};

// Функция очистки формы от ошибок валидации
function clearValidation(formElement, { inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass }) {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));

    toggleButtonState( {formElement, inputList, submitButtonSelector, inactiveButtonClass} );

    inputList.forEach( (inputElement) => {
        hideInputError( {formElement, inputElement, inputErrorClass, errorClass } );
    })
};

export { enableValidation, clearValidation };
