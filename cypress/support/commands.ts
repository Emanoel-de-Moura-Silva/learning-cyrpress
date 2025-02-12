interface FormFields {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  text: string;
}

declare namespace Cypress {
  interface Chainable {
    fillMandatoryFieldsAndSubmit(data?: FormFields): Chainable<void>;
  }
}

Cypress.Commands.add(
  "fillMandatoryFieldsAndSubmit",
  (
    data: FormFields = {
      firstName: "Manel",
      lastName: "Moura Silva",
      email: "manel@gmail.com",
      phone: 892173,
      text: "teste5",
    }
  ) => {
    cy.get("#firstName").type(data.firstName);
    cy.get("#lastName").type(data.lastName);
    cy.get("#email").type(data.email);
    cy.get("#phone").type(data.phone.toString());
    cy.get("#open-text-area").type(data.text);
  }
);
