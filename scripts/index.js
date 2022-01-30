const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup__edit-profile');
const popupAddPlace = document.querySelector('.popup__add-place');

const popupCloseEditProfileButton = document.querySelector('.popup__edit-profile .popup__close-button');
const popupCloseAddPlaceButton = document.querySelector('.popup__add-place .popup__close-button');

const popup = document.querySelector('.popup');

const elementsSection = document.querySelector('.elements');

const elementTemplate = document.querySelector('#oneElement').content;

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


initialCards.forEach (function(initialCards) {
  //clone element
  const oneElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
  //add to content
  oneElement.querySelector('.elements__image').src = initialCards.link;
  oneElement.querySelector('.elements__name').textContent = initialCards.name;
  oneElement.querySelector('.elements__image').alt = initialCards.alt;
  //get container for content
  //add content to containers end
  elementsSection.append(oneElement);
})

function formAddPlaceSubmitHandler(event) {
  event.preventDefault(event);
  
  let newPlaceForAdd = {
        name: popupPlaceNameInput.value,
        link: popupPlaceLinkInput.value,
        alt: 'Новое место',
      }
      
  const newPlace = elementTemplate.querySelector('.elements__element').cloneNode(true);

  newPlace.querySelector('.elements__image').src = newPlaceForAdd.link;
  newPlace.querySelector('.elements__name').textContent = newPlaceForAdd.name;
  newPlace.querySelector('.elements__image').alt = newPlaceForAdd.alt;
  initialCards.unshift(newPlaceForAdd)
  elementsSection.prepend(newPlace)
  // initialCards.pop()
  popupAddPlace.classList.remove('popup_opened');
}

popupEditOpenButton.addEventListener('click', popupEditOpen);
popupAddPlaceOpenButton.addEventListener('click', popupAddPlaceOpen);

popupCloseEditProfileButton.addEventListener('click', popupEditProfileClose);
popupCloseAddPlaceButton.addEventListener('click', popupAddPlaceClose)

formEditElement.addEventListener('submit', formEditProfileSubmitHandler);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);

// LIKE
const likePlace = document.querySelectorAll('.elements__like')

likePlace.forEach (function(element) {
  element.addEventListener('click', likeIt)
})

function likeIt (element) {
  element.target.classList.toggle('elements__like_active')
}


// Реализовать ЛАЙК для новых карточек
// 100% вылезет и на дилитах

const deletePlace = document.querySelectorAll('.elements__delete')

deletePlace.forEach (function(element) {
  element.addEventListener('click', deleteIt)
})

function deleteIt (element) {
  element.target.closest('.elements__element').remove()
}