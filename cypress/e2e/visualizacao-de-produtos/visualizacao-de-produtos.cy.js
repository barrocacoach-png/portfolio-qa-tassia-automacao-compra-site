describe('Página de produtos', () => {
  beforeEach(() => {
    cy.login();

    // ------------------------------------------------------
    //Ordenando produtos pelo nome de A-Z (seleção pelo valor do atributo)
    // ------------------------------------------------------

    it('Deve ordenar os produtos por nome de A a Z', () => {
      // 1. Clica no botão de filtro e seleciona a opção 'A-Z'
      cy.get('[data-test="product-sort-container"]').select('az');

      // 2. Coleta os nomes dos produtos da página e verifica a ordenação
      cy.get('.inventory_item_name').then($names => {
        // 3. Extrai o texto de cada elemento em um array
        const names = $names.map((index, el) => Cypress.$(el).text()).get();

        // 4. Cria uma cópia e ordena os nomes como se fosse o resultado esperado
        const sortedNames = [...names].sort();

        // 5. Compara se a lista da página é igual à lista ordenada
        expect(names).to.deep.equal(sortedNames);
      });
    });

    // ------------------------------------------------------
    //Ordenando produtos pelo nome de Z-A (seleção pelo valor do atributo)
    // ------------------------------------------------------

    it('Deve ordenar os produtos por nome de Z a A', () => {
      // 1. Clica no botão de filtro e seleciona a opção 'Z-A'
      cy.get('[data-test="product-sort-container"]').select('za');

      // 2. Coleta os nomes dos produtos da página e verifica a ordenação
      cy.get('.inventory_item_name').then($names => {
        // 3. Extrai o texto de cada elemento em um array
        const names = $names.map((index, el) => Cypress.$(el).text()).get();

        // 4. Cria uma cópia e ordena os nomes como se fosse o resultado esperado
        const sortedNames = [...names].sort().reverse();

        // 5. Compara se a lista da página é igual à lista ordenada
        expect(names).to.deep.equal(sortedNames);
      });
    });

    // ------------------------------------------------------
    //Ordenando produtos pelo preço, do mais barato ao mais caro (seleção pelo valor do atributo)
    // ------------------------------------------------------

    it('Deve ordenar os produtos por preço, do mais barato ao mais caro', () => {
      // 1. Clica no botão de filtro e seleciona a opção 'low to high'
      cy.get('[data-test="product-sort-container"]').select('lohi');

      // 2. Coleta os preços dos produtos da página
      cy.get('.inventory_item_price').then($prices => {
        // 3. Extrai o texto, remove o '$' e converte para número
        const prices = $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));

        // 4. Cria uma cópia e ordena os preços numericamente de forma crescente
        const sortedPrices = [...prices].sort((a, b) => a - b);

        // 5. Compara se a lista da página é igual à lista ordenada
        expect(prices).to.deep.equal(sortedPrices);
      });
    });

    // ------------------------------------------------------
    //Ordenando produtos pelo preço, do mais caro ao mais barato (seleção pelo valor do atributo)
    // ------------------------------------------------------

    it('Deve ordenar os produtos por preço, do mais caro ao mais barato', () => {
      // 1. Clica no botão de filtro e seleciona a opção 'high to low'
      cy.get('[data-test="product-sort-container"]').select('hilo');

      // 2. Coleta os preços dos produtos da página
      cy.get('.inventory_item_price').then($prices => {
        // 3. Extrai o texto, remove o '$' e converte para número
        const prices = $prices.toArray().map(el => parseFloat(el.innerText.replace('$', '')));

        // 4. Cria uma cópia e ordena os preços numericamente de forma decrescente
        const sortedPrices = [...prices].sort((a, b) => b - a);

        // 5. Compara se a lista da página é igual à lista ordenada
        expect(prices).to.deep.equal(sortedPrices);
      });
    });
  });
});
