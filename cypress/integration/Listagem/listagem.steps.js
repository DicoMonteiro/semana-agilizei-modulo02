/// <reference types="cypress" />

Given(/^que o site não possui registros$/, () => {
  // Rotas
  cy.server();
  cy.route({
    method: "GET",
    url: "**/api/1/databases/userdetails/collections/newtable?**",
    status: 200,
    response: "fx:webtable-get-empty",
  }).as("getNewtable");
});

When(/^acessar a listagem$/, () => {
  cy.visit("/WebTable.html");
});

Then(/^devo visualizar a listagem vazia$/, () => {
  cy.get("div[role=row]").should("have.length", 1);
});

Given(/^que o site possui apenas um registro$/, () => {
  // Rotas
  cy.server();
  cy.route({
    method: "GET",
    url: "**/api/1/databases/userdetails/collections/newtable?**",
    status: 200,
    response: "fixtures:webtable-get-unique",
  }).as("getNewtable");
});

Then(/^deve visualizar apenas um registro$/, () => {
  cy.get("div[role=row] div[role=gridcell]").first();
  cy.get("div[role=row] div[role=gridcell]")
    .eq(4)
    .find("div")
    .as("gridCellPhone");
  cy.get("@gridCellPhone").should("contain.text", "3129876543");
});
