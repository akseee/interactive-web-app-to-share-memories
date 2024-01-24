import { deleteCardApi, sendLikeApi, removeLikeApi } from "./api.js";

const myId = "f3944d46f76a800a9481ae13";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, remove, putLike, openImage, id) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardlLikeButton = cardElement.querySelector(".card__like-button");
  const likesAmount = cardElement.querySelector(".card__like-counter");
  const cardDeteleButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => openImage(card.name, card.link));

  likesAmount.textContent = card.likes.length;
  if (isCardLiked(card, myId)) {
    cardlLikeButton.classList.add("card__like-button_is-active");
  }

  cardlLikeButton.addEventListener("click", (event) => {
    putLike(event, card._id, likesAmount);
  });

  if (myId === id) {
    cardDeteleButton.style.display = "block";
    cardDeteleButton.addEventListener("click", (event) => {
      remove(event, card._id);
    });
  }
  
  return cardElement;
}

export function deleteCard(event, cardId) {
  deleteCardApi(cardId)
    .then(() => event.target.closest(".card").remove())
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(event, cardId, likesAmount) {
  if (!event.target.classList.contains("card__like-button_is-active")) {
    sendLikeApi(cardId).then((res) => {
      likesAmount.textContent = res.likes.length;
      event.target.classList.add("card__like-button_is-active");
    });
  } else {
    removeLikeApi(cardId).then((res) => {
      likesAmount.textContent = res.likes.length;
      event.target.classList.remove("card__like-button_is-active");
    });
  }
}

function isCardLiked(card, myId) {
  return card.likes.some((like) => like["_id"] == myId);
}
