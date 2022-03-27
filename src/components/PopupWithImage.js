import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup{
    constructor(popupSelector) {
        super(popupSelector)
    }

    open (link, name) {
        const image = this._popup.querySelector('.popup__image')
        const title = this._popup.querySelector('.popup__title-image')

        image.src = link
        title.textContent = name

        super.open()
    }
}