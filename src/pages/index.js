import './index.css'
import {initialCards} from '../utils/data.js'
import {popupEditOpenButton, popupAddPlaceOpenButton, formEditElement, formAddPlace, popupNameInput, popupCareerInput} from '../utils/constans.js'
import {FormValidator} from '../components/FormValidator.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'


// validation
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_error',
}

const profileValidator = new FormValidator (config, formEditElement)
const CardValidator = new FormValidator (config, formAddPlace)

profileValidator.enableValidation()
CardValidator.enableValidation()
//
// добавляет в попап существующий профиль
function changeInputProfile () {
  const data = userInfo.getUserInfo()
  popupNameInput.value = data.name
  popupCareerInput.value = data.career
}

//меняет имя профиля
const handleFormEditProfileSubmit = (data) => {
  userInfo.setUserInfo(data['name'],data['career'])
  popupEditProfile.close()
  }

// работа с карточками
function addInitialCard (data) { 
  section.addItem(createCardForAdd(data))
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
  return elementforAdd.createCard()
}

//Section / Popups / UserInfo
const section = new Section ({items: initialCards, renderer: addInitialCard}, '.elements')

const popupWithImage = new PopupWithImage ('#popupImagePlace')
const popupEditProfile = new PopupWithForm ('#popupEditProfile', handleFormEditProfileSubmit)
const popupAddPlace = new PopupWithForm ('#popupAddPlace', handleFormAddPlaceSubmit)

const userInfo = new UserInfo ({userProfileSelector: '.profile__name', careerProfileSelector: '.profile__career'})

// FUNCTIONS CALLS
popupEditOpenButton.addEventListener('click', () => {
  changeInputProfile ()
  profileValidator.revalidateForm()
  popupEditProfile.open()
});
popupAddPlaceOpenButton.addEventListener('click', () => {
  popupAddPlace.open()
});

popupWithImage.setEventListeners()
popupEditProfile.setEventListeners()
popupAddPlace.setEventListeners()

section.renderItems()