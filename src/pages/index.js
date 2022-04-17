import './index.css'
import {initialCards} from '../utils/data.js'
import {popupEditOpenButton, popupAddPlaceOpenButton, formEditElement, formAddPlace, popupNameInput, popupCareerInput, popupChangeAvatarButton, formChangeAvatar, config, popupProfileSubmitButton, popupAvatarSubmitButton, addCardSubmitButton} from '../utils/constans.js'
import {FormValidator} from '../components/FormValidator.js'
import {Card} from '../components/Card.js'
import {Section} from '../components/Section.js'
import {PopupWithImage} from '../components/PopupWithImage.js'
import {PopupWithForm} from '../components/PopupWithForm.js'
import {UserInfo} from '../components/UserInfo.js'
import {api} from '../components/Api.js'

let userID

Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then (([userData, cardList]) => {
    userID = userData._id
    userInfo.setUserInfo(userData.name, userData.about)
    userInfo.setUserAvatar(userData.avatar)
    section.renderItems (cardList) 
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
  popupProfileSubmitButton.textContent = 'Сохранение...'
  api.patchProfileInfo(name, career)
  .then (()=> {
    userInfo.setUserInfo(name, career)
    popupEditProfile.close()
  })
  .catch (console.log)
  .finally (() => popupProfileSubmitButton.textContent = 'Сохранить')
  }

const handleFormChangeAvatarSubmit = (data) => {
  popupAvatarSubmitButton.textContent = 'Сохранение...'
  api.changeAvatar(data.addAvatarLink)
   .then (res => {
    userInfo.setUserAvatar(res.avatar)
    popupChangeAvatar.close()
   })
   .catch (console.log)
   .finally (() => popupAvatarSubmitButton.textContent = 'Сохранить')
}

// работа с карточками
function addInitialCard (data) { 
  section.addItem(createCardForAdd(data))
}

const handleFormAddPlaceSubmit = (data) => {
  addCardSubmitButton.textContent = 'Сохранение...'
  api.addNewCard(data['addPlaceName'], data['addPlaceLink'])
    .then(res=> {
      addInitialCard ({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userID: userID,
        ownerID: res.owner._id,
      })
      popupAddPlace.close()
    })
    .catch (console.log)
    .finally (() => addCardSubmitButton.textContent = 'Сохранить')
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
const section = new Section ({items: [], renderer: (item) => {
  section.addItem(createCardForAdd ( {
      name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      userID: userID,
      ownerID: item.owner._id,
  }))
}}, '.elements')

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