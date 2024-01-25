import { deleteCardServer, sendLike, removeLike } from "./api.js";

const cardTemplate = document.querySelector("#card-template").content;

export function createCard(
  card,
  remove,
  onLikeClick,
  openImage,
  cardOwnerId,
  currentUserId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const likesAmount = cardElement.querySelector(".card__like-counter");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardTitle.textContent = card.name;

  cardImage.addEventListener("click", () => openImage(card.name, card.link));

  likesAmount.textContent = card.likes.length;
  if (isCardLiked(card, currentUserId)) {
    cardLikeButton.classList.add("card__like-button_is-active");
  }

  cardLikeButton.addEventListener("click", (event) => {
    onLikeClick(event, card._id, likesAmount);
  });

  if (currentUserId === cardOwnerId) {
    cardDeleteButton.style.display = "block";
    cardDeleteButton.addEventListener("click", (event) => {
      remove(event, card._id);
    });
  }

  return cardElement;
}

export function deleteCard(event, cardId) {
  deleteCardServer(cardId)
    .then(() => event.target.closest(".card").remove())
    .catch((err) => {
      console.log(err);
    });
}

export function likeCard(event, cardId, likesAmount) {
  if (!event.target.classList.contains("card__like-button_is-active")) {
    sendLike(cardId).then((res) => {
      likesAmount.textContent = res.likes.length;
      event.target.classList.add("card__like-button_is-active");
    });
  } else {
    removeLike(cardId).then((res) => {
      likesAmount.textContent = res.likes.length;
      event.target.classList.remove("card__like-button_is-active");
    });
  }
}

function isCardLiked(card, myId) {
  return card.likes.some((like) => like._id === myId);
}
