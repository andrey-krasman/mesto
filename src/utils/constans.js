//кнопки открытия попапов
export const popupEditOpenButton = document.querySelector('.profile__edit-button');
export const popupAddPlaceOpenButton = document.querySelector('.profile__add-button');
export const popupChangeAvatarButton = document.querySelector('.profile__avatar')
//forms
export const formEditElement = document.querySelector('#popupEditProfile .popup__form');
export const formAddPlace = document.querySelector('#popupAddPlace .popup__form');
export const formChangeAvatar = document.querySelector('#popupChangeAvatar .popup__form')

//inputs User Info
export const popupNameInput = document.querySelector('#popupInputName');
export const popupCareerInput = document.querySelector('#popupInputCareer');

export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonSelector: '.popup__save-button',
    disabledButtonClass: 'popup__save-button_disabled',
    inputErrorClass: 'popup__input_error',
  }