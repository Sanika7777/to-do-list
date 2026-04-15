describe("To-Do App E2E Tests", () => {

  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("Add a task", () => {
    cy.get("input").first().type("Learn Cypress");
    cy.contains("Add").click();
    cy.contains("Learn Cypress").should("exist");
    cy.screenshot("add-task");           
  });

  it("Mark task as complete by clicking task", () => {
    cy.get("input").first().type("Complete Task");
    cy.contains("Add").click();
    cy.contains("Complete Task").click();
    cy.contains("Complete Task").should("exist");
    cy.screenshot("complete-task");      
  });

  it("Delete task", () => {
  const taskName = "Task To Be Removed";
    cy.get("input").first().type(taskName);
    cy.contains("Add").click();
    cy.contains(taskName).should("exist");
    cy.contains(taskName)
      .closest(".group")
      .within(() => {
        cy.contains("Delete").click();
      });
    cy.contains(taskName).should("not.exist");
    cy.screenshot("delete-task");
  });

  it("Filter tasks", () => {
    cy.get("input").first().type("Task 1");
    cy.contains("Add").click();
    cy.get("input").first().type("Task 2");
    cy.contains("Add").click();
    cy.contains("Task 1").click();
    cy.contains("Task 1").should("exist");
    cy.contains("Task 2").should("exist");
    cy.screenshot("filter-tasks");
});

});