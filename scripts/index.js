const popupOpenButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const popupCloseButton = document.querySelector('.popup__close-button')

let profileName = document.querySelector('.profile__name')
let profileCareer = document.querySelector('.profile__career')

let popupNameInput = document.querySelector('#popupInputName')
let popupCareerInput = document.querySelector('#popupInputCareer')

let formElement = document.querySelector('.popup__form')

function popupOpen() {
    popup.classList.add('popup_opened')
    popupNameInput.value = profileName.textContent
    popupCareerInput.value = profileCareer.textContent
}

function popupClose() {
    popup.classList.remove('popup_opened')
}

function formSubmitHandler(event) {
    event.preventDefault(event)
    profileName.textContent = popupNameInput.value
    profileCareer.textContent = popupCareerInput.value
    popup.classList.remove('popup_opened')
}

popupOpenButton.addEventListener('click', popupOpen)
popupCloseButton.addEventListener('click', popupClose)
formElement.addEventListener('submit', formSubmitHandler)