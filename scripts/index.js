//попапы
const popupProfile = document.querySelector('#popupEditProfile');
const popupPlace = document.querySelector('#popupAddPlace');
const popupImagePlace = document.querySelector('#popupImagePlace')

//кнопки открытия попапов
const popupEditOpenButton = document.querySelector('.profile__edit-button');
const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');

//кнопки закрытия попапа
const popupCloseEditProfileButton = document.querySelector('#popupEditProfile .popup__close-button');
const popupCloseAddPlaceButton = document.querySelector('#popupAddPlace .popup__close-button');
const popupCloseImagePlaceButton = document.querySelector('#popupImagePlace .popup__close-button');

//для открытия попапа с картинкой
const popupImage = document.querySelector('.popup__image')
const popupImageTitle = document.querySelector('.popup__title-image')

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

const closePopupButtons = Array.from(document.querySelectorAll('.popup__close-button'))

// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   buttonSelector: '.popup__save-button',
//   disabledButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_error',
// }

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

function openPopup (popup) {
  popup.classList.add('popup_opened')
  // enableValidation(config)
  document.addEventListener('keydown', closePopupEscape)
}

function closePopup (popup) {
  popup.classList.remove('popup_opened')
}

//меняет имя профиля
function handleFormEditProfileSubmit(event) {
    event.preventDefault(event);
    changeProfile()
    closePopup(popupProfile)
}

function likeCard (element) {
  element.target.classList.toggle('elements__like_active')
}

function deleteCard (element) {
  element.target.closest('.elements__element').remove()
}

function openPopupPlace (element) {
  if (element.target.classList.contains('elements__image')) {
    openPopup(popupImagePlace)
    popupImage.src = element.target.src
    popupImage.alt = element.target.alt
    popupImageTitle.textContent = element.target.alt
  }
}

function renderInitialCard (array) {
  array.reverse()
  array.forEach(addInitialCard)
}

function addInitialCard (array) {
  prependElement(array.name, array.link)
}

function handleFormAddPlaceSubmit(event) {
  event.preventDefault(event);
  prependElement(popupPlaceNameInput.value, popupPlaceLinkInput.value)
  // formAddPlace.reset()
  closePopup(popupPlace)
}

function prependElement (name, link) {
  const elementforAdd = createCard(name, link)
  elementsSection.prepend(elementforAdd);
}

function createCard (name, link) {
  const cardForAdd = elementTemplate.cloneNode(true);
  const cardImage = cardForAdd.querySelector('.elements__image')
  const cardName = cardForAdd.querySelector('.elements__name')
  const cardLike = cardForAdd.querySelector('.elements__like')
  const cardDelete = cardForAdd.querySelector('.elements__delete')
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;
  cardLike.addEventListener('click', likeCard)
  cardDelete.addEventListener('click', deleteCard)
  cardImage.addEventListener('click', openPopupPlace)
  return cardForAdd
}

// FUNCTIONS CALLS

popupEditOpenButton.addEventListener('click', ()=> {
  openPopup(popupProfile)
  changeInputProfile ()
});
popupAddPlaceOpenButton.addEventListener('click', ()=> {
  openPopup(popupPlace)
  cleanAddPlaceInput()
});

formEditElement.addEventListener('submit', handleFormEditProfileSubmit)
formAddPlace.addEventListener('submit', handleFormAddPlaceSubmit)

popupCloseEditProfileButton.addEventListener('click', ()=>closePopup(popupProfile))
popupCloseAddPlaceButton.addEventListener('click', ()=>closePopup(popupPlace))
popupCloseImagePlaceButton.addEventListener('click', ()=>closePopup(popupImagePlace))

renderInitialCard (initialCards)


popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
       closePopup(popup)
      }
  })
})

popups.forEach((popup) => {
  popup.addEventListener('keydown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
       closePopup(popup)
      }
  })
})

function closePopupEscape (evt) {
  if (evt.key === 'Escape') {
  popupForCloseEscape = document.querySelector('.popup_opened')
  closePopup(popupForCloseEscape)
  }
}