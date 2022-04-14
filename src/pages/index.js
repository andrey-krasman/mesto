import './index.css'
import {initialCards} from '../utils/data.js'
import {popupEditOpenButton, popupAddPlaceOpenButton, formEditElement, formAddPlace, popupNameInput, popupCareerInput, popupChangeAvatarButton, formChangeAvatar, config} from '../utils/constans.js'
import {FormValidator} from '../components/FormValidator.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {api} from '../components/Api.js'

let userID

api.getProfileInfo() 
  .then (res => {
    userID = res._id
    userInfo.setUserInfo(res.name, res.about)
  })
  .catch (console.log)

api.getProfileInfo()
.then (res => {
  userInfo.setUserAvatar(res.avatar)
})
.catch (console.log)


api.getInitialCards()
.then (cardList => {
  cardList.forEach(data => {
    const card = createCardForAdd({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userID: userID,
      ownerID: data.owner._id,
    })
    section.addItem(card)
  })
})
.catch (console.log)

// validation
const profileValidator = new FormValidator (config, formEditElement)
const cardValidator = new FormValidator (config, formAddPlace)
const avatarValidator = new FormValidator (config, formChangeAvatar)

profileValidator.enableValidation()
cardValidator.enableValidation()
avatarValidator.enableValidation()
//
// добавляет в попап существующий профиль
function changeInputProfile () {
  const data = userInfo.getUserInfo()
  popupNameInput.value = data.name
  popupCareerInput.value = data.career
}

//меняет имя профиля
const handleFormEditProfileSubmit = (data) => {
  const {name, career} = data
  const popupProfile = document.querySelector('#popupEditProfile')
  popupProfile.querySelector('.popup__save-button').textContent = 'Сохранение...'
  api.patchProfileInfo(name, career)
  .catch (console.log)
  .finally (() => document.querySelector('#popupEditProfile').querySelector('.popup__save-button').textContent = 'Сохранить')
  userInfo.setUserInfo(name, career)
  popupEditProfile.close()
  }

const handleFormChangeAvatarSubmit = (data) => {
  const popupAvatar = document.querySelector('#popupChangeAvatar')
  popupAvatar.querySelector('.popup__save-button').textContent = 'Сохранение...'
  api.changeAvatar(data.addAvatarLink)
   .then (res => {
    document.querySelector('.profile__avatar').src = res.avatar
   })
   .catch (console.log)
   .finally (() => document.querySelector('#popupChangeAvatar').querySelector('.popup__save-button').textContent = 'Сохранить')
  popupChangeAvatar.close()
}

// работа с карточками
function addInitialCard (data) { 
  section.addItem(createCardForAdd(data))
}

const handleFormAddPlaceSubmit = (data) => {
  const addCard = document.querySelector('#popupAddPlace')
  addCard.querySelector('.popup__save-button').textContent = 'Сохранение...'
  api.addNewCard(data['addPlaceName'], data['addPlaceLink'])
    .then(res=> {
      const card = createCardForAdd({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userID: userID,
        ownerID: res.owner._id,
      })
      .catch (console.log)
      .finally (() => document.querySelector('#popupAddPlace').querySelector('.popup__save-button').textContent = 'Сохранить')
      section.addItem(card)
      popupAddPlace.close()
    })
}

function createCardForAdd (data) {
  const elementforAdd = new Card (
  data,
  '#oneElement',
  () => {popupWithImage.open(data.link, data.name)},
  (id) => {
    popupConfirmDelete.open()
    popupConfirmDelete.rewriteSubmitHandle( () => {
    api.deleteCard(id)
      .then (() => {
        popupConfirmDelete.close()
        elementforAdd.deleteCard()
      })
      .catch (console.log)
    })
    },
  (id) => {
    elementforAdd.isLiked()     ?
    api.deleteLike(id)
    .then (res => {
      elementforAdd.getLikesNumber(res.likes)
    })  
    .then (() => {
      elementforAdd.likeCard()
    })
    .catch (console.log)        :
    api.setLike(id)
    .then (res => {
      elementforAdd.getLikesNumber(res.likes)
    })
    .then (() => {
      elementforAdd.likeCard()
    })
    .catch (console.log)
  }
  )
  
  return elementforAdd.createCard()
}

//Section / Popups / UserInfo
const section = new Section ({items: initialCards, renderer: addInitialCard}, '.elements')

const popupWithImage = new PopupWithImage ('#popupImagePlace')
const popupEditProfile = new PopupWithForm ('#popupEditProfile', handleFormEditProfileSubmit)
const popupAddPlace = new PopupWithForm ('#popupAddPlace', handleFormAddPlaceSubmit)
const popupConfirmDelete = new PopupWithForm ('#popupCardConfirmDelete')
const popupChangeAvatar = new PopupWithForm ('#popupChangeAvatar', handleFormChangeAvatarSubmit)

const userInfo = new UserInfo ({userProfileSelector: '.profile__name', careerProfileSelector: '.profile__career', profileAvatar: '.profile__avatar'})

// FUNCTIONS CALLS
popupEditOpenButton.addEventListener('click', () => {
  changeInputProfile ()
  profileValidator.revalidateForm()
  popupEditProfile.open()
});
popupAddPlaceOpenButton.addEventListener('click', () => {
  popupAddPlace.open()
});

popupChangeAvatarButton.addEventListener('click', ()=> {
  popupChangeAvatar.open()
})

popupWithImage.setEventListeners()
popupEditProfile.setEventListeners()
popupAddPlace.setEventListeners()
popupConfirmDelete.setEventListeners()
popupChangeAvatar.setEventListeners()