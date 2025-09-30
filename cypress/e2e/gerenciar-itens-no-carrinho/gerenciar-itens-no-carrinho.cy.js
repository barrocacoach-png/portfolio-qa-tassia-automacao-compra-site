describe('Gerenciando carrinho', () => {
    //1. DADOS DE TESTE (lista de IDs)
    const IDS_DOS_PRODUTOS = [
        'sauce-labs-backpack',
        'sauce-labs-bike-light',
        'sauce-labs-bolt-t-shirt',
        'sauce-labs-fleece-jacket',
        'sauce-labs-onesie',
        'test.allthethings()-t-shirt-(red)'
    ];

    //2.CONSTANTES (Seletores dos botões principais)
    const ADD_BUTTON = '[data-test="add-to-cart-sauce-labs-backpack"]';
    const REMOVE_BUTTON = '[data-test="remove-sauce-labs-backpack"]';
    const BADGE_SELECTOR = '[data-test="shopping-cart-badge"]';
    const CART_LINK = '[data-test="shopping-cart-link"]';
    const ITENS_ADICIONADOS_COUNT = 3;

    beforeEach(() => {
        cy.visit('https://www.saucedemo.com/');
        // A asserção verifica se o container do login está visível
        cy.get('[data-test="login-container"]').should('be.visible');

        cy.get('[data-test="username"]').type('standard_user');
        cy.get('[data-test="password"]').type('secret_sauce');
        cy.get('[data-test="login-button"]').click();

        // Asserção: verificar se o usuário foi redirecionado para a página de produtos
        cy.url().should('include', '/inventory.html');
    })

    // ------------------------------------------------------
    //Visualizando itens não adicionados ao carrinho a partir da página de produtos
    // ------------------------------------------------------

    it('Deve exibir o botão "Add to cart" em todos os produtos como condição inicial', () => {
        // 1. Pega todos os botões que têm o atributo 'add-to-cart'
        // (Usando uma busca que olha para todos os botões de adição)
        cy.get('button[id^="add-to-cart"]').each(($btn) => {
            // 2. Verifica se o botão está visível e contém o texto 'Add to cart'
            cy.wrap($btn).should('be.visible').and('contain', 'Add to cart');
        });
    });

    // ------------------------------------------------------
    //Visualizando itens adicionados ao carrinho a partir da página de produtos
    // ------------------------------------------------------

    //Executa adicionar/remover para todos os produtos da lista
    //Lógica de remoção inclusa para maior cobertura do teste
    IDS_DOS_PRODUTOS.forEach(produtoId => {
        it(`Deve validar o ciclo Add/Remove para o produto: ${produtoId}`, () => {
            // Cria seletores dinâmicos para o produto atual da iteração
            const ADD_SELECTOR = `[data-test="add-to-cart-${produtoId}"]`;
            const REMOVE_SELECTOR = `[data-test="remove-${produtoId}"]`;

            // Adicionar o item ao carrinho
            cy.get(ADD_SELECTOR).click();

            // Asserção: Confirma que o estado mudou para "Remove"
            cy.get(REMOVE_SELECTOR).should('be.visible').and('contain', 'Remove');

            // Remove o item do carrinho
            cy.get(REMOVE_SELECTOR).click();

            // Asserção: Confirma que o estado voltou para "Add to cart"
            cy.get(ADD_SELECTOR).should('be.visible').and('contain', 'Add to cart');
        });
    });

    // ------------------------------------------------------
    //Somando produtos ao carrinho a partir da página de produtos (teste de contador - ícone)
    // ------------------------------------------------------

    it('Deve adicionar um item e aumentar o contador do carrinho de 0 para 1', () => {
        // Pré-condição: O badge não deve estar visível (0 itens)
        cy.get(BADGE_SELECTOR).should('not.exist');

        // Adicionar o item
        cy.get(ADD_BUTTON).click();

        // Asserção: O badge deve aparecer e mostrar o número '1'
        cy.get(BADGE_SELECTOR).should('be.visible').and('contain', '1');
    });

    // ------------------------------------------------------
    //Subtraindo produtos do carrinho a partir da página de produtos (teste de contador - ícone)
    // ------------------------------------------------------
    //Lógica de reexibição do botão ADD para maior cobertura do teste

    it('Deve remover um item e fazer o contador voltar de 1 para 0', () => {
        // Setup: Adiciona um item para que haja algo para remover
        cy.get(ADD_BUTTON).click();
        cy.get(BADGE_SELECTOR).should('contain', '1');

        // Ação: Remover o item
        cy.get(REMOVE_BUTTON).click();

        // Asserção: O badge deve desaparecer (contagem volta a zero)
        cy.get(BADGE_SELECTOR).should('not.exist');

        // Opcional: Verifica se o botão de ADD apareceu novamente
        cy.get(ADD_BUTTON).should('be.visible');
    });

    // ------------------------------------------------------
    //Visualizando itens no carrinho (página de carrinho - teste de conteúdo)
    // ------------------------------------------------------

    it('Deve adicionar um subconjunto de itens e validar seu conteúdo no carrinho', () => {
        // Array para armazenar os dados dos itens que VAMOS ADICIONAR
        const itensAdicionados = [];

        // Adiciona os primeiros 3 produtos ao carrinho e armazena nome/preço
        cy.get('.inventory_item').each(($item, index, $list) => {
            if (index < ITENS_ADICIONADOS_COUNT) {
                const nome = $item.find('.inventory_item_name').text();
                const preco = $item.find('.inventory_item_price').text();
                itensAdicionados.push({ name: nome, price: preco });
                cy.wrap($item).contains('Add to cart').click();
            }
        }).then(() => {
            // Navega para o carrinho APÓS a conclusão da adição
            cy.get(CART_LINK).click();
            // Asserção: Verifica se a quantidade de itens no carrinho é 3
            cy.get('.cart_item').should('have.length', itensAdicionados.length);
            // Asserção: Valida se cada item exibido no carrinho é um item adicionado
            cy.get('.inventory_item_name').each(($nomeExibido, idx) => {
                const nomeEsperado = itensAdicionados[idx].name;
                expect($nomeExibido.text()).to.equal(nomeEsperado);
            });
        });
    });

    // === BLOCO ANINHADO PARA TESTES QUE COMEÇAM NO CARRINHO ===
    describe('Suíte de Navegação e Remoção no Carrinho (Start: Cart Page)', () => {

        beforeEach(() => {
            // Adiciona os primeiros 3 produtos ao carrinho
            cy.get('.inventory_item').each(($item, index) => {
                if (index < ITENS_ADICIONADOS_COUNT) {
                    cy.wrap($item).contains('Add to cart').click();
                }
            });
            // Navega para o carrinho
            cy.get(CART_LINK).click();
            cy.url().should('include', '/cart.html');
        });

        // ------------------------------------------------------
        // Adicionando produtos a partir do carrinho (usa o setup do beforeEach aninhado)
        // ------------------------------------------------------
        it('Deve redirecionar o usuário para a página de produtos...', () => {
            cy.get('[data-test="continue-shopping"]').click();
            cy.url().should('include', '/inventory.html');
        });

        // ------------------------------------------------------
        // Removendo produtos a partir do carrinho (usa o setup do beforeEach aninhado)
        // ------------------------------------------------------
        it('Deve garantir que todos os itens são removíveis e a lista esvazia', () => {
            // Ação: Itera para remover todos os itens sequencialmente
            for (let i = 0; i < ITENS_ADICIONADOS_COUNT; i++) {
                // Clica no primeiro botão de remover que encontrar (a lista se reordena)
                cy.get('[data-test^="remove-"]').first().click();
            }

            // ASSERÇÃO 1: Verifica se o contêiner de itens do carrinho sumiu ou está vazio.
            // Esta é a prova de que a lista está vazia.
            cy.get('.cart_item').should('not.exist');

            // ASSERÇÃO 2: Verifica se o badge (o número no ícone) desapareceu.
            cy.get(CART_LINK).find(BADGE_SELECTOR).should('not.exist');
        });
    });
}) 