import {initialCards} from './data.js'
import {FormValidator} from './FormValidator.js'
import {Card} from './Card.js'
import {Section} from './Section.js'
import {PopupWithImage} from './PopupWithImage.js'
import {PopupWithForm} from './PopupWithForm.js'

//кнопки открытия попапов
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

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
function changeProfile (data) {
  profileName.textContent = data['name'];
  profileCareer.textContent = data['career'];
}

//меняет имя профиля
const handleFormEditProfileSubmit = (data) => {
    changeProfile(data)
    popupEditProfile.close()
  }


function addInitialCard (data) { 
  elementsSection.prepend(createCardForAdd(data))
}

const handleFormAddPlaceSubmit = (data) => {
  const card = createCardForAdd({
    name: data['addPlaceName'],
    link: data['addPlaceLink'],
  })
  section.addItem(card)
  popupAddPlace.close()
}

function createCardForAdd (data) {
  const elementforAdd = new Card (data, '#oneElement', () => {
  popupWithImage.open(data.link, data.name)})
  return elementforAdd.createCard(data)
}

//classes

const section = new Section ({items: initialCards, renderer: addInitialCard}, '.elements')
section.renderItems()

const popupWithImage = new PopupWithImage ('#popupImagePlace')
const popupEditProfile = new PopupWithForm ('#popupEditProfile', handleFormEditProfileSubmit)
const popupAddPlace = new PopupWithForm ('#popupAddPlace', handleFormAddPlaceSubmit)

popupWithImage.setEventListeners()
popupEditProfile.setEventListeners()
popupAddPlace.setEventListeners()


// FUNCTIONS CALLS
popupEditOpenButton.addEventListener('click', () => {
  changeInputProfile ()
  editProfileValidator.revalidateForm()
  popupEditProfile.open()
});
popupAddPlaceOpenButton.addEventListener('click', () => {
  popupAddPlace.open()
});