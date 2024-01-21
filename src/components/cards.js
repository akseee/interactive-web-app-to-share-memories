import { cardTemplate } from "../index.js";

export function createCard(card, remove, putLike, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardlLikeButton = cardElement.querySelector('.card__like-button');
  const cardLikesAmount = cardElement.querySelector('.card__like-counter');
  const cardDeteleButton = cardElement.querySelector('.card__delete-button');
  

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

  cardLikesAmount.textContent = card.likes.length


  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => remove(event));
  cardImage.addEventListener("click", () => openImage(card.name, card.link));
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

