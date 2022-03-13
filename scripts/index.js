import {initialCards} from './data.js'
import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'
import {openPopup, closePopup} from './utils.js'
import {popupImagePlace} from './constans.js'

//попапы
const popupProfile = document.querySelector('#popupEditProfile');
const popupPlace = document.querySelector('#popupAddPlace');

//кнопки открытия попапов
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

//кнопки закрытия попапа
const popupCloseEditProfileButton = document.querySelector('#popupEditProfile .popup__close-button');
const popupCloseAddPlaceButton = document.querySelector('#popupAddPlace .popup__close-button');
const popupCloseImagePlaceButton = document.querySelector('#popupImagePlace .popup__close-button');

//формы
const formEditElement = document.querySelector('#popupEditProfile .popup__form');
const formAddPlace = document.querySelector('#popupAddPlace .popup__form');

//профиль существующий
const profileName = document.querySelector('.profile__name');
const profileCareer = document.querySelector('.profile__career');

//поля ввода
const popupNameInput = document.querySelector('#popupInputName');
const popupCareerInput = document.querySelector('#popupInputCareer');
const popupPlaceNameInput = document.querySelector('#popupInputAddPlaceName');
const popupPlaceLinkInput = document.querySelector('#popupInputAddPlaceLink');

const elementsSection = document.querySelector('.elements');// сюда добавляем карточки
const elementTemplate = document.querySelector('#oneElement').content;// здесь получаем содержимое шаблона


const popups = Array.from(document.querySelectorAll('.popup'))
const forms = Array.from(document.querySelectorAll('.popup__form'))
const closePopupButtons = Array.from(document.querySelectorAll('.popup__close-button'))

// validation

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
}

const editProfileValidator = new FormValidator (config, formEditElement)
const addCardValidator = new FormValidator (config, formAddPlace)

editProfileValidator.enableValidation()
addCardValidator.enableValidation()

//
// functions
//

// добавляет в попап существующий профиль
function changeInputProfile () {
  popupNameInput.value = profileName.textContent;
  popupCareerInput.value = profileCareer.textContent;
}

// change profile name and career
function changeProfile () {
  profileName.textContent = popupNameInput.value;
  profileCareer.textContent = popupCareerInput.value;
}

//меняет имя профиля
function handleFormEditProfileSubmit(event) {
    event.preventDefault(event);
    changeProfile()
    closePopup(popupProfile)
}

function renderInitialCard (array) {
  array.forEach(addInitialCard)
}

function addInitialCard (data) {
  prependElement(data)
}

function handleFormAddPlaceSubmit(event) {
  event.preventDefault(event);
  const newData = {
    name: popupPlaceNameInput.value,
    link: popupPlaceLinkInput.value,
  }
  prependElement(newData)
  formAddPlace.reset()
  closePopup(popupPlace)
}

function prependElement (data) {
  const elementforAdd = new Card (data, '#oneElement')
  elementsSection.prepend(elementforAdd.createCard(data));
}

// FUNCTIONS CALLS

popupEditOpenButton.addEventListener('click', () => {
  openPopup(popupProfile)
  changeInputProfile ()
  editProfileValidator.revalidateForm()
});
popupAddPlaceOpenButton.addEventListener('click', () => {
  openPopup(popupPlace)
});

formEditElement.addEventListener('submit', handleFormEditProfileSubmit)
formAddPlace.addEventListener('submit', handleFormAddPlaceSubmit)

popupCloseEditProfileButton.addEventListener('click', () => closePopup(popupProfile))
popupCloseAddPlaceButton.addEventListener('click', () => closePopup(popupPlace))
popupCloseImagePlaceButton.addEventListener('click', () => closePopup(popupImagePlace))

popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
       closePopup(popup)
      }
  })
})

renderInitialCard (initialCards)
