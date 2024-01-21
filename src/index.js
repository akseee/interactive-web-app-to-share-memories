import "./pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  initialCards,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  clearValidation,
  enableValidation,
  validationConfig,
} from "./components/validate.js";
import { data } from "autoprefixer";

export const cardTemplate = document.querySelector("#card-template").content;
export const placesContainer = document.querySelector(".places__list");

const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const formAdd = document.forms["new-place"];

const profileTitle = document.querySelector(".profile__title");
const profileDescr = document.querySelector(".profile__description");

const buttonEdit = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");
const formEdit = document.forms["edit-profile"];
const nameInput = document.querySelector(".popup__input_type_name");
const jobInput = document.querySelector(".popup__input_type_description");

const popupCardImg = document.querySelector(".popup__image");
const popupImg = document.querySelector(".popup_type_image");
const popupCardDescr = document.querySelector(".popup__caption");



//  ADDING NEW CARD
function handleAddCard(evt) {
  evt.preventDefault();

  const nameAddInput = document.querySelector(".popup__input_type_card-name");
  const linkAddInput = document.querySelector(".popup__input_type_url");

  const newCardName = nameAddInput.value;
  const newCardLink = linkAddInput.value;

  // addNewCard(newCardName, newCardLink) 
  //   .then((data) => {
  //     console.log(data);
  //     placesContainer.prepend(
  //       createCard(
  //         {name: newCardName, link: newCardLink, alt: newCardName },
  //         deleteCard,
  //         likeCard,
  //         imagePopup
  //       )
  //     );
  //   })
  
  nameAddInput.value = "";
  linkAddInput.value = "";
  closeModal(popupAdd);
}

formAdd.addEventListener("submit", handleAddCard);
buttonAdd.addEventListener("click", () => {
  openModal(popupAdd);
  clearValidation(formAdd, validationConfig);
});



// EDITING PROFILE

function loadUserInfo(userName, userAbout) {
  profileTitle.textContent = userName;
  profileDescr.textContent = userAbout;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  editUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      console.log(user)
      loadUserInfo(user.name, user.about)
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
  
  }

formEdit.addEventListener("submit", handleEditFormSubmit);

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(popupEdit);
  clearValidation(formEdit, validationConfig);
});



//  NEW IMAGE
function imagePopup(name, link) {
  popupCardDescr.textContent = name;
  popupCardImg.alt = name;
  popupCardImg.src = link;
  openModal(popupImg);
}

enableValidation(validationConfig);

//part 3 API
//2. Перед стартом. Как сделать запрос к серверу

const myId = "f3944d46f76a800a9481ae13";
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-4",
  headers: {
    authorization: "13f3996e-14d8-4c67-b30c-98db3b264923",
    "Content-Type": "application/json",
  },
};

//3. Загрузка информации о пользователе с сервера
const getUserInfo = () => {
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
const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "GET",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки карточек: ${res.status}`);
  })
};

getCards().then((data) => data.forEach((item) => {
    placesContainer.append(createCard(item, deleteCard, likeCard, imagePopup));
  }))

// initialCards.forEach((item) => {
//   placesContainer.append(createCard(item, deleteCard, likeCard, imagePopup));
// });

const getUserCardData = () => {
  return Promise.all([getUserInfo(), getCards()]);
};

//5. Редактирование профиля

const editUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки данных профиля: ${res.status}`);
  });
};



// 6. Добавление новой карточки

const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка загрузки данных профиля: ${res.status}`);
  });
}


// 7. Отображение количества лайков карточки