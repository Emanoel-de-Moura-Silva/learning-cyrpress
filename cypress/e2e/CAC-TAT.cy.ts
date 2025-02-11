import { delay } from "cypress/types/bluebird";

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
    cy.get("#title").should("contain", "CAC TAT");
  });
  it("exibe mensagem de erro ao submeter o formulário com um email com formação inválida", () => {
    cy.get("#firstName").should("exist").should("be.visible").type("Manel");
    cy.get("#lastName")
      .should("exist")
      .should("be.visible")
      .type("Moura Silva");
    cy.get("#email")
      .should("exist")
      .should("be.visible")
      .type("toma esse erro nos peito");
    cy.get("#phone").should("exist").should("be.visible").type("teste");
    cy.get("#phone-checkbox").click();
    cy.get('button[type="submit"]').click();

    cy.get(".error").should("be.visible");
  });
  it("limpar os campos ", () => {
    cy.get("#firstName").type("Manel");
    cy.get("#lastName").type("Moura Silva");
    cy.get("#email").type("toma@gmail.com");
    cy.get("#phone").type("123165");
    cy.get("#open-text-area").type("exemplo2");

    cy.get("#firstName").clear().should("have.value", "");
    cy.get("#lastName").clear().should("have.value", "");
    cy.get("#phone").clear().should("have.value", "");
    cy.get("#open-text-area").clear().should("have.value", "");
  });
});
