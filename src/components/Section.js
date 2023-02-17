export class Section {
  constructor({ items, renderer }, container) {
    this._renderCards = items;
    this._renderer = renderer;
    this._container = container;
  };

  // Отрисовка всех элементов
  renderCards() {
    this._renderCards.forEach((item) => {
      this._renderer(item);
    });
  };

  addCard(element) {
    this._container.prepend(element);
  };
};