describe("Order functionality", () => {
  it("should display a message that the cart is empty if accessed directly", () => {
    cy.visit("/order/new");
    cy.contains("Your cart is still empty. Start adding some pizzas :)").should(
      "exist"
    );
    cy.contains("Back").should("exist");
    cy.contains("Back").should("have.text", "← Back to menu");

    cy.contains("Back").should("have.text", "← Back to menu").click();
    cy.url().should("include", "/menu");
  });

  it("Verify that all the order details are correct and the order can be placed successfully", () => {
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

    cy.contains("Order pizzas").should("have.text", "Order pizzas");
    // // Click on the button that leads to the order page
    cy.contains("Order pizzas").click();

    // Check if the user is redirected to the order page
    cy.url().should("include", "/order/new");

    // Check if the name input is displayed
    cy.get('input[name="customer"]').should("exist");
    cy.get('input[name="customer"]').should("have.value", "");
    // Type a name in the name input
    cy.get('input[name="customer"]').type("John Doe");
    cy.get('input[name="customer"]').should("have.value", "John Doe");

    // Check if the phone input is displayed
    cy.get('input[name="phone"]').should("exist");
    cy.get('input[name="phone"]').should("have.value", "");
    // Type a correct phone number
    cy.get('input[name="phone"]').type("123456789");
    cy.get('input[name="phone"]').should("have.value", "123456789");

    // Check if the address input is displayed
    cy.get('input[name="address"]').should("exist");
    cy.get('input[name="address"]').should("have.value", "");
    // Type an address in the address input
    cy.get('input[name="address"]').type("1234 Elm Street");
    cy.get('input[name="address"]').should("have.value", "1234 Elm Street");

    // Check if the get possition button is displayed
    // THE functionality of the button is not TESTED
    cy.get("button").contains("Get position").should("exist");

    // Check if the priority input is displayed
    cy.get('input[name="priority"]').should("exist");
    // Click on the priority input
    cy.get('input[name="priority"]').click();
    // Check if the priority input is checked
    cy.get('input[name="priority"]').should("have.checked", "checked");

    // Check if the order button is displayed with the priority price added
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €14.40");

    // Click on the priority input to uncheck it
    cy.get('input[name="priority"]').click();
    // Check if the priority input is unchecked
    cy.get('input[name="priority"]').should("not.have.checked", "checked");

    // Check if the order button is displayed with the normal price
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €12.00");

    // Click on the order button
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €12.00")
      .click();

    // Check if the order status is displayed , thus redirected the user to the order status page
    cy.get('[data-testid="statusOrder"]').should(
      "have.text",
      "preparing order"
    );
  });

  it("Verify that an error is shown if invalid phone number is inserted", () => {
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

    cy.contains("Order pizzas").should("have.text", "Order pizzas");
    // // Click on the button that leads to the order page
    cy.contains("Order pizzas").click();

    // Check if the user is redirected to the order page
    cy.url().should("include", "/order/new");

    // Check if the name input is displayed
    cy.get('input[name="customer"]').should("exist");
    cy.get('input[name="customer"]').should("have.value", "");
    // Type a name in the name input
    cy.get('input[name="customer"]').type("John Doe");
    cy.get('input[name="customer"]').should("have.value", "John Doe");

    // Check if the phone input is displayed
    cy.get('input[name="phone"]').should("exist");
    cy.get('input[name="phone"]').should("have.value", "");
    // Type an incorrect phone number
    cy.get('input[name="phone"]').type("abs12casdas");
    cy.get('input[name="phone"]').should("have.value", "abs12casdas");

    // Check if the address input is displayed
    cy.get('input[name="address"]').should("exist");
    cy.get('input[name="address"]').should("have.value", "");
    // Type an address in the address input
    cy.get('input[name="address"]').type("1234 Elm Street");
    cy.get('input[name="address"]').should("have.value", "1234 Elm Street");

    // Check if the get possition button is displayed
    // THE functionality of the button is not TESTED
    cy.get("button").contains("Get position").should("exist");

    // Check if the priority input is displayed
    cy.get('input[name="priority"]').should("exist");
    // Click on the priority input
    cy.get('input[name="priority"]').click();
    // Check if the priority input is checked
    cy.get('input[name="priority"]').should("have.checked", "checked");

    // Check if the order button is displayed with the priority price added
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €14.40");

    // Click on the priority input to uncheck it
    cy.get('input[name="priority"]').click();
    // Check if the priority input is unchecked
    cy.get('input[name="priority"]').should("not.have.checked", "checked");

    // Check if the order button is displayed with the normal price
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €12.00");

    // Click on the order button
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €12.00")
      .click();

    // Check if the user is still on the same page
    cy.url().should("include", "/order/new");

    // Check if the error message is displayed
    cy.get('[data-testid="phoneError"]').should(
      "have.text",
      "Please give us your correct phone number. We might need it to contact you."
    );

    // Clear the phone input
    cy.get('input[name="phone"]').clear();
    // Type a valid phone number
    cy.get('input[name="phone"]').type("123456789");

    // Click on the order button
    cy.get("button").contains("Order now from").click();

    // Check if the order status is displayed , thus redirected the user to the order status page
    cy.get('[data-testid="statusOrder"]').should(
      "have.text",
      "preparing order"
    );
  });
});
