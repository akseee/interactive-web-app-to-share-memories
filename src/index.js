import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  clearValidation,
  enableValidation,
  validationConfig,
} from "./components/validate.js";
import {
  config,
  getUserInfoApi,
  getCardsApi,
  editUserInfoApi,
  addNewCardApi,
  changeProfilePictureApi,
} from "./components/api.js";
import { data } from "autoprefixer";

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

//  ADDING NEW CARD

const loadInitialData = () =>
  Promise.all([getUserInfoApi(), getCardsApi()])
    .then(([userInfo, cardsInfo]) => {
      loadUserInfo(userInfo.name, userInfo.about);
      loadUserProfilePicture(userInfo.avatar);
      cardsInfo.forEach((cardInfo) =>
        placesContainer.append(
          createCard(cardInfo, deleteCard, likeCard, imagePopup)
        )
      );
    })
    .catch((errorCode) => {
      loadUserInfo(null);
      console.log(
        "Ошибка при получении информации о пользователе или карточках",
        errorCode
      );
    });

// add a card to page
function handleAddCard(evt) {
  evt.preventDefault();

  const nameAddInput = document.querySelector(".popup__input_type_card-name");
  const linkAddInput = document.querySelector(".popup__input_type_url");

  const newCardName = nameAddInput.value;
  const newCardLink = linkAddInput.value;

  addNewCardApi(newCardName, newCardLink)
  .then((card) => {
    console.log(card);
    closeModal(popupAdd);
    placesContainer.prepend(
      createCard(
        { name: newCardName, link: newCardLink, alt: newCardName, likes: card.likes},
        deleteCard,
        likeCard,
        imagePopup
      )
    )
  })

  nameAddInput.value = "";
  linkAddInput.value = "";
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
  editUserInfoApi(nameInput.value, jobInput.value)
    .then((user) => {
      loadUserInfo(user.name, user.about);
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    });
}

formEdit.addEventListener("submit", handleEditFormSubmit);

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(popupEdit);
  clearValidation(formEdit, validationConfig);
});

const popupCardImg = document.querySelector(".popup__image");
const popupImg = document.querySelector(".popup_type_image");
const popupCardDescr = document.querySelector(".popup__caption");

function imagePopup(name, link) {
  popupCardDescr.textContent = name;
  popupCardImg.alt = name;
  popupCardImg.src = link;
  openModal(popupImg);
}

const buttonProfilePicture = document.querySelector(".profile__image");
const popupProfilePicture = document.querySelector(".popup_type_avatar");
const formProfilePicture = document.forms["new-avatar"];
const inputProfilePicture = document.querySelector(".popup__input_type_avatar");

buttonProfilePicture.addEventListener("click", () => {
  openModal(popupProfilePicture);
  clearValidation(formProfilePicture, validationConfig);
  inputProfilePicture.value = "";
});

function loadUserProfilePicture(avatar) {
  buttonProfilePicture.style.backgroundImage = `url(${avatar})`;
}

function handleProfilePicture(evt) {
  evt.preventDefault();
  changeProfilePictureApi(inputProfilePicture.value)
    .then((data) => {
      loadUserProfilePicture(data.avatar);
      closeModal(popupProfilePicture);
    })
    .catch((err) => {
      console.log(err);
    });
}

formProfilePicture.addEventListener("submit", handleProfilePicture);

loadInitialData();
enableValidation(validationConfig);
