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
    cy.clock();
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
    cy.get("#phone-checkbox").check();

    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
    cy.tick(3000);
    cy.get(".error").should("not.be.visible");
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
    cy.clock();

    cy.fillMandatoryFieldsAndSubmit();

    cy.get("select").select("Blog");
    cy.get("select").select("Cursos");
    cy.get("select").select("youtube");
    cy.get("select").select(3);

    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
    cy.tick(3000);
    cy.get(".success").should("not.be.visible");
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
  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').each((typeOfService) => {
      cy.wrap(typeOfService).check().should("be.checked");
    });
    cy.get('input[type="checkbox"]').last().uncheck().should("not.be.checked");
    cy.wait(2000);
    cy.get('input[type="checkbox"]').each((typeOfService) => {
      cy.wrap(typeOfService).uncheck().should("not.be.checked");
    });
  });
  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json")
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;
        expect(input.files?.[0].name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("#file-upload")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should("have.prop", "files")
      .then(($input) => {
        const files = $input[0] as HTMLInputElement;
        expect(files.name).to.equal("example.json");
      });
  });
  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("simpleFile");
    cy.get("#file-upload")
      .selectFile("@simpleFile")
      .should(($input) => {
        const input = $input[0] as HTMLInputElement;
        expect(input.files?.[0].name).to.equal("example.json");
      });
  });
  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.contains("a", "Política de Privacidade")
      .should("have.attr", "href", "privacy.html")
      .and("have.attr", "target", "_blank");
  });
  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.contains("a", "Política de Privacidade")
      .invoke("removeAttr", "target")
      .click();
    /*    .should("not.have.attr", "target"); */
    cy.contains("h1", "CAC TAT - Política de Privacidade").should("be.visible");
  });
  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });
  it("preenchi com invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "Um Exemplo de TExto")
      .should("have.value", "Um Exemplo de TExto");
  });
  it("faz uma requisição HTTP", () => {
    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);
    cy.get("@getRequest").its("statusText").should("be.equal", "OK");
  });
  it.only("Invoca o CAT", () => {
    cy.get("#cat").invoke("show").should("be.visible");
    cy.get("#title").invoke("text", "CAT TAT");
  });
});
