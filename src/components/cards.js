import { deleteCardApi } from "./api.js";

const myId = "f3944d46f76a800a9481ae13";
const cardTemplate = document.querySelector("#card-template").content;

export function createCard(card, remove, putLike, openImage) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardlLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikesAmount = cardElement.querySelector(".card__like-counter");
  const cardDeteleButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

  cardLikesAmount.textContent = card.likes.length;

  if (isCardLiked(card, myId)) {
    cardlLikeButton.classList.add("card__like-button_is-active");
  }

  if (myId === card.owner._id) {
    cardDeteleButton.style.display = "block";
    cardDeteleButton.addEventListener("click", (event) =>
      remove(event, card._id)
    );
  }

  cardImage.addEventListener("click", () => openImage(card.name, card.link));
  cardElement.addEventListener("click", putLike);

  return cardElement;
}

export function deleteCard(event, cardId) {
  deleteCardApi(cardId)
    .then(() => event.target.closest(".card").remove())
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(evt) {
  if (evt.target.classList.contains("card__like-button")) {
    evt.target.classList.toggle("card__like-button_is-active");
  }
}

function isCardLiked(card, myId) {
  return card.likes.some((like) => {
    return like["_id"] == myId;
  });
}
