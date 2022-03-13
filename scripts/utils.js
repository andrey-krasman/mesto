
export function openPopup (popup) {
    popup.classList.add('popup_opened')
    document.addEventListener('keydown', closePopupEscape)
  }

export function closePopup (popup) {
    popup.classList.remove('popup_opened')
    document.removeEventListener('keydown', closePopupEscape)
}

export function closePopupEscape (evt) {
    if (evt.key === 'Escape') {
    const popupForCloseEscape = document.querySelector('.popup_opened')
    closePopup(popupForCloseEscape)
    }
}