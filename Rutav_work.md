*Rutav’s Assigned Tasks Summary*

1. Cypress End-to-End Testing
Developed E2E test cases for the To-Do application:
Add task
Mark task as complete
Delete task
Filter tasks
Used Cypress commands such as:
cy.visit(), cy.get(), cy.contains(), cy.click()

2. Debugging and Fixing Delete Test
Analyzed Cypress test failures
Verified backend API responses (DELETE 200 OK)
Identified issues in test assertions and DOM targeting
Corrected selectors and assertions to ensure reliable test execution

3. Frontend–Backend Integration Validation
Verified correct API calls from frontend:
DELETE /tasks/:id
Ensured UI updates correctly after deletion
Confirmed removed tasks no longer appear in the list

4. Backend Verification Support
Reviewed Flask delete API logic
Ensured tasks are properly removed from tasks.json
Validated correct API responses

5. Test Stability Improvements
Improved Cypress test reliability
Used better DOM targeting strategies (e.g., .group, data-testid)
Reduced flaky behavior caused by UI timing issues

6. Version Control (GitHub)
Added and updated Cypress test files
Committed and pushed changes to the repository
Managed code updates and fixes