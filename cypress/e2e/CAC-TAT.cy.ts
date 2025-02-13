import { delay } from "cypress/types/bluebird";
import { contains, timers } from "cypress/types/jquery";

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

    cy.contains("button", "Enviar").click();
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
  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.fillMandatoryFieldsAndSubmit();

    cy.get("select").select("Blog");
    cy.get("select").select("Cursos");
    cy.get("select").select("youtube");
    cy.get("select").select(3);

    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });
  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("youtube").should("have.value", "youtube");
  });
  it("seleciona um produto (Blog) por seu índice", () => {
    cy.get("select").select(1).should("have.value", "blog");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"][value="elogio"]', { timeout: 10000 })
      .check()
      .should("be.checked");
  });
  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
  });
});
