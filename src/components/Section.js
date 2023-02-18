export class Section {
  constructor({ renderer }, container) {
    this._renderer = renderer;
    this._container = container;
  };

  // Отрисовка всех элементов
  renderCards(initialData) {
    initialData.forEach(item => {
      this._renderer(item);
    });
  };

  addCard(element) {
    this._container.prepend(element);
  };
};