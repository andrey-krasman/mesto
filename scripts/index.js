const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddPlace = document.querySelector('.popup__add-place');

const popupCloseEditProfileButton = document.querySelector('.popup__edit-profile .popup__close-button');
const popupCloseAddPlaceButton = document.querySelector('.popup__add-place .popup__close-button');

const popup = document.querySelectorAll('.popup');

const elementsSection = document.querySelector('.elements');

const elementTemplate = document.querySelector('#oneElement').content;

const popupImagePlace = document.querySelector('.popup__image-place')
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__title-image')

const popupCloseImagePlaceButton = document.querySelector('.popup__image-place .popup__close-button');

let profileName = document.querySelector('.profile__name');
let profileCareer = document.querySelector('.profile__career');

let popupNameInput = document.querySelector('#popupInputName');
let popupCareerInput = document.querySelector('#popupInputCareer');
let popupPlaceNameInput = document.querySelector('#popupInputAddPlaceName');
let popupPlaceLinkInput = document.querySelector('#popupInputAddPlaceLink');


let formEditElement = document.querySelector('.popup__edit-profile .popup__form');
let formAddPlace = document.querySelector('.popup__add-place .popup__form');

function popupEditOpen() {
    popupEditProfile.classList.add('popup_opened');
    popupNameInput.value = profileName.textContent;
    popupCareerInput.value = profileCareer.textContent;
}

function popupAddPlaceOpen() {
  popupAddPlace.classList.add('popup_opened');
  popupPlaceNameInput.value = ''
  popupPlaceLinkInput.value = ''
}

function popupEditProfileClose() {
  popupEditProfile.classList.remove('popup_opened');
}

function popupAddPlaceClose() {
  popupAddPlace.classList.remove('popup_opened');
  popupPlaceNameInput.removeAttribute.value
  popupPlaceLinkInput.removeAttribute.value
}

function formEditProfileSubmitHandler(event) {
    event.preventDefault(event);
    profileName.textContent = popupNameInput.value;
    profileCareer.textContent = popupCareerInput.value;
    popupEditProfile.classList.remove('popup_opened');
}


function renderOldElement () {
  initialCards.forEach(addOldElement)
}

function addOldElement (initialCards) {
  const oneElement = elementTemplate.querySelector('.elements__element').cloneNode(true);

  oneElement.querySelector('.elements__image').src = initialCards.link;
  oneElement.querySelector('.elements__name').textContent = initialCards.name;
  oneElement.querySelector('.elements__image').alt = initialCards.name;
  oneElement.querySelector('.elements__like').addEventListener('click', likeIt)
  oneElement.querySelector('.elements__delete').addEventListener('click', deleteIt)
  oneElement.querySelector('.elements__image').addEventListener('click', openPopupPlace)
  elementsSection.append(oneElement);
}

function formAddPlaceSubmitHandler(event) {
  event.preventDefault(event);

  let newPlaceForAdd = {
        name: popupPlaceNameInput.value,
        link: popupPlaceLinkInput.value,
        alt: popupPlaceNameInput.value,
      }

  const newPlace = elementTemplate.querySelector('.elements__element').cloneNode(true);

  newPlace.querySelector('.elements__image').src = newPlaceForAdd.link;
  newPlace.querySelector('.elements__name').textContent = newPlaceForAdd.name;
  newPlace.querySelector('.elements__image').alt = newPlaceForAdd.name;
  newPlace.querySelector('.elements__like').addEventListener('click', likeIt)
  newPlace.querySelector('.elements__delete').addEventListener('click', deleteIt)
  newPlace.querySelector('.elements__image').addEventListener('click', openPopupPlace)
  initialCards.unshift(newPlaceForAdd)
  elementsSection.prepend(newPlace)
  popupAddPlace.classList.remove('popup_opened');
}

function likeIt (element) {
  element.target.classList.toggle('elements__like_active')
}

function deleteIt (element) {
  element.target.closest('.elements__element').remove()
}

function openPopupPlace (element) {
  if (element.target.classList.contains('elements__image')) {
    popupImagePlace.classList.add ('popup_opened')
    popupImage.src = element.target.src
    popupImage.alt = element.target.alt
    popupImageTitle.textContent = element.target.alt
  }
}

function popupImagePlaceClose() {
  popupImagePlace.classList.remove('popup_opened');
}

// FUNCTIONS CALL

renderOldElement ()

popupEditOpenButton.addEventListener('click', popupEditOpen);

popupAddPlaceOpenButton.addEventListener('click', popupAddPlaceOpen);

popupCloseEditProfileButton.addEventListener('click', popupEditProfileClose);

popupCloseAddPlaceButton.addEventListener('click', popupAddPlaceClose)

formEditElement.addEventListener('submit', formEditProfileSubmitHandler);

formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);

popupCloseImagePlaceButton.addEventListener('click', popupImagePlaceClose);