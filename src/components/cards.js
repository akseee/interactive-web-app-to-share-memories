import { cardTemplate } from "../index.js";

export const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    alt: "Изображение гор на заднем плане и озера на переднем",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    alt: "Изображение озера в лесу",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    alt: "Изображение городских хрущевок",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    alt: "Изображение горы на заднем плане и поля на переднем",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    alt: "Изображение железной дороги в лесу",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    alt: "Изображение скал и замерзшего Байкала",
  },
];

export function createCard(card, remove, putLike, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;
  cardElement.querySelector(".card__image").alt = card.alt;

  const imageCard = cardElement.querySelector(".card__image") 

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => remove(event));
  imageCard.addEventListener("click", () => openImage(card.name, card.link));
  cardElement.addEventListener("click", putLike);

  return cardElement;
}

export function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}
