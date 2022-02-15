
function enableValidation () {
    const forms = Array.from(document.querySelectorAll('.popup__form'))
    forms.forEach((form) => {
        form.addEventListener('submit', (evt) => {
          evt.preventDefault()
        });
        setFormListeners(form)
      });
}


function setFormListeners (form) {
    const inputs = Array.from(form.querySelectorAll('.popup__input'))
    const buttonElement = form.querySelector('.popup__save-button')
    toggleButtonState(inputs, buttonElement)
    inputs.forEach(input=> {
        input.addEventListener('input', () => {
            isValid(form, input)
            toggleButtonState(inputs, buttonElement)
        })
      })
}

function isValid (form, input) {
    if (!input.validity.valid) {
        // console.log('!')
        showInputError(form, input)
        showErrorMessage(form, input, input.validationMessage)
    } else {
        // console.log('?')
        hideInputError(form, input)
        hideErrorMessage(form, input)
    }
}

function showInputError (form, input) {
  input.classList.add('popup__input_error')
}

function hideInputError (form, input) {
  input.classList.remove('popup__input_error')
}

function showErrorMessage (form, input, inputErrorMessage) {
    const errorMessage = form.querySelector(`#${input.id}Error`)
    errorMessage.textContent = inputErrorMessage
    errorMessage.classList.add('popup__error-message_visible')
    console.log(errorMessage.textContent)
}

function hideErrorMessage (form, input) {
    const errorMessage = form.querySelector(`#${input.id}Error`)
    errorMessage.textContent = ''
    errorMessage.classList.remove('popup__error-message_visible')
    console.log(errorMessage.textContent)
}

  function hasInvalidInput (inputs) {
      return inputs.some((input)=> {
          return !input.validity.valid
      })
  }

  function toggleButtonState (inputs, buttonElement) {
      if (hasInvalidInput(inputs)) {
          buttonElement.classList.add('popup__save-button_disabled')
      } else {
        buttonElement.classList.remove('popup__save-button_disabled')
      }
  }

enableValidation()
