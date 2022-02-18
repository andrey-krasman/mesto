
function enableValidation ({formSelector, inputSelector, buttonSelector, disabledButtonClass,inputErrorClass}) {
    const forms = Array.from(document.querySelectorAll(formSelector))
    forms.forEach((form) => {
      form.addEventListener('submit', (evt) => {
          evt.preventDefault()
        });
        setFormListeners(form, formSelector, inputSelector, buttonSelector, disabledButtonClass, inputErrorClass)
      });
}

function setFormListeners (form, formSelector, inputSelector, buttonSelector, disabledButtonClass, inputErrorClass) {
    const inputs = Array.from(form.querySelectorAll(inputSelector))
    const buttonElement = form.querySelector(buttonSelector)
    toggleButtonState(inputs, buttonElement, disabledButtonClass)
    inputs.forEach(input=> {
      input.addEventListener('input', () => {
            isValid(form, input, inputErrorClass)
            toggleButtonState(inputs, buttonElement, disabledButtonClass)
            console.log('a')
        })
      })
}

function isValid (form, input, inputErrorClass) {
    if (!input.validity.valid) {
        showInputError(input, inputErrorClass)
        showErrorMessage(form, input, input.validationMessage)
    } else {
        hideInputError(input, inputErrorClass)
        hideErrorMessage(form, input)
    }
}

function showInputError (input, inputErrorClass) {
  input.classList.add(inputErrorClass)
}

function hideInputError (input, inputErrorClass) {
  input.classList.remove(inputErrorClass)
}

function showErrorMessage (form, input, inputErrorMessage) {
    const errorMessage = form.querySelector(`#${input.id}Error`)
    errorMessage.textContent = inputErrorMessage
    console.log(errorMessage.textContent)
}

function hideErrorMessage (form, input) {
    const errorMessage = form.querySelector(`#${input.id}Error`)
    errorMessage.textContent = ''
    console.log(errorMessage.textContent)
}

  function hasInvalidInput (inputs) {
      return inputs.some((input)=> {
          return !input.validity.valid
      })
  }

  function toggleButtonState (inputs, buttonElement, disabledButtonClass) {
      if (hasInvalidInput(inputs)) {
        buttonElement.classList.add(disabledButtonClass)
      } else {
        buttonElement.classList.remove(disabledButtonClass)
      }
  }

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  buttonSelector: '.popup__save-button',
  disabledButtonClass: '.popup__save-button_disabled',
  inputErrorClass: '.popup__input_error',
})