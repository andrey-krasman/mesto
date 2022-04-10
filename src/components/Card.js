export class Card {
    constructor (data, cardTempateSelector, handleImageClick, handleDeleteClick) {
        this._cardTemplate = document.querySelector(cardTempateSelector).content
        this._name = data.name
        this._link = data.link
        this._likes = data.likes
        this._id = data.id
        this._handleImageClick = handleImageClick
        this._handleDeleteClick = handleDeleteClick
    }
    
    _likeCard = () => {
        this._likeButton.classList.toggle('elements__like_active')
      }
      
    _deleteCard = () => {
        this._deleteButton.closest('.elements__element').remove()
        this._cardForAdd = null
      }
    
    _setEventListeners = () => {
        this._likeButton.addEventListener('click', () => this._likeCard())
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id))
        this._cardImage.addEventListener('click', () => this._handleImageClick())
    }
    _getLikesNumber () {
        const likeNumber = this._cardForAdd.querySelector('.elements__like-number')
        likeNumber.textContent = this._likes.length
    }

    createCard () {
        this._cardForAdd = this._cardTemplate.cloneNode(true);
        this._cardImage = this._cardForAdd.querySelector('.elements__image')
        this._cardName = this._cardForAdd.querySelector('.elements__name')
        this._likeButton = this._cardForAdd.querySelector('.elements__like')
        this._deleteButton = this._cardForAdd.querySelector('.elements__delete')

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._getLikesNumber ()
        this._setEventListeners()

        return this._cardForAdd
    }   
}