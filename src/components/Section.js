export class Section  {
    constructor ({items, renderer}, containerSelector) {
        this._container = document.querySelector(containerSelector)
        this._items = items
        this._renderer = renderer
    }

    renderItems (items) {
        items.forEach(item => {
            this._renderer(item)
        });
    }

    addItem (el) {
        this._container.prepend(el)
    }
}