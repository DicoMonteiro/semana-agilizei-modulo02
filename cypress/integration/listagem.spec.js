/// <reference types="cypress" />

context('Listagem', () => {
    it('Listagem sem registros', () => {
        // Rotas
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-empty'
        }).as('getNewtable')

        cy.visit('/WebTable.html');

        cy.get('div[role=row]').should('have.length', 1)
    });

    it('Listagem com um registro', () => {
        // Rotas
        cy.server();
        cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fixtures:webtable-get-unique'
        }).as('getNewtable')

        cy.visit('/WebTable.html');

        // Interagindo com uma lista ou table
        cy.get('div[role=row] div[role=gridcell]').first();
        cy.get('div[role=row] div[role=gridcell]').eq(4)
            .find('div').as('gridCellPhone')
        cy.get('@gridCellPhone').should('contain.text', '3129876543')

        // 1 -> .first()
        // 2
        // 3
        // 4 -> .eq()
        // 5 -> .last()
        
    });
});