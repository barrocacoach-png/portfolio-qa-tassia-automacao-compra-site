# Automação de Testes - Processo de Compra

Este repositório contém a automação dos testes end-to-end do processo de compra de um site, utilizando Cypress. Os testes cobrem os principais fluxos do usuário, desde o login até a confirmação do pedido, seguindo os requisitos e critérios de aceitação definidos na documentação do projeto.

## Tecnologias Utilizadas

- **Cypress**: Framework de testes end-to-end para aplicações web.
- **JavaScript**: Linguagem utilizada nos scripts de teste.
- **Node.js**: Ambiente de execução para o Cypress e gerenciamento de dependências.
- **Git**: Controle de versão do projeto.
- **VS Code** (opcional): Editor recomendado para desenvolvimento e manutenção dos testes.

## Estrutura do Projeto

```
cypress/
  e2e/
    login-do-cliente/
    visualizacao-de-produtos/
    gerenciar-itens-no-carrinho/
    finalizacao-de-compra/
    confirmacao-do-pedido/
  support/
    commands.js
    e2e.js
  fixtures/
Documentação/
  US01 - Login do cliente.pdf
  US02 - Visualização de produtos.pdf
  US03 - Adicionar e gerenciar itens no carrinho.pdf
  US04 - Finalização de compra.pdf
  US05 - Confirmação do pedido.pdf
cypress.config.js
package.json
```

## Funcionalidades Testadas

- **Login do Cliente:** Validação de login válido e inválido.
- **Visualização de Produtos:** Ordenação por nome (A-Z, Z-A) e preço (maior/menor).
- **Gerenciamento de Itens no Carrinho:** Adição, remoção, visualização e atualização de itens.
- **Finalização de Compra:** Inclusão de dados pessoais, resumo do pedido e fluxo de checkout.
- **Confirmação do Pedido:** Exibição da mensagem de sucesso após finalização.

## Como Executar os Testes

1. Instale as dependências:
   ```sh
   npm install
   ```

2. Execute os testes em modo headless:
   ```sh
   npx cypress run
   ```

3. Para executar em modo interativo:
   ```sh
   npx cypress open
   ```

## Comandos Customizados

- `cy.login()`: Realiza login padrão.
- `cy.addItemsToCart(count)`: Adiciona itens ao carrinho.
- `cy.checkoutWithPersonalData(firstName, lastName, postalCode)`: Preenche dados pessoais e avança no checkout.

## Documentação

Os requisitos, regras de negócio e critérios de aceitação de cada fluxo estão detalhados nos arquivos PDF da pasta `Documentação`.

## Contribuição

Sinta-se à vontade para abrir issues ou pull requests com sugestões de melhoria, novos cenários de teste ou correções.
