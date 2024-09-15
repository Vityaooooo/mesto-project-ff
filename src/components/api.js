const config = {
    baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-22',
    headers: {
      authorization: '9dcff6e2-3503-4d18-8c08-8242531f87b7',
      'Content-Type': 'application/json'
    }
};

const imageReg = /image\//;

function handleResponse(response) {
    if (response.ok) {
        return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`); 
};

export const getUserDataReq = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then( handleResponse )
};

export const getInitialCardsReq = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then( handleResponse )
};

export const patchUserDataReq = (newName, newAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })
    .then( handleResponse )
};

export const checkLinkReq = (link) => {
    return fetch(link, {
        method: 'HEAD'
    })
    .then( (response) => {
        if(response.headers.get('Content-Type').match(imageReg) && response.ok) {
            return response.blob();
        } 

        return Promise.reject(`Ошибка: ${response.status}`);
    })
};

export const postCardReq = (newName, newLink) => {    
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            link: newLink
        })
    })
    .then( handleResponse )
};

export const deleteCardReq = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then( handleResponse )
};

export const putLikeToCardReq = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
    .then( handleResponse )
};

export const deleteLikeFromCardReq = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then( handleResponse )
};

export const patchNewProfilePhoto = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarLink
        })
    })
    .then( handleResponse )
};

