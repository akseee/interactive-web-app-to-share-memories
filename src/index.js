import "./pages/index.css";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  clearValidation,
  enableValidation,
  validationConfig,
} from "./components/validate.js";
import {
  config,
  getUserInfo,
  getCards,
  editUserInfo,
  addNewCard,
  changeProfilePicture,
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
const nameAddInput = document.querySelector(".popup__input_type_card-name");
const linkAddInput = document.querySelector(".popup__input_type_url");
const buttonProfilePicture = document.querySelector(".profile__image");
const popupProfilePicture = document.querySelector(".popup_type_avatar");
const formProfilePicture = document.forms["new-avatar"];
const inputProfilePicture = document.querySelector(".popup__input_type_avatar");
const popupCardImg = document.querySelector(".popup__image");
const popupImg = document.querySelector(".popup_type_image");
const popupCardDescr = document.querySelector(".popup__caption");
const formAddSubmitButton = formAdd.querySelector(".popup__button");
const formEditSubmitButton = formEdit.querySelector(".popup__button");
const formAvatarSubmitButton =
  formProfilePicture.querySelector(".popup__button");
const popupButtonClose = document.querySelectorAll(".popup__close");

const loadInitialData = () =>
  Promise.all([getUserInfo(), getCards()])
    .then(([userInfo, cardsInfo]) => {
      loadUserInfo(userInfo.name, userInfo.about);
      loadUserProfilePicture(userInfo.avatar);
      cardsInfo.forEach((cardInfo) =>
        placesContainer.append(
          createCard(
            cardInfo,
            deleteCard,
            likeCard,
            openImagePopup,
            cardInfo.owner._id,
            userInfo._id
          )
        )
      );
    })
    .catch((err) => {
      loadUserInfo("", "");
      console.log(
        "Ошибка при получении информации о пользователе или карточках",
        err
      );
    });

loadInitialData();

function setIsLoadingButton(status, button) {
  return status
    ? (button.textContent = "Сохранить")
    : (button.textContent = "Сохранение...");
}

function loadUserInfo(userName, userAbout) {
  profileTitle.textContent = userName;
  profileDescr.textContent = userAbout;
}

function loadUserProfilePicture(avatar) {
  buttonProfilePicture.style.backgroundImage = `url(${avatar})`;
}

function handleAddCard(evt) {
  evt.preventDefault();
  setIsLoadingButton(false, formAddSubmitButton);

  const newCardName = nameAddInput.value;
  const newCardLink = linkAddInput.value;

  addNewCard(newCardName, newCardLink)
    .then((card) => {
      nameAddInput.value = "";
      linkAddInput.value = "";
      closeModal(popupAdd);
      placesContainer.prepend(
        createCard(
          {
            name: newCardName,
            link: newCardLink,
            alt: newCardName,
            likes: card.likes,
            _id: card._id,
          },
          deleteCard,
          likeCard,
          openImagePopup,
          card.owner._id,
          card.owner._id
        )
      );
    })
    .catch((err) => {
      console.log("Ошибка при создании карточек", err);
    })
    .finally(() => {
      setIsLoadingButton(true, formAddSubmitButton);
    });
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  setIsLoadingButton(false, formEditSubmitButton);

  editUserInfo(nameInput.value, jobInput.value)
    .then((user) => {
      loadUserInfo(user.name, user.about);
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log("Ошибка при изменении информации профиля", err);
    })
    .finally(() => {
      setIsLoadingButton(true, formEditSubmitButton);
    });
}

function handleProfilePictureFormSubmit(evt) {
  evt.preventDefault();
  setIsLoadingButton(false, formAvatarSubmitButton);

  changeProfilePicture(inputProfilePicture.value)
    .then((data) => {
      loadUserProfilePicture(data.avatar);
      closeModal(popupProfilePicture);
    })
    .catch((err) => {
      console.log("Ошибка при изменении аватара", err);
    })
    .finally(() => {
      setIsLoadingButton(true, formAvatarSubmitButton);
    });
}

function openImagePopup(name, link) {
  popupCardDescr.textContent = name;
  popupCardImg.alt = name;
  popupCardImg.src = link;
  openModal(popupImg);
}

buttonAdd.addEventListener("click", () => {
  openModal(popupAdd);
  clearValidation(formAdd, validationConfig);
});

buttonEdit.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescr.textContent;
  openModal(popupEdit);
  clearValidation(formEdit, validationConfig);
});

buttonProfilePicture.addEventListener("click", () => {
  openModal(popupProfilePicture);
  clearValidation(formProfilePicture, validationConfig);
  inputProfilePicture.value = "";
});

formEdit.addEventListener("submit", handleEditFormSubmit);
formProfilePicture.addEventListener("submit", handleProfilePictureFormSubmit);
formAdd.addEventListener("submit", handleAddCard);

popupButtonClose.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => {
    closeModal(popup);
  });
});

enableValidation(validationConfig);
