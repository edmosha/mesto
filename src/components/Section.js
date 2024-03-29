export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.reverse().forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}