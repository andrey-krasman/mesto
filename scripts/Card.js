import {openPopup} from './utils.js'
import {popupImage, popupImageTitle, popupImagePlace} from './constans.js'

export class Card {
    constructor (data, cardTempateSelector) {
        this._cardTemplate = document.querySelector(cardTempateSelector).content
        this._name = data.name
        this.link = data.link
    }
    
    _likeCard = () => {
        this._likeButton.classList.toggle('elements__like_active')
      }
      
    _deleteCard = () => {
        this._deleteButton.closest('.elements__element').remove()
      }
    
    _openPopupPlace () {
        openPopup(popupImagePlace)
        popupImage.src = this._link
        popupImage.alt = this._name
        popupImageTitle.textContent = this._name
    }

    _setEventListeners = () => {
        this._likeButton.addEventListener('click', this._likeCard)
        this._deleteButton.addEventListener('click', this._deleteCard)
        this._cardImage.addEventListener('click', this._openPopupPlace)
    }

    createCard () {
        this._cardForAdd = this._cardTemplate.cloneNode(true);
        this._cardImage = this._cardForAdd.querySelector('.elements__image')
        this._cardName = this._cardForAdd.querySelector('.elements__name')
        this._likeButton = this._cardForAdd.querySelector('.elements__like')
        this._deleteButton = this._cardForAdd.querySelector('.elements__delete')

        this._cardImage.src = this.link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._setEventListeners()

        return this._cardForAdd
    }   

}