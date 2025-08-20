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
  const maxRetries = 5;
  const delayMs = 1000;

  const deleteRequestInternal = (url, attempt) => {
    return cy.request({
      method: 'DELETE',
      url: url,
      failOnStatusCode: false  
    })
     .then((response) => {
        if (response.status === 200) {
          return response;
        } else {
          if (attempt < maxRetries) {
            cy.wait(delayMs);
            return deleteRequestInternal(url, attempt + 1);
          } else {
            return response;
          }
        }
      });
  };

  return deleteRequestInternal(url, 1);
});
