const url = 'https://petstore.swagger.io/v2/user';
const newUser = require('../fixtures/userConfig.json');

describe('actions with the user', () => {
  beforeEach(() => {
    let response;
    cy.postRequest(url, newUser)
      .then((ob) => {
        response = ob
        expect(response.status).eq(200)
        expect(response.body.code).eq(200)
        expect(response.body.type).eq('unknown')
        expect(response.body.message).eq(String(newUser.id));
      });
    cy.wait(15000);
  });

  afterEach(() => {
    cy.wait(5000)
    cy
      .deleteRequest(url + '/' + newUser.username)
      .then((response) => {
        expect(response.status).eq(200)
        expect(response.body.code).eq(200)
        expect(response.body.type).eq("unknown")
        expect(response.body.message).eq(newUser.username);
      });
    cy.wait(15000)
  });

  it('should create user', () => {
    cy
      .getRequest(url + '/' + newUser.username)
      .then((response) => {
        expect(response.status).eq(200)
        expect(response.body.id).eq(280)
        expect(response.body.username).eq(newUser.username)
        expect(response.body.firstName).eq(newUser.firstName)
        expect(response.body.lastName).eq(newUser.lastName)
        expect(response.body.email).eq(newUser.email)
        expect(response.body.password).eq(newUser.password)
        expect(response.body.phone).eq(newUser.phone)
        expect(response.body.userStatus).eq(newUser.userStatus);
      });
  });
  

  it('should change user name', () => {
    const newName = "Andrey";

    cy
      .putRequest(url + '/' + newName, newUser)
      .then((response) => {
        expect(response.status).eq(200)
        expect(response.body.code).eq(200)
        expect(response.body.type).eq("unknown")
        expect(response.body.message).eq(String(newUser.id));
      }).then(() => {
        cy.wait(500);

        cy
          .getRequest(url + '/' + newUser.username)
          .then((response) => {
            expect(response.status).eq(200)
            expect(response.body.id).eq(280)
            expect(response.body.username).eq(newUser.username)
            expect(response.body.firstName).eq(newUser.firstName)
            expect(response.body.lastName).eq(newUser.lastName)
            expect(response.body.email).eq(newUser.email)
            expect(response.body.password).eq(newUser.password)
            expect(response.body.phone).eq(newUser.phone)
            expect(response.body.userStatus).eq(newUser.userStatus);
        });
      });
  });
});

it('should delete user', () => {
  cy.postRequest(url, newUser)
    
      cy.wait(200);
      cy
        .deleteRequest(url + '/' + newUser.username, {failOnStatusCode: false})
        .then((response) => {
          expect(response.status).eq(200)
          expect(response.body.code).eq(200)
          expect(response.body.type).eq("unknown")
          expect(response.body.message).eq(newUser.username);
        }).then(() => {
          cy.wait(10000);

          cy
            .getRequest(url + '/' + newUser.username, {failOnStatusCode: false})
              .then((response) => {
                expect(response.status).eq(404)
                expect(response.body.code).eq(1)
                expect(response.body.type).eq('error')
                expect(response.body.message).eq('User not found');
              });
        })
        
          
        

    
});
      
  

  
    
