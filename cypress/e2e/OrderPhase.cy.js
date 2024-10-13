describe("Order phase for Happy Path", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173");

    cy.get('[data-cy="username-input"]').type("John Doe");
    cy.should("have.value", "John Doe");

    cy.get("button").should("have.text", "Start ordering");
    cy.get("button").click();

    cy.url().should("include", "/menu");
    cy.get('[data-cy="userNameNav"]').should("have.text", "John Doe");

    cy.get(":nth-child(1) > .grow > .mt-4 > .inline-block").click();
    cy.get('[data-cy="numberPizzaCartOverview"]').should(
      "have.text",
      "1 pizzas"
    );

    cy.get('[data-cy="totalPriceCartOverview"]').should("have.text", "€12.00");

    cy.get('[data-cy="openCartBtn"]').should("have.text", "Open cart →");
    cy.get('[data-cy="openCartBtn"]').click();

    cy.url().should("include", "/cart");

    cy.get("h2").should("have.text", "Your cart, John Doe");
    cy.get("li > p").should("have.text", "1× Margherita");
    cy.get("li > div > p").should("have.text", "€12.00");

    cy.get(".mt-6 > .bg-accent").should("have.text", "Order pizzas");
    cy.get(".mt-6 > .bg-accent").click();

    cy.url().should("include", "/order/new");

    cy.get('input[name="customer"]').should("have.value", "John Doe");
    cy.get('input[name="phone"]').should("exist");

    cy.get('input[name="phone"]').type("abs12casdas");

    cy.get('input[name="address"]').type("Kerkstraat 1, 1000 Brussel");
    cy.get('input[name="priority"]').should("exist");
    cy.get('input[name="priority"]').click();

    cy.get(":nth-child(5) > .inline-block").should(
      "have.text",
      "Order now from €14.40"
    );

    cy.get(":nth-child(5) > .inline-block").click();

    cy.get('[data-cy="phoneError"]').should(
      "have.text",
      "Please give us your correct phone number. We might need it to contact you."
    );

    cy.get('input[name="phone"]').clear();
    cy.get('input[name="phone"]').type("123456789");

    cy.get(":nth-child(5) > .inline-block").click();

    cy.get(".bg-destructive").should("have.text", "Priority");
    cy.get('[data-cy="orderPizza"]').should("have.text", "1× Margherita");
    cy.get('[data-cy="orderPrice"]').should("have.text", "€12.00");
    cy.get('[data-cy="orderPricePizzaOnly"]').should(
      "have.text",
      "Price pizza: €12.00"
    );
    cy.get('[data-cy="priorityPrice"]').should(
      "have.text",
      "Price priority: €2.00"
    );

    cy.get('[data-cy="payOnDelivery"]').should(
      "have.text",
      "To pay on delivery: €14.00"
    );
  });
});
