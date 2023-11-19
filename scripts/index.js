const cardTemplate = document.querySelector("#card-template").content;
const placesContainer = document.querySelector(".places__list");

function addCard(card, remove) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  cardElement.querySelector(".card__image").src = card.link;
  cardElement.querySelector(".card__title").textContent = card.name;

  cardElement
    .querySelector(".card__delete-button")
    .addEventListener("click", (event) => remove(event));

  return cardElement;
}

function deleteCard(event) {
  const card = event.target.closest(".card");
  card.remove();
}

initialCards.forEach((item) => {
  placesContainer.append(addCard(item, deleteCard));
});