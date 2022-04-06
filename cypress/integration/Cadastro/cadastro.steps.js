/// <reference types="cypress" />
// implementação dos passos descritos nas features
let Chance = require("chance");
let chance = new Chance();

Given(/^que acesso o site$/, () => {
  // Rotas
  cy.server();
  cy.route("POST", "**/api/1/databases/userdetails/collections/newtable?**").as(
    "postNewtable"
  );
  cy.route(
    "POST",
    "**/api/1/databases/userdetails/collections/usertable?**"
  ).as("postUsertable");
  cy.route("GET", "**/api/1/databases/userdetails/collections/newtable?**").as(
    "getNewtable"
  );

  cy.visit("/Register.html");
});

When(/^informar meus dados$/, () => {
  cy.get('input[placeholder="First Name"]').type(chance.first());
  cy.get("input[ng-model=LastName]").type(chance.last());
  cy.get('input[type="email"]').type(chance.email());
  cy.get('input[type="tel"]').type(chance.phone({ formatted: false }));

  cy.get("input[value=Male]").check();
  cy.get("input[type=checkbox]").check("Movies");
  cy.get("input[type=checkbox]").check("Hockey");

  cy.get("select#Skills").select("Android");
  cy.get("select#countries").select("Select Country");
  cy.get("select#country").select("Australia", { force: true });
  cy.get("select#yearbox").select("1984");
  cy.get("select[ng-model^=monthbox]").select("December");
  cy.get("select#daybox").select("22");

  cy.get("input#firstpassword").type("Teste@123");
  cy.get("input#secondpassword").type("Teste@123");

  cy.get("input#imagesrc").attachFile("teste.png");
});

When(/^salvar$/, () => {
  cy.get("button#submitbtn").click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
  cy.wait("@postNewtable").then((resNewtable) => {
    console.log(resNewtable.status);
    cy.log(resNewtable.status);
    expect(resNewtable.status).to.eq(200);
  });
  cy.wait("@postUsertable").then((resUsertable) => {
    console.log(resUsertable.status);
    cy.log(resUsertable.status);
    expect(resUsertable.status).to.eq(200);
  });
  cy.wait("@getNewtable").then((resNewtable) => {
    console.log(resNewtable.status);
    cy.log(resNewtable.status);
    expect(resNewtable.status).to.eq(200);
  });

  cy.url().should("contain", "WebTable");
});
