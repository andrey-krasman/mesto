export class Card {
    constructor (data, cardTempateSelector, handleImageClick, handleDeleteClick, handleLikeClick) {
        this._cardTemplate = document.querySelector(cardTempateSelector).content
        this._name = data.name
        this._link = data.link
        this._likes = data.likes
        this._id = data.id
        this._userID = data.userID
        this._ownerID = data.ownerID

        this._handleImageClick = handleImageClick
        this._handleDeleteClick = handleDeleteClick
        this._handleLikeClick = handleLikeClick 
    }
    
    isLiked () {
        const userLikeCard = this._likes.find(user => user._id === this._userID)
        return userLikeCard
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
        this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id))
        this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id))
        this._cardImage.addEventListener('click', () => this._handleImageClick())
    }

    _getLikesNumber (likes) {
        this._likes = likes
        this._likeCount.textContent = this._likes.length

        if (this.isLiked()) {
            this._likeCard()
        } 
    }    

    createCard () {
        this._cardForAdd = this._cardTemplate.cloneNode(true);
        this._cardImage = this._cardForAdd.querySelector('.elements__image')
        this._cardName = this._cardForAdd.querySelector('.elements__name')
        this._likeButton = this._cardForAdd.querySelector('.elements__like')
        this._deleteButton = this._cardForAdd.querySelector('.elements__delete')

        this._likeCount = this._cardForAdd.querySelector('.elements__like-number')

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardName.textContent = this._name;

        this._getLikesNumber (this._likes)
        this._setEventListeners()

        if (this._userID !== this._ownerID) {
            this._deleteButton.remove()
        }

        return this._cardForAdd
    }   

}

