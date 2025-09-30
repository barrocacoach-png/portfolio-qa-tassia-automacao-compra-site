describe('Finalizando a compra', () => {
    // Constantes utilizadas nos testes
    const CART_LINK = '[data-test="shopping-cart-link"]';
    const ITENS_ADICIONADOS_COUNT = 3;
    const CHECKOUT_BUTTON = '[data-test="checkout"]';
    const FIRST_NAME_INPUT = '[data-test="firstName"]';
    const LAST_NAME_INPUT = '[data-test="lastName"]';
    const POSTAL_CODE_INPUT = '[data-test="postalCode"]';
    const CONTINUE_BUTTON = '[data-test="continue"]';


    beforeEach(() => {
        cy.login();
        cy.addItemsToCart(ITENS_ADICIONADOS_COUNT);
        cy.get(CART_LINK).click();
        // Asserção: verificar se o usuário foi redirecionado para a página do carrinho
        cy.url().should('include', '/cart.html');
    })

    // ------------------------------------------------------
    //Exibindo página de inclusão de dados para confirmação de compra
    // ------------------------------------------------------

    it('Deve redirecionar o usuário para página de inclusão de dados pessoais e endereço', () => {
    cy.get('[data-test="checkout"]').should('be.visible').click();
        // Asserção: verificar se o usuário foi redirecionado para a página de inclusão de dados
        cy.url().should('include', '/checkout-step-one.html');
    });

    // ------------------------------------------------------
    //Exibindo resumo do pedido
    // ------------------------------------------------------

    it('Deve redirecionar o usuário para página com o resumo do pedido', () => {
    cy.get('[data-test="checkout"]').should('be.visible').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('Teste');
    cy.get('[data-test="lastName"]').type('Compra');
    cy.get('[data-test="postalCode"]').type('12345678');
    cy.get(CONTINUE_BUTTON).click();

        // Asserção: verificar se o usuário foi redirecionado para a página de resumo do pedido
        cy.url().should('include', '/checkout-step-two.html');
    });

})