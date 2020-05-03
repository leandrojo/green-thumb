import getTemplate from '../../common/getTemplate';

import './Header.scss';

export default customElements.define('partial-header', class extends HTMLElement {
  constructor () {
    super();
  }

  connectedCallback() {
    getTemplate('./partials/header.html').then((response) => {
      if (response === null) return;

      this.appendChild(response.content.cloneNode(true));
    });
  }
});
