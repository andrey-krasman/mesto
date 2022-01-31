//попапы
const popupProfile = document.querySelector('.popup__edit-profile');
const popupPlace = document.querySelector('.popup__add-place');
const popupImagePlace = document.querySelector('.popup__image-place')

//кнопки открытия попапов
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

//кнопки закрытия попапа
const popupCloseEditProfileButton = document.querySelector('.popup__edit-profile .popup__close-button');
const popupCloseAddPlaceButton = document.querySelector('.popup__add-place .popup__close-button');
const popupCloseImagePlaceButton = document.querySelector('.popup__image-place .popup__close-button');

//голова попапа
const popup = document.querySelectorAll('.popup');

//карточка
const elementsSection = document.querySelector('.elements');

//содержимое шаблона
const elementTemplate = document.querySelector('#oneElement').content;

//для открытия попапа с картинкой
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__title-image')

//формы
const formEditElement = document.querySelector('.popup__edit-profile .popup__form');
const formAddPlace = document.querySelector('.popup__add-place .popup__form');

//профиль существующий
let profileName = document.querySelector('.profile__name');
let profileCareer = document.querySelector('.profile__career');

//поля ввода
let popupNameInput = document.querySelector('#popupInputName');
let popupCareerInput = document.querySelector('#popupInputCareer');
let popupPlaceNameInput = document.querySelector('#popupInputAddPlaceName');
let popupPlaceLinkInput = document.querySelector('#popupInputAddPlaceLink');

//
// functions
//

// добавляет в попап существующий профиль
function changeInputProfile () {
  popupNameInput.value = profileName.textContent;
  popupCareerInput.value = profileCareer.textContent;
}

//очищает поле ввода добавления карточки
function cleanAddPlaceInput () {
  popupPlaceNameInput.value = ''
  popupPlaceLinkInput.value = ''
}

// change profile name and career
function changeProfile () {
  profileName.textContent = popupNameInput.value;
  profileCareer.textContent = popupCareerInput.value;
}

function popupAddPlaceOpen() {
  popupPlace.classList.add('popup_opened');
  cleanAddPlaceInput()
}

function popupEditOpen() {
  popupProfile.classList.add('popup_opened')
  changeInputProfile ()
}

function popupEditProfileClose() {
  popupProfile.classList.remove('popup_opened');
}

function popupAddPlaceClose() {
  popupPlace.classList.remove('popup_opened');
  cleanAddPlaceInput ()
}

function popupImagePlaceClose() {
  popupImagePlace.classList.remove('popup_opened');
}

function formEditProfileSubmitHandler(event) {
    event.preventDefault(event);
    changeProfile()
    popupProfile.classList.remove('popup_opened');
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
  popupPlace.classList.remove('popup_opened');
}

// likeCard
function likeIt (element) {
  element.target.classList.toggle('elements__like_active')
}

// deleteCard
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

// FUNCTIONS CALLS

renderOldElement ()

popupCloseImagePlaceButton.addEventListener('click', popupImagePlaceClose);
popupCloseEditProfileButton.addEventListener('click', popupEditProfileClose);
popupCloseAddPlaceButton.addEventListener('click', popupAddPlaceClose);

popupEditOpenButton.addEventListener('click', popupEditOpen);
popupAddPlaceOpenButton.addEventListener('click', popupAddPlaceOpen);

formEditElement.addEventListener('submit', formEditProfileSubmitHandler);
formAddPlace.addEventListener('submit', formAddPlaceSubmitHandler);
