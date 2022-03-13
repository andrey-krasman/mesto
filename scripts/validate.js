
// const config = {
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   buttonSelector: '.popup__save-button',
//   disabledButtonClass: 'popup__save-button_disabled',
//   inputErrorClass: 'popup__input_error',
// }

// function enableValidation ({formSelector, ...rest}) {
//   const forms = Array.from(document.querySelectorAll(formSelector))
//   forms.forEach((form) => {
//       form.addEventListener('submit', (evt) => {
//         evt.preventDefault()
//       });
//       setFormListeners(form, rest)
//     });
// }

// function setFormListeners (form, {inputSelector, buttonSelector, ...rest}) {
//   const inputs = Array.from(form.querySelectorAll(inputSelector))
//   const buttonElement = form.querySelector(buttonSelector)
//   toggleButtonState(inputs, buttonElement, rest)

//   form.addEventListener('reset', () => {
//     buttonElement.classList.add('popup__save-button_disabled');
//     buttonElement.setAttribute('disabled', '')
//   })

//   form.addEventListener('click', (event) => {
//     if(event.target.classList.contains('.close-button')){
//     }
//   })

//   inputs.forEach(input=> {
//       input.addEventListener('input', () => {
//           isValid(form, input, rest)
//           toggleButtonState(inputs, buttonElement, rest)
//       })
//     })
  
// }

// function isValid (form, input, rest) {
//   if (!input.validity.valid) {
//       showInputError(input, rest)
//       showErrorMessage(form, input, input.validationMessage)
//   } else {
//       hideInputError(input, rest)
//       hideErrorMessage(form, input)
//   }
// }

// function showInputError (input, {inputErrorClass}) {
// input.classList.add(inputErrorClass)
// }

// function hideInputError (input, {inputErrorClass}) {
// input.classList.remove(inputErrorClass)
// }

// function showErrorMessage (form, input, inputErrorMessage) {
//   const errorMessage = form.querySelector(`#${input.id}Error`)
//   errorMessage.textContent = inputErrorMessage
// }

// function hideErrorMessage (form, input) {
//   const errorMessage = form.querySelector(`#${input.id}Error`)
//   errorMessage.textContent = ''
// }

// function hasInvalidInput (inputs) {
//     return inputs.some((input)=> {
//         return !input.validity.valid
//     })
// }

// function toggleButtonState (inputs, buttonElement, {disabledButtonClass}) {
//     if (hasInvalidInput(inputs)) {
//       buttonElement.classList.add(disabledButtonClass)
//       buttonElement.setAttribute('disabled', '')
//     } else {
//       buttonElement.classList.remove(disabledButtonClass)
//       buttonElement.removeAttribute('disabled', '')
//     }
// }



// enableValidation(config);
