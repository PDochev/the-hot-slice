describe("Menu functionality", () => {
  it("verify that the user can increase the quantity of a pizza", () => {
    cy.visit("/menu");

    // Select the Add to cart button on the Margherita pizza , it should add 1 pizza to the cart
    cy.get("button").first().should("have.text", "Add to cart");
    // Add one Margherita pizza to the cart
    cy.get("button").first().click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 1 pizza
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    // Check if the first pizza has the correct price in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 2 pizzas
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "2 pizzas"
    );

    // Check if the total price is correct in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€24.00"
    );
  });

  it("Verify that the user can decrease the quantity of a pizza", () => {
    cy.visit("/menu");

    // Select the Add to cart button on the Margherita pizza , it should add 1 pizza to the cart
    cy.get("button").first().should("have.text", "Add to cart");
    // Add one Margherita pizza to the cart
    cy.get("button").first().click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 1 pizza
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    // Check if the first pizza has the correct price in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "2 pizzas"
    );
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€24.00"
    );

    // Remove one Margherita pizza from the cart
    cy.get("button").contains("-").click();

    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€12.00"
    );
  });

  it("if the user press '-' button when the quantity is 1 the pizza should be removed from the cart", () => {
    cy.visit("/menu");

    // Select the Add to cart button on the Margherita pizza , it should add 1 pizza to the cart
    cy.get("button").first().should("have.text", "Add to cart");
    // Add one Margherita pizza to the cart
    cy.get("button").first().click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 1 pizza
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    // Check if the first pizza has the correct price in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€12.00"
    );

    // Remove one Margherita pizza from the cart (quantity is 1)
    cy.get("button").contains("-").click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 0 pizzas, thus the cart overview should not be displayed
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "not.exist"
    );
    cy.get('[data-testid="totalPriceCartOverview"]').should("not.exist");
    cy.get('[data-testid="openCartBtn"]').should("not.exist");
  });

  it("if the user press on the delete button should remove the pizza from the cart", () => {
    cy.visit("/menu");

    // Select the Add to cart button on the Margherita pizza , it should add 1 pizza to the cart
    cy.get("button").first().should("have.text", "Add to cart");
    // Add one Margherita pizza to the cart
    cy.get("button").first().click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 1 pizza
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    // Check if the first pizza has the correct price in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 2 pizzas
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "2 pizzas"
    );

    // Check if the total price is correct in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€24.00"
    );

    // Removes the pizza from the cart even if the quantity is more than 1
    cy.get("button").contains("Delete").click();

    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "not.exist"
    );
    cy.get('[data-testid="totalPriceCartOverview"]').should("not.exist");
    cy.get('[data-testid="openCartBtn"]').should("not.exist");
  });

  it("User can select more than one pizza", () => {
    cy.visit("/menu");

    // Check the price of the Margherita pizza
    cy.get('[data-testid="pizzaPriceSingle"]')
      .first()
      .should("have.text", "€12.00");

    cy.get('[data-testid="pizzaName"]')
      .first()
      .should("have.text", "Margherita");
    cy.get("button").first().should("have.text", "Add to cart");
    // Add one Margherita pizza to the cart
    cy.get("button").first().click();

    // Check the price of the Romana pizza
    cy.get('[data-testid="pizzaPriceSingle"]')
      .eq(1)
      .should("have.text", "€15.00");

    cy.get("li button").eq(3).should("have.text", "Add to cart");

    // Add one Romana pizza to the cart

    cy.get("li button").eq(3).click();

    // Check if the quantity of the pizzas is displayed in the cart overview. Should be 2 pizza
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "2 pizzas"
    );

    // Check if the total price is correct in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€27.00"
    );
  });
});
