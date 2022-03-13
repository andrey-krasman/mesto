export class FormValidator {
    constructor (config, form) {
        this._config = config
        this._form = form
    }

    enableValidation () {
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault()
        });
        this._setFormListeners()
    }

    _setFormListeners () {
        this._inputs = Array.from(this._form.querySelectorAll(this._config.inputSelector))
        this._buttonElement = this._form.querySelector(this._config.buttonSelector)

        this._toggleButtonState()
        this._form.addEventListener('reset', () => {
            this._buttonElement.classList.add('popup__save-button_disabled');
            this._buttonElement.setAttribute('disabled', '')
        })
      
        this._form.addEventListener('click', (event) => {
          if(event.target.classList.contains('.close-button')){
          }
        })
      
        this._inputs.forEach(input=> {
            input.addEventListener('input', () => {
                this._isValid(input)
                this._toggleButtonState()
            })
          })
    }

    _isValid (input) {

        if (!input.validity.valid) {
            this._showInputError(input)
            this._showErrorMessage(input, input.validationMessage)
        } else {
            this._hideInputError(input)
            this._hideErrorMessage(input)
        }
      }

    _showInputError (input) {
        const {inputErrorClass} = this._config
        input.classList.add(inputErrorClass)
    }
        
    _hideInputError (input) {
        const {inputErrorClass} = this._config
        input.classList.remove(inputErrorClass)
    }
        
    _showErrorMessage (input, inputErrorMessage) {
        const errorMessage = this._form.querySelector(`#${input.id}Error`)
        errorMessage.textContent = inputErrorMessage
    }
        
    _hideErrorMessage (input) {
        const errorMessage = this._form.querySelector(`#${input.id}Error`)
        errorMessage.textContent = ''
    }

    _toggleButtonState () {
        const {disabledButtonClass} = this._config

        if (this._hasInvalidInput()) {
            this._buttonElement.classList.add(disabledButtonClass)
            this._buttonElement.setAttribute('disabled', '')
        } else {
            this._buttonElement.classList.remove(disabledButtonClass)
            this._buttonElement.removeAttribute('disabled', '')
        }
    }

    _hasInvalidInput () {
        return this._inputs.some((input) => {
            return !input.validity.valid
        })
    }

}

