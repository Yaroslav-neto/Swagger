Cypress.Commands.add('postRequest', (url, body) => {
    cy
      .request({
        method: 'POST',
        url: url,
        body: body
    });
});

Cypress.Commands.add('getRequest', (url) => {
  return cy.request({
    method: 'GET',
    url: url,
    failOnStatusCode: false
  });
});

Cypress.Commands.add('putRequest', (url, body) => {
    cy
      .request({
        method: 'PUT',
        url: url,
        body: body
    });
});

Cypress.Commands.add('deleteRequest', (url) => {
    cy
      .request({
        method: 'DELETE',
        url: url
    });
});

