describe("To-Do App E2E Tests", () => {

  beforeEach(() => {
    // Clear all tasks before each test to prevent state pollution across runs
    cy.request({ method: "DELETE", url: "http://localhost:5000/tasks", failOnStatusCode: false });
    cy.visit("http://localhost:5173/");
  });

  it("Add a task", () => {
    cy.get("input").first().type("Learn Cypress");
    cy.contains("Add").click();
    cy.contains("Learn Cypress").should("exist");
    cy.screenshot("add-task");
  });

  it("Mark task as complete", () => {
    cy.get("input").first().type("Complete Task");
    cy.contains("Add").click();
    // Click the round complete button (first button inside the task card, not the text)
    cy.contains("Complete Task")
      .closest(".group")
      .find("button")
      .first()
      .click();
    // Verify the task text gets the line-through style applied on completion
    cy.contains("Complete Task").should("have.class", "line-through");
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

    // Filter to Completed — neither task is completed yet, so both should disappear
    cy.contains("button", "Completed").click();
    cy.contains("Task 1").should("not.exist");
    cy.contains("Task 2").should("not.exist");

    // Switch back to All — both tasks should reappear
    cy.contains("button", "All").click();
    cy.contains("Task 1").should("exist");
    cy.contains("Task 2").should("exist");
    cy.screenshot("filter-tasks");
  });

});