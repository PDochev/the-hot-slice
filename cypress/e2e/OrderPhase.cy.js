describe("Order phase for Happy Path", () => {
  it("The user should be able to successfully order a pizza from start to end with priority", () => {
    // Start at the Home page
    cy.visit("http://localhost:5173");

    // Enter your name in the user name input
    cy.get('[data-testid="username-input"]').type("John Doe");

    // Check if the input has the correct value
    cy.should("have.value", "John Doe");

    // Check if the button has the correct text
    cy.get("button").should("have.text", "Start ordering");
    // Click on the button
    cy.get("button").click();

    // Check if the button leads to the correct page , the menu page
    cy.url().should("include", "/menu");

    // Check if the user name is displayed in the nav bar
    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");

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

    // Check if the name of the user is displayed in the cart page
    cy.get("h2").should("have.text", "Your cart, John Doe");
    // Check if the selected pizza is displayed in the cart page
    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Check if the button has the correct text
    cy.contains("Order pizzas").should("have.text", "Order pizzas");
    // // Click on the button that leads to the order page
    cy.contains("Order pizzas").click();

    // Check if the button leads to the correct page , the order page
    cy.url().should("include", "/order/new");

    // Check if the name of the user is displayed in the order page , at the name input
    cy.get('input[name="customer"]').should("have.value", "John Doe");

    // Check if the phone input is displayed
    cy.get('input[name="phone"]').should("exist");
    // Type an invalid phone number
    cy.get('input[name="phone"]').type("abs12casdas");
    cy.get('input[name="phone"]').should("have.value", "abs12casdas");

    // Type in at the address input
    cy.get('input[name="address"]').type("Kerkstraat 1, 1000 Brussel");

    // Check if the checkbox button for priority order is displayed
    cy.get('input[name="priority"]').should("exist");
    // Click on the checkbox button for priority order
    cy.get('input[name="priority"]').click();

    // // Check if the button has the correct text
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €14.40");

    // Click on the button that leads to the order confirmation page
    cy.get("button").contains("Order now from").click();

    // Invalid phone number error message should be displayed in the order page , if the phone number is invalid
    cy.get('[data-testid="phoneError"]').should(
      "have.text",
      "Please give us your correct phone number. We might need it to contact you."
    );

    // Clear the phone input
    cy.get('input[name="phone"]').clear();
    // Type a valid phone number
    cy.get('input[name="phone"]').type("123456789");

    // // Click on the button again that leads to the order confirmation page
    cy.get("button").contains("Order now from").click();

    // check if the status of the order is displayed
    cy.get('[data-testid="statusOrder"]').should(
      "have.text",
      "preparing order"
    );

    // Order page should display if the order has a priority
    cy.get('[data-testid="priority"]').should("have.text", "Priority");

    // Check if the correct pizza is displayed in the order page
    cy.get('[data-testid="orderPizza"]').should("have.text", "1× Margherita");
    // Check if the correct pizza price is displayed in the order page
    cy.get('[data-testid="orderPrice"]').should("have.text", "€12.00");

    // Check the order summary
    cy.get('[data-testid="orderPricePizza"]').should(
      "have.text",
      "Price pizza: €12.00"
    );
    cy.get('[data-testid="priorityPrice"]').should(
      "have.text",
      "Price priority: €2.00"
    );
    cy.get('[data-testid="payOnDelivery"]').should(
      "have.text",
      "To pay on delivery: €14.00"
    );
  });

  it("The user should be able to successfully order a pizza from start to end and add priority at the end if they forgot earlier", () => {
    // Start at the Home page
    cy.visit("http://localhost:5173");

    // Enter your name in the user name input
    cy.get('[data-testid="username-input"]').type("John Doe");

    // Check if the input has the correct value
    cy.should("have.value", "John Doe");

    // Check if the button has the correct text
    cy.get("button").should("have.text", "Start ordering");
    // Click on the button
    cy.get("button").click();

    // Check if the button leads to the correct page , the menu page
    cy.url().should("include", "/menu");

    // Check if the user name is displayed in the nav bar
    cy.get('[data-testid="userNameNav"]').should("have.text", "John Doe");

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

    // Check if the name of the user is displayed in the cart page
    cy.get("h2").should("have.text", "Your cart, John Doe");
    // Check if the selected pizza is displayed in the cart page
    cy.get('[data-testid="pizzasInCart"]').should("have.text", "1× Margherita");
    // Check if the total price is displayed in the cart page
    cy.get('[data-testid="pizzaTotalPriceInCart"]').should(
      "have.text",
      "€12.00"
    );

    // Check if the button has the correct text
    cy.contains("Order pizzas").should("have.text", "Order pizzas");
    // // Click on the button that leads to the order page
    cy.contains("Order pizzas").click();

    // Check if the button leads to the correct page , the order page
    cy.url().should("include", "/order/new");

    // Check if the name of the user is displayed in the order page , at the name input
    cy.get('input[name="customer"]').should("have.value", "John Doe");

    // Check if the phone input is displayed
    cy.get('input[name="phone"]').should("exist");
    // Type an invalid phone number
    cy.get('input[name="phone"]').type("123456789");
    cy.get('input[name="phone"]').should("have.value", "123456789");

    // Type in at the address input
    cy.get('input[name="address"]').should("exist");
    cy.get('input[name="address"]').type("Kerkstraat 1, 1000 Brussel");

    // Check if the checkbox button for priority order is displayed
    cy.get('input[name="priority"]').should("exist");

    // // Check if the button has the correct text
    cy.get("button")
      .contains("Order now from")
      .should("have.text", "Order now from €12.00");

    // Click on the button that leads to the order confirmation page
    cy.get("button").contains("Order now from").click();

    // check if the status of the order is displayed
    cy.get('[data-testid="statusOrder"]').should(
      "have.text",
      "preparing order"
    );

    // Order page should display if the order has a priority
    cy.get('[data-testid="priority"]').should("not.exist");

    // Check if the correct pizza is displayed in the order page
    cy.get('[data-testid="orderPizza"]').should("have.text", "1× Margherita");
    // Check if the correct pizza price is displayed in the order page
    cy.get('[data-testid="orderPrice"]').should("have.text", "€12.00");

    // Check the order summary without priority
    cy.get('[data-testid="orderPricePizza"]').should(
      "have.text",
      "Price pizza: €12.00"
    );
    cy.get('[data-testid="priorityPrice"]').should("not.exist");
    cy.get('[data-testid="payOnDelivery"]').should(
      "have.text",
      "To pay on delivery: €12.00"
    );

    cy.get("button").should("have.text", "Make priority");
    cy.get("button").should("exist");

    cy.get("button").click();

    cy.get('[data-testid="priority"]').should("exist");
    cy.get('[data-testid="priority"]').should("have.text", "Priority");

    // Check the order summary again with priority
    cy.get('[data-testid="orderPricePizza"]').should(
      "have.text",
      "Price pizza: €12.00"
    );
    cy.get('[data-testid="priorityPrice"]').should(
      "have.text",
      "Price priority: €2.00"
    );
    cy.get('[data-testid="payOnDelivery"]').should(
      "have.text",
      "To pay on delivery: €14.00"
    );
  });
});
