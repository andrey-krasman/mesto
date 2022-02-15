const forms = Array.from(document.querySelectorAll('.popup__form'))
const inputs = Array.from(document.querySelectorAll('.popup__input'))


inputs.forEach(input=> {
  setInputListeners (input)
})


function setInputListeners (input) {
    input.addEventListener('input', (evt) => {
        isValid(input)
    })
}

function isValid (input) {
    if (!input.validity.valid) {
        console.log('!')
        showInputError(input)
        showErrorMessage(input, input.validationMessage)
    } else {
        console.log('?')
        hideInputError(input)
        hideErrorMessage(input)
    }
}

function showInputError (input) {
  input.classList.add('popup__input_error')
}

function hideInputError (input) {
  input.classList.remove('popup__input_error')
}

function showErrorMessage (input, inputErrorMessage) {
    const errorMessage = document.querySelector(`#${input.id}Error`)
    errorMessage.textContent = inputErrorMessage
    errorMessage.classList.add('popup__error-message_visible')
    // console.log(errorMessage)
}

function hideErrorMessage (input) {
    const errorMessage = document.querySelector(`#${input.id}Error`)
    errorMessage.textContent = ''
    errorMessage.classList.remove('popup__error-message_visible')
    // console.log(errorMessage)
}