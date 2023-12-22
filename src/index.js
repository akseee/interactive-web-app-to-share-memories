import "./pages/index.css";
import {
  createCard,
  deleteCard,
  likeCard,
  initialCards,
} from "./components/cards.js";
import { openModal, closeModal } from "./components/modal.js";

export const cardTemplate = document.querySelector("#card-template").content;
export const placesContainer = document.querySelector(".places__list");

const buttonAdd = document.querySelector(".profile__add-button");
const popupAdd = document.querySelector(".popup_type_new-card");
const formAdd = document.forms["new-place"];
const nameAddInput = document.querySelector(".popup__input_type_card-name");
const linkAddInput = document.querySelector(".popup__input_type_url");

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

initialCards.forEach((item) => {
  placesContainer.append(createCard(item, deleteCard, likeCard, imagePopup));
});

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescr.textContent;

function handleAddCard(evt) {
  evt.preventDefault();
  const newCardName = nameAddInput.value;
  const newCardLink = linkAddInput.value;

  placesContainer.prepend(
    createCard(
      { name: newCardName, link: newCardLink, alt: newCardName },
      deleteCard,
      likeCard,
      imagePopup
    )
  );
  nameAddInput.value = "";
  linkAddInput.value = "";
  closeModal(popupAdd);
}

formAdd.addEventListener("submit", handleAddCard);
buttonAdd.addEventListener("click", () => {
  openModal(popupAdd);
});

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newJob = jobInput.value;
  profileTitle.textContent = newName;
  profileDescr.textContent = newJob;

  closeModal(popupEdit);
}

formEdit.addEventListener("submit", handleEditFormSubmit);

buttonEdit.addEventListener("click", () => {
  openModal(popupEdit);
});


function imagePopup(name, link) {
  popupCardDescr.textContent = name;
  popupCardImg.alt = name;
  popupCardImg.src = link;

  openModal(popupImg);
}
