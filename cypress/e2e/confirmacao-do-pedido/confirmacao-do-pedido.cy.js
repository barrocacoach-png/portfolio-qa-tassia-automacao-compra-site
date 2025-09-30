describe('Confirmação do pedido', () => {
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
        // Preencher os dados pessoais e de endereço para avançar até a página de resumo do pedido
        cy.checkoutWithPersonalData('Teste', 'Compra', '12345678');
    })

    // ------------------------------------------------------
    //Exibindo mensagem de confirmação de compra
    // ------------------------------------------------------

    it('Deve redirecionar o usuário para página de exibição da confirmação de compra', () => {
        cy.get('[data-test="finish"]').should('be.visible').click();
        // Asserção: verificar se o usuário foi redirecionado para a página de conclusão do chechout
        cy.url().should('include', '/checkout-complete.html');
        // Asserção: verificar se a mensagem de confirmação de compra é exibida
        cy.get('[data-test="complete-header"]').should('be.visible').and('contain', 'Thank you for your order!');
    });
})

