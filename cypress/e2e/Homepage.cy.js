describe("Homepage", () => {
  it("should display all the elements on the homepage", () => {
    cy.visit("/");

    // Check if the title exists and has the correct text
    cy.contains("The Hot Slice Co.").should("exist");
    // Check if the logo exists and has the correct src and alt
    cy.get("img").should("have.attr", "src", "/logo.png");
    cy.get("img").should("have.attr", "alt", "The Hot Slice Co.");

    // Check if the search input exists and has the correct placeholder
    cy.get('[data-testid="searchOrderInput"]').should("exist");
    cy.get('[data-testid="searchOrderInput"]').should(
      "have.attr",
      "placeholder",
      "Search order #"
    );

    // Check if the headings exist
    cy.get("h1").should("contain", "The best pizza.");
    cy.contains("Straight out of the oven, straight to you.").should("exist");

    // The Start Ordering button should not exist if the user has not entered a name
    cy.get("button").should("not.exist");

    // Check if the name input exist and type in the name, then check if the name input has the correct value
    cy.get('[data-testid="username-input"]').should("exist");
    cy.get('[data-testid="username-input"]').type("John Doe");
    cy.should("have.value", "John Doe");

    // Check if the Start Ordering button exists and has the correct text
    cy.get("button").should("have.text", "Start ordering");
    cy.get("button").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
  });

  it("clicking on the logo should redirect to the homepage", () => {
    cy.visit("/");
    cy.contains("The Hot Slice Co.").should("exist");
    cy.contains("The Hot Slice Co.").click();
    // Check if the user is redirected to the homepage
    cy.url().should("include", "/");
  });

  it("should redirect to the menu page when the user clicks on the start ordering button, with the username displayed in the navigation", () => {
    cy.visit("/");
    cy.get('[data-testid="username-input"]').type("John Doe");
    cy.get("button").should("have.text", "Start ordering");
    cy.get("button").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
    // Check if the username is displayed in the navigation
    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");
  });

  it("clicking on the logo from the menu page should redirect back to the home page with the username displayed in the navigation and name input replaced by a button ", () => {
    cy.visit("/");
    cy.get('[data-testid="username-input"]').type("John Doe");
    cy.get("button").should("have.text", "Start ordering");
    cy.get("button").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");

    // Check if the user is redirected to the homepage
    cy.contains("The Hot Slice Co.").click();
    cy.url().should("include", "/");

    // Check if the username is displayed in the navigation
    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");

    // Check if the name input is replaced by a button
    cy.get('[data-testid="username-input"]').should("not.exist");
    cy.contains("Continue").should("exist");
    cy.contains("Continue").should("have.text", "Continue ordering, John Doe");

    // Check if the user is redirected to the menu page
    cy.contains("Continue").click();
    cy.url().should("include", "/menu");
  });
});
