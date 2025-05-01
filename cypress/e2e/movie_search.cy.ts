/// <reference types="cypress" />

describe("Movie Search", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should show results when searching for 'batman'", () => {
    cy.get("input[placeholder='Search movies...']").type("batman");

    cy.get("h3").should("contain.text", "Batman");

    cy.get("img").should("have.length.greaterThan", 0); 
  });

  it("should load more results on scroll", () => {
  cy.get("input[placeholder='Search movies...']").type("e");

  cy.get("img").should("have.length.at.least", 20);

  cy.scrollTo("bottom");

  cy.wait(1000);

  cy.get("img").should("have.length.greaterThan", 20);
});

  it("should show 'No results' when searching gibberish", () => {
    cy.get("input[placeholder='Search movies...']").type("asdhfkasdjhf");

    cy.contains("No results found").should("exist");
  });
});
