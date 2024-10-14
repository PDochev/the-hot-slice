describe("Homepage", () => {
  it("should display all the elements on the homepage", () => {
    cy.visit("/");

    cy.contains("The Hot Slice Co.").should("exist");
    cy.contains("The Hot Slice Co.").click();
    cy.url().should("include", "/");

    cy.get("img").should("have.attr", "src", "/logo.png");
    cy.get("img").should("have.attr", "alt", "The Hot Slice Co.");

    cy.get('[data-testid="searchOrderInput"]').should("exist");
    cy.get('[data-testid="searchOrderInput"]').should(
      "have.attr",
      "placeholder",
      "Search order #"
    );

    cy.get("h1").should("contain", "The best pizza.");
    cy.contains("Straight out of the oven, straight to you.").should("exist");

    cy.get('[data-testid="username-input"]').should("exist");
    cy.get('[data-testid="username-input"]').type("John Doe");
    cy.should("have.value", "John Doe");

    cy.get("button").should("have.text", "Start ordering");
    cy.get("button").click();

    cy.url().should("include", "/menu");

    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");

    cy.contains("The Hot Slice Co.").click();
    cy.url().should("include", "/");

    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");

    cy.contains("Continue").should("exist");
    cy.contains("Continue").should("have.text", "Continue ordering, John Doe");

    cy.contains("Continue").click();
    cy.url().should("include", "/menu");
  });
});
