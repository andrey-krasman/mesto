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


//Проектная работа №5

//ADD FOTO TO THE ELEMENT

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ]; 
 
initialCards.forEach (function(initialCards) {
    //find template.content
    const elementTemplate = document.querySelector('#oneElement').content;
    //clone element
    const oneElement = elementTemplate.querySelector('.elements__element').cloneNode(true);
    //add to content
    oneElement.querySelector('.elements__image').src = initialCards.link;
    oneElement.querySelector('.elements__name').textContent = initialCards.name;
    //get container for content
    const elementsSection = document.querySelector('.elements');
    //add content to containers end
    elementsSection.append(oneElement)
})


