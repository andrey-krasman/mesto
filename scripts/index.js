const popup = document.querySelector('.popup')
const popupOpenButton = document.querySelector('.profile__edit-button')
const popupCloseButton = document.querySelector('.popup__close-button')

function popupOpen() {
    popup.classList.add('popup_opened')
}

function popupClose() {
    popup.classList.remove('popup_opened')
}



popupOpenButton.addEventListener('click', popupOpen)
popupCloseButton.addEventListener('click', popupClose)




// let popupNameInput = document.querySelectorAll('.popup__input')
// let profileName = document.querySelector('.profile__name')
// let profileCareer = document.querySelector('.profile__career')

// function profileEditName() {


// }

// console.log(popupNameInput)
// console.log(profileName)
// console.log(profileCareer)