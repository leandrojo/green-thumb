import getTemplate from '../../common/getTemplate';
import store from '../../store';

import './Form.scss';

export default customElements.define('partial-form', class extends HTMLElement {
  constructor () {
    super();
  }

  connectedCallback() {
    getTemplate('./partials/form.html').then((response) => {
      if (response === null) return;

      this.appendChild(response.content.cloneNode(true));
      this.handleChange();
    });
  }

  handleChange() {
    const fields = this.querySelectorAll('select');

    Array.from(fields).map((e: HTMLSelectElement) => {
      e.addEventListener('change', () => {
        store.dispatch({
          type: 'plants/fetch',
          params: {
            [e.name]: e.value
          }
        });
      });
    });
  }
});
