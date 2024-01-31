// CAC-TAT.spec.js created with Cypress
//Usando o visit para visitar a pagina e o title para ver se o titulo esta correto
describe('Central de Atendimento ao Cliente TAT', function(){
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it ('verifica o título da aplicação', function(){
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('preencha os campos obrigatórios e envia o formuário', function() {
        const longText = 'teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste,teste' 
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('bruna@exemplo.com')
        cy.get('#open-text-area').type(longText, {delay: 0 })
        cy.get('button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })

    it('exibe mensagem de erro ao submeter o fomulário com um email com formatação', function(){
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('bruna@exemplo,com')
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor não-numérico', function() {
        cy.get('#phone')
          .type('abcdefghij')
          .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function() {
        cy.get('#firstName').type('Bruna')
        cy.get('#lastName').type('Alves')
        cy.get('#email').type('bruna@exemplo.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')

    })

    it('preenche e limpa os campos nome, sobrenome email e telefone', function() {
        cy.get('#firstName')
          .type('Bruna')
          .should('have.value', 'Bruna')
          .clear()
          .should('have.value', '')
        cy.get('#lastName')
          .type('Alves')
          .should('have.value', 'Alves')
          .clear()
          .should('have.value', '')
        cy.get('#email')
          .type('bruna@exemplo.com')
          .should('have.value', 'bruna@exemplo.com')
          .clear()
          .should('have.value', '')
        cy.get('#open-text-area')
          .type('teste')
          .should('have.value', 'teste')
          .clear()

    })

    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulario com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible')
    })

    it('seleciona um produto (youtube) por seu texto', function() {
        cy.get('#product')
           .select('YouTube')
           .should('have.value', 'youtube')
    })

    it('selecione um produto (Mentoria) por seu valor (value)', function() {
        cy.get('#product')
          .select('mentoria')
          .should('have.value', 'mentoria')
    })
     it('selecione um produto (Blog) a partir do seu indice', function() {
        cy.get('#product')
          .select(1)
          .should('have.value', 'blog')
     })

     it('marca o tipo de atendimento "Feedback" ', function() {
        cy.get('input[type="radio"] [value="feedback"]')
          .check()
          .should('have.value', 'feedback')
     })
     it('marca cada tipo de atendimento', function() {
        cy.get('input[type="radio"]')
          .should('have.length',3)
          .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
          })
     })

     it('marcar ambos checkboxes, depois desmarca o último', function() {
        cy.get('input[type="checkbox"]')
          .check()
          .should('be.checked')
          .last()
          .uncheck()
          .should('not.be.checked')
     })

     it('seleciona um arquivo da pasta fixtures', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it('seleciona um arquivo simulando um drag-and-drop(arrasta e solta)', function() {
      cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
     })

     it.only('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
      cy.fixture('example.json').as('sampleFile')
      cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input) {
          expect($input[0].files[0].name).to.equal('example.json')
        })
     })

})
