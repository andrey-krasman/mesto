const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-button')
const popupCloseButton = document.querySelector('.popup__close-button')

let profileName = document.querySelector('.profile__name')
let profileCareer = document.querySelector('.profile__career')
let popupNameInput = document.querySelector('.popup__input-name')
let popupCareerInput = document.querySelector('.popup__input-career')

const popupSaveButton = document.querySelector('.popup__save-button')
let formElement = document.querySelector('.popup__form')

popupNameInput.setAttribute('value', profileName.textContent)
popupCareerInput.setAttribute('value', profileCareer.textContent)

function popupOpen() {
    popup.classList.add('popup_opened')
}

function popupClose() {
    popup.classList.remove('popup_opened')
    popupNameInput.value = profileName.textContent
    popupCareerInput.value = profileCareer.textContent
}

function formSubmitHandler() {
    profileName.textContent = popupNameInput.value
    profileCareer.textContent = popupCareerInput.value
    popup.classList.remove('popup_opened')
}

popupOpenButton.addEventListener('click', popupOpen)
popupCloseButton.addEventListener('click', popupClose)
popupSaveButton.addEventListener('click', formSubmitHandler)