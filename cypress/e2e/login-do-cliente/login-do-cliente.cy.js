describe('Página de login', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    // A asserção verifica se o container do login está visível
    cy.get('[data-test="login-container"]').should('be.visible');
  })

  // ------------------------------------------------------
  //Login com usuário e senha válidos
  // ------------------------------------------------------

  it('Deve preencher os campos de usuário e senha corretamente e autenticar o usuário no site', () => {

    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Asserção: verificar se o usuário foi redirecionado para a página de produtos
    cy.url().should('include', '/inventory.html');
  })

  // ------------------------------------------------------
  //Login sem usuário e com senha válida
  // ------------------------------------------------------

  it('Deve preencher o campo de senha corretamente e deixar o de usuário vazio; o usuário não deve ser autenticado no site', () => {

    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Asserção: verificar se a mensagem de erro é exibida
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Username is required');
  })

  // ------------------------------------------------------
  //Login com usuário e sem senha
  // ------------------------------------------------------

  it('Deve preencher o campo de usuário corretamente e deixar o de senha vazio; o usuário não deve ser autenticado no site', () => {

    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="login-button"]').click();

    // Asserção: verificar se a mensagem de erro é exibida
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Password is required');
  })

  // ------------------------------------------------------
  //Login com usuário bloqueado
  // ------------------------------------------------------

  it('Deve preencher o campo de usuário com usuário bloqueado e senha válida; o usuário não deve ser autenticado no site', () => {

    cy.get('[data-test="username"]').type('locked_out_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // Asserção: verificar se a mensagem de erro é exibida
    cy.get('[data-test="error"]').should('be.visible').and('contain', 'Epic sadface: Sorry, this user has been locked out.');
  })

})
