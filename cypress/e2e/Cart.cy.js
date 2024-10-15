describe("Cart functionality", () => {
  it("should display a message that the cart is empty if accessed directly", () => {
    cy.visit("/cart");
    cy.contains("Your cart is still empty. Start adding some pizzas :)").should(
      "exist"
    );
    cy.contains("Back").should("exist");
    cy.contains("Back").should("have.text", "← Back to menu");

    cy.contains("Back").should("have.text", "← Back to menu").click();
    cy.url().should("include", "/menu");
  });

  it("Verify that the user can back to the menu page from the cart page by clicking on the Back to menu button", () => {
    cy.visit("/menu");
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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    // Check if the button leads to the correct page , the cart page
    cy.url().should("include", "/cart");

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    cy.contains("Back to menu").should("exist");
    cy.contains("Back to menu").should("exist").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");

    // Check if the pizza is still displayed in the cart overview
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    // Check if the first pizza has the correct price in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€12.00"
    );
  });

  it("verify that the user can increase the quantity of a pizza from the cart page", () => {
    cy.visit("/menu");
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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    // Check if the button leads to the correct page , the cart page
    cy.url().should("include", "/cart");

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "2× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€24.00"
    );
  });

  it("verify that the user can decrease the quantity of a pizza from the cart page", () => {
    cy.visit("/menu");

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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    // Check if the button leads to the correct page , the cart page
    cy.url().should("include", "/cart");

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "2× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€24.00"
    );

    // Decrease the quantity of the pizza by 1
    cy.get("button").contains("-").click();
    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );
  });

  it("if the user press '-' button when the quantity is 1 the pizza should be removed from the cart and the user will be prompted to go back to the menu", () => {
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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    // Check if the button leads to the correct page , the cart page
    cy.url().should("include", "/cart");

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Decrease the quantity of the pizza by 1
    cy.get("button").contains("-").click();

    // Check if the cart is empty
    cy.contains("Your cart is still empty. Start adding some pizzas :)").should(
      "exist"
    );
    cy.contains("Back").should("exist");
    cy.contains("Back").should("have.text", "← Back to menu");
    cy.contains("Back").should("have.text", "← Back to menu").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
  });

  it("if the user press on the delete button should remove the pizza from the cart and prompted to go back to the menu", () => {
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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    // Check if the button leads to the correct page , the cart page
    cy.url().should("include", "/cart");

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "2× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€24.00"
    );

    // Press the delete button
    cy.get("button").contains("Delete").click();

    // Check if the cart is empty
    cy.contains("Your cart is still empty. Start adding some pizzas :)").should(
      "exist"
    );
    cy.contains("Back").should("exist");
    cy.contains("Back").should("have.text", "← Back to menu");

    cy.contains("Back").should("have.text", "← Back to menu").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
  });

  it("Verify the clear cart button functionality", () => {
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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    // Check if the button leads to the correct page , the cart page
    cy.url().should("include", "/cart");

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Add one more Margherita pizza to the cart
    cy.get("button").contains("+").click();

    cy.get('[data-testid="pizzasInCart"]').should("have.text", "2× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€24.00"
    );

    // Press the clear cart button
    cy.get("button").contains("Clear").click();

    // Check if the cart is empty
    cy.contains("Your cart is still empty. Start adding some pizzas :)").should(
      "exist"
    );
    cy.contains("Back").should("exist");
    cy.contains("Back").should("have.text", "← Back to menu");

    cy.contains("Back").should("have.text", "← Back to menu").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
  });

  it("Verify the clear cart button clear all pizzas from the cart", () => {
    cy.visit("/menu");

    cy.get("button").first().should("have.text", "Add to cart");
    // Add one Margherita pizza to the cart
    cy.get("button").first().click();

    cy.get("li button").eq(3).should("have.text", "Add to cart");

    // Add one Romana pizza to the cart

    cy.get("li button").eq(3).click();

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    cy.get('[data-testid="pizzasInCart"]').should(
      "have.text",
      "1× Margherita1× Romana"
    );
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00€15.00"
    );

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 2 pizzas
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "2 pizzas"
    );

    // Check if the total price is correct in the Cart Overview
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€27.00"
    );

    // Press the clear cart button
    cy.get("button").contains("Clear").click();

    // Check that the cart overview is empty, not pizzas in the cart
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "not.exist"
    );

    // Check that the cart overview is empty, not total price in the cart
    cy.get('[data-testid="totalPriceCartOverview"]').should("not.exist");

    // Check if the cart is empty
    cy.contains("Your cart is still empty. Start adding some pizzas :)").should(
      "exist"
    );
    cy.contains("Back").should("exist");
    cy.contains("Back").should("have.text", "← Back to menu");

    cy.contains("Back").should("have.text", "← Back to menu").click();

    // Check if the user is redirected to the menu page
    cy.url().should("include", "/menu");
  });

  it("Verify that pressing on the delete button deletes only the selected pizza", () => {
    cy.visit("/menu");

    // Check the price of the Margherita pizza
    cy.get('[data-testid="pizzaPriceSingle"]')
      .first()
      .should("have.text", "€12.00");

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

    // Check if the button has the correct text
    cy.get('[data-testid="openCartBtn"]').should("have.text", "Open cart →");
    // Click on the button that opens the cart
    cy.get('[data-testid="openCartBtn"]').click();

    //  Check that there are 2 pizzas in the cart
    cy.get('[data-testid="pizzasInCart"]').should(
      "have.text",
      "1× Margherita1× Romana"
    );
    // Check that there are 2 prices in the cart
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00€15.00"
    );

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 2 pizzas
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "2 pizzas"
    );

    // Check if the total price is correct in the Cart Overview , 12€ + 15€ = 27€
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€27.00"
    );

    // Delete Margherita pizza from the cart
    cy.get("button").contains("Delete").click();

    // Check if the Romana pizza is still in the cart
    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Romana");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€15.00"
    );

    // Check that the Margherita pizza is not in the cart
    cy.get('[data-testid="pizzasInCart"]').should(
      "not.have.text",
      "1× Margherita"
    );
    // Check that the price of the Margherita pizza is not displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "not.have.text",
      "€12.00"
    );

    // Check if the quantity of the pizza is displayed in the cart overview. Should be 1 pizzas
    cy.get('[data-testid="quantityOfPizzasInTheCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    // Check if the total price is correct in the Cart Overview. Should be 15€ , the price of the Romana pizza
    cy.get('[data-testid="totalPriceCartOverview"]').should(
      "have.text",
      "€15.00"
    );
  });
});
