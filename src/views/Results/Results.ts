import getTemplate from '../../common/getTemplate';
import store from '../../store';
import { Plant, Sunlight, WaterSymbol } from '../../services/plants';

import './Results.scss';
import './components/Item.scss';

class Results extends HTMLElement {
  static renderIsPoisonousIcon(toxicity: Plant['toxicity']) {
    return `
      <img
        class="item--icon"
        alt="${toxicity ? 'It\'s poisonous' : 'It\'s not poisonous' }"
        src="/assets/icons/types/${toxicity ? 'Toxic' : 'Pet'}.svg"
      />
    `;
  }

  static renderSunlightIcon(sun: Plant['sun']) {
    return `
      <img
        class="item--icon"
        alt="Amount ${sun === 'no' ? 'no sunlight' : `sunlight ${sun}`}"
        src="/assets/icons/types/${Sunlight[sun]}Sun.svg"
      />
    `;
  }

  static renderWaterIcon(water: Plant['water']) {
    return `
      <img
        class="item--icon"
        alt="Amount ${water} water"
        src="/assets/icons/types/${WaterSymbol[water]}.svg"
      />
    `;
  }

  static renderItem({ name, price, sun, toxicity, url, water } : Plant) {
    return `
      <section class="item">
        <img alt="plant image" src="${url}" />
        <span class="item--name">${name}</span>
        <div class="item--meta">
          <span class="item--price">$${price}</span>
          <div class="item--icons">
            ${Results.renderIsPoisonousIcon(toxicity)}
            ${Results.renderSunlightIcon(sun)}
            ${Results.renderWaterIcon(water)}
          </div>
        </div>
      </section>
    `;
  }

  constructor () {
    super();
  }

  items = [];

  connectedCallback() {
    getTemplate('./partials/no-results.html').then((response) => {
      if (response === null) return;
      this.appendChild(response.content.cloneNode(true));
    });

    store.subscribe(() => {
      const { type, items } = store.getState().plants;

      this.items = items;

      if (type === 'plants/fetchSuccess') this.render();
    });
  }

  renderResults() {
    getTemplate('./partials/results.html').then((response) => {
      if (response === null) return;
      this.replaceWith(response.content.cloneNode(true));
      const wrapper = document.querySelector('.results--content');

      if (wrapper !== null) this.renderItems(wrapper);
    });
  }

  renderItems(parent: Element) {
    parent.innerHTML = this
      .items
      .reduce((memo, item) => memo + Results.renderItem(item), '');
  }

  render() {
    const parent = document.querySelector('.results--content');

    if (parent === null) {
      this.renderResults()
      return;
    }

    this.renderItems(parent);
  }
};

export default customElements.define('partial-results', Results);