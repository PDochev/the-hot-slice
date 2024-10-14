describe("Search Order functionality", () => {
  it("should display an error message if the user type an incorrect order number", () => {
    cy.visit("/");

    // Check if the search input exists and has the correct placeholder
    cy.get('[data-testid="searchOrderInput"]').should("exist");
    cy.get('[data-testid="searchOrderInput"]').should(
      "have.attr",
      "placeholder",
      "Search order #"
    );

    // Type incorrect order number in the search input
    cy.get('[data-testid="searchOrderInput"]').type("123");
    cy.get('[data-testid="searchOrderInput"]').type("{enter}");

    // Check if the error message is displayed
    cy.contains("Something went wrong").should("exist");
    cy.contains("Couldn't find order #123").should("exist");

    cy.get("button").should("have.text", "← Go back");
    cy.get("button").click();

    // Check if the user is redirected to the homepage
    cy.url().should("include", "/");
  });

  it("should display the order details when the user types a correct order number", () => {
    cy.visit("/");

    // Check if the search input exists and has the correct placeholder
    cy.get('[data-testid="searchOrderInput"]').should("exist");
    cy.get('[data-testid="searchOrderInput"]').should(
      "have.attr",
      "placeholder",
      "Search order #"
    );

    // Type incorrect order number in the search input
    cy.get('[data-testid="searchOrderInput"]').type("IIDSAT");
    cy.get('[data-testid="searchOrderInput"]').type("{enter}");

    // Check if the user is redirected to the order details page
    cy.url().should("include", "/order/IIDSAT");

    // Check if the order details are displayed
    cy.get('[data-testid="priority"]').should("have.text", "Priority");
    cy.get('[data-testid="statusOrder"]').should(
      "have.text",
      "delivered order"
    );
    cy.contains("Order should have arrived").should("exist");

    cy.get('[data-testid="orderPizza"]').should(
      "have.text",
      "2× Margherita3× Prosciutto e Rucola1× Vegetale2× Napoli2× Spinach and Mushroom"
    );
    cy.get('[data-testid="orderPrice"]').should(
      "have.text",
      "€24.00€48.00€13.00€32.00€30.00"
    );

    // Check the order summary
    cy.get('[data-testid="orderPricePizza"]').should(
      "have.text",
      "Price pizza: €147.00"
    );
    cy.get('[data-testid="priorityPrice"]').should(
      "have.text",
      "Price priority: €29.00"
    );
    cy.get('[data-testid="payOnDelivery"]').should(
      "have.text",
      "To pay on delivery: €176.00"
    );
  });
});
