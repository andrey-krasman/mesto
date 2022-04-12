import { Popup } from "./Popup.js";

export class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit) {
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit
        this._form = this._popup.querySelector('.popup__form')
        this._avatar = this._popup.querySelector('#popupChangeAvatar')
    }

    _getInputValues () {
        const inputs = Array.from(this._form.querySelectorAll('.popup__input'))
        const values = {}
        inputs.forEach(input => {
            values[input.name] = input.value
        })
        return values
    }

    setEventListeners () {
        super.setEventListeners()
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())})
    }

    rewriteSubmitHandle (newSubmitHandle) {
        this._handleFormSubmit = newSubmitHandle
    }

    close () {
        super.close()
        this._form.reset()
    }
}