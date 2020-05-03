function getTemplate(file: string) {
  return fetch(file)
    .then(response => response.text())
    .then(response => {
      const content = new DOMParser().parseFromString(response, 'text/html');
      return content.querySelector('template');
    });
}

export default getTemplate;
