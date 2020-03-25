describe("Navigation", () => {
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    cy.visit("/");
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      // .should("have.css", "background-color", "rgb(242, 242, 242)");
      .get(".day-list__item--selected")
      .should("have.class", "day-list__item--selected");
  });
});
