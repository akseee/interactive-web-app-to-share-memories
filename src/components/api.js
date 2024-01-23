//part 3 API
//2. Перед стартом. Как сделать запрос к серверу
const myId = "f3944d46f76a800a9481ae13";

export const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "13f3996e-14d8-4c67-b30c-98db3b264923",
    "Content-Type": "application/json",
  },
};

//3. Загрузка информации о пользователе с сервера
export const getUserInfoApi = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Ошибка получения информации о пользователе: ${res.status}`
    );
  });
};

//4. Загрузка карточек с сервера
export const getCardsApi = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки карточек: ${res.status}`);
  });
};

//5. Редактирование профиля
export const editUserInfoApi = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки данных профиля: ${res.status}`);
  });
};

// 6. Добавление новой карточки
export const addNewCardApi = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки данных профиля: ${res.status}`);
  });
};

// 9. Постановка и снятие лайка

// const sendLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "PUT",
//     headers: config.headers,
//  
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка отправки лайка: ${res.status}`);
//   });
// };

// const removeLike = (cardId) => {
//   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
//     method: "DELETE",
//     headers: config.headers,
//   
//   }).then((res) => {
//     if (res.ok) {
//       return res.json();
//     }
//     return Promise.reject(`Ошибка удаления лайка: ${res.status}`);
//   });
// };


export const changeProfilePictureApi = (avatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки фотографии профиля: ${res.status}`);
  });
};

// 8. Удаление карточки

export const deleteCardApi = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка удаления карточки: ${res.status}`);
  });
}