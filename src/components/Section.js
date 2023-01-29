export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderCards = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  };

  renderCards() {
    this._renderCards.forEach((item) => {
      this._renderer(item);
    });
  };

  addItem(element) {
    this._containerSelector.prepend(element);
  };
};