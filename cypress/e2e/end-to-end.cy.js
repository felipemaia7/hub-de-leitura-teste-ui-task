/// <reference types="cypress"/>
import { faker } from '@faker-js/faker'

describe('Testes End To End do fluxo de cadastro e login', () => {

    let nome
    let email
    let telefone
    let senha

    beforeEach(() => {

        nome = faker.person.fullName()
        email = faker.internet.email({ provider: 'teste.com' }).toLowerCase()
        telefone = faker.string.numeric(11)
        senha = `Teste@${faker.string.numeric(4)}`
    })

    it('Deve fazer o cadastro e validar o login com o usuário cadastrado', () => {
        //Acessa a página de cadastro
        cy.visit('register.html')

        //Preenche o formulário, envia e valida o cadastro
        cy.preencherCadastro(nome, email, telefone, senha, senha)
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)

        //Acessa a página de login
        cy.visit('login.html')

        //Faz login com as credenciais recém-cadastradas e valida o acesso
        cy.login(email, senha)
        cy.get('#user-name').should('contain', nome)
    })
})
