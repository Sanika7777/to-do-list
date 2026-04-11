# To-Do List Web Application with Multi-Tool Automated Testing

Diploma-level capstone project: a production-style To-Do List web app with a React + Vite frontend and a Python Flask backend, tested using four different tools (Vitest, Selenium, Postman, Cypress).

---

## 1. Project Overview

- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Python Flask REST API
- **Data Storage:** `tasks.json` file (no external DB)
- **Testing Tools:**
  - Vitest – unit tests (React + JS)
  - Selenium – UI automation
  - Postman – API testing
  - Cypress – end-to-end testing
- **Repo Owner:** Shaurya Panhale

This repository contains everything needed to run the app locally and perform all 4 types of tests.

---

## 2. Folder Structure

```text
/todo-testing-project
├── backend/                 # Python Flask REST API
│   ├── server.py
│   └── tasks.json           # JSON storage for tasks
│
├── todo-app/                # React + Vite frontend
│   ├── src/
│   │   ├── components/      # TaskCard, TaskList, etc.
│   │   ├── utils/           # taskManager.js (API helpers)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
│
└── README.md                # This file
```

---

## 3. How to Run the Project (All Members)

Everyone should be able to run the app locally to understand how it works.

### 3.1. Prerequisites

- **Node.js**: v18+  
- **npm**: v9+ (comes with Node)
- **Python**: 3.10+

Check versions:

```bash
node -v
npm -v
python --version
```

---

### 3.2. Clone the Repository

```bash
git clone https://github.com/shauryapanhale/to-do-list.git
cd to-do-list
```

> If the repo name is different, use that name instead after `git clone`.

---

### 3.3. Run the Backend (Flask API)

In a **new terminal**:

```bash
cd backend
pip install flask flask-cors
python server.py
```

- The server runs on: `http://127.0.0.1:5000`
- Test it by opening this URL in a browser:

```text
http://127.0.0.1:5000/tasks
```

You should see:

```json
[]
```

(or a list of tasks after you start using the app)

---

### 3.4. Run the Frontend (React + Vite)

In another terminal:

```bash
cd todo-app
npm install
npm run dev
```

Vite will start a dev server, usually at:

```text
http://localhost:5173/
```

Open that in your browser.

---

## 4. How the App Works (High-Level)

- The frontend (React) calls the Flask backend over HTTP.
- All tasks are stored in `backend/tasks.json`.
- When you:
  - **Add a task** → `POST /tasks`
  - **Edit a task** → `PUT /tasks/:id`
  - **Delete a task** → `DELETE /tasks/:id`
  - **Complete a task** → `POST /tasks/:id/complete`
  - **Clear all tasks** → `DELETE /tasks`

The frontend shows:

- All / Pending / Completed filters
- Task counts (total, completed, pending)
- A secondary side panel with a summary snapshot
- Error banner if API calls fail (e.g., backend is not running)

---

## 5. Responsibilities and Exact Steps for Each Member

### 5.1. Shaurya Panhale – Vitest (Unit Testing)

**Goal:** Write unit tests for React components and JS logic using Vitest.

#### 5.1.1. Setup Vitest

From `todo-app` directory:

```bash
cd todo-app
npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom
```

Update `package.json` scripts:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:ui": "vitest --ui"
}
```

#### 5.1.2. Create Test Folder

Inside `todo-app`:

```text
todo-app/
└── src/
    └── __tests__/
        ├── taskManager.test.js
        └── components.test.jsx
```

- `taskManager.test.js` → tests pure functions in `src/utils/taskManager.js`
- `components.test.jsx` → tests UI behavior of components (TaskCard, TaskList, FilterBar, TaskInput)

#### 5.1.3. Run Tests

From `todo-app`:

```bash
npm run test
# or with UI
npm run test:ui
```

Generate and save test output/screenshot for the final report.

---

### 5.2. Shriya Sabnis – Selenium (UI Testing)

**Goal:** Automate browser actions on the live app using Selenium in Python.

#### 5.2.1. Setup

Make sure backend and frontend are running:

- Backend → `http://127.0.0.1:5000`
- Frontend → `http://localhost:5173/`

Install Selenium:

```bash
pip install selenium
```

Download appropriate **WebDriver** (e.g., ChromeDriver) and ensure it’s in PATH.

#### 5.2.2. Create Test File

Create folder and test file:

```text
/selenium-tests
└── test_ui.py
```

Inside `test_ui.py`, write tests that:

- Open `http://localhost:5173/`
- Add a task, verify it appears
- Mark a task complete, verify the style changes
- Delete a task, verify it disappears
- Use filter tabs (All / Pending / Completed)
- Verify empty state appears when all tasks are deleted

Run tests:

```bash
python selenium-tests/test_ui.py
```

Capture:

- Console output (pass/fail)
- Screenshots on failure (optional but recommended)

---

### 5.3. Sanika Deshmukh – Postman (API Testing)

**Goal:** Test all REST API endpoints of the Flask backend using Postman.

#### 5.3.1. Setup

Ensure **backend is running**:

```text
http://127.0.0.1:5000
```

#### 5.3.2. Create Postman Collection

Endpoints to include:

- `GET /tasks` – should return 200 + JSON array
- `POST /tasks` – with valid body `{ "text": "Sample task" }` → 201 + created task
- `POST /tasks` – with empty body or empty text → 400 error
- `PUT /tasks/:id` – update task text
- `PUT /tasks/:id` – invalid id → 404
- `DELETE /tasks/:id` – valid id → 200
- `DELETE /tasks/:id` – invalid id → 404
- `POST /tasks/:id/complete` – mark completed
- `DELETE /tasks` – clear all tasks

Use **Tests** tab in Postman to assert:

- Correct status codes
- Response fields (id, text, status, created_at)
- Error messages when invalid

#### 5.3.3. Export and Save

- Export collection as `todo_api_collection.json` in `/postman` folder.
- Export Collection Run report (HTML or JSON) into `/reports/postman_report.*`.

---

### 5.4. Rutav Mehta – Cypress (End-to-End Testing)

**Goal:** Test full user flows in the browser using Cypress.

#### 5.4.1. Setup

From `todo-app`:

```bash
cd todo-app
npm install -D cypress
```

Add script to `package.json`:

```json
"scripts": {
  "cypress:open": "cypress open"
}
```

Ensure backend and frontend are running.

#### 5.4.2. Create Cypress Tests

Cypress default folder (after first run):

```text
/cypress
└── e2e
    └── todo.cy.js
```

In `todo.cy.js`, cover flows:

- Visit `http://localhost:5173/`
- Add a task → appears in All
- Mark task complete → appears in Completed filter
- Edit task text → change visible
- Delete task → removed from list
- Add multiple tasks, filter Pending / Completed
- Clear all → empty state message + counts reset

Run Cypress:

```bash
npm run cypress:open
```

Save:

- Screenshots
- Video recordings (Cypress generates automatically if configured)

Place them in `/reports/cypress_report/`.

---

## 6. Common Troubleshooting

### 6.1. Frontend shows error banner “Could not load tasks…”

- Check that the Flask backend is running:

```bash
cd backend
python server.py
```

- Open `http://127.0.0.1:5000/tasks` in browser; it must respond.

### 6.2. CORS Issues

CORS is already enabled in `server.py` using `flask-cors`. If problems appear:

- Confirm frontend is on `http://localhost:5173` and backend on `http://127.0.0.1:5000`.

### 6.3. `tasks.json` stays empty

- You must have both backend and frontend running.
- Add tasks through the UI; then open `backend/tasks.json` to see stored tasks.

---

## 7. Final Deliverables (Per SRS)

- **Shaurya**
  - React + Vite frontend (todo-app)
  - Flask backend (backend)
  - Vitest test suite + report
- **Shriya**
  - `selenium-tests/test_ui.py`
  - Selenium run report + screenshots
- **Sanika**
  - Postman collection (`/postman/todo_api_collection.json`)
  - Postman run report (`/reports/postman_report.*`)
- **Rutav**
  - Cypress tests (`/cypress/e2e/todo.cy.js`)
  - Cypress screenshots/video (`/reports/cypress_report/`)

All reports and test artifacts should be added to the repo before the final submission.

---

## 8. How to Reset Data

If `tasks.json` is messy or you want a clean start:

1. Stop backend.
2. Open `backend/tasks.json`.
3. Replace content with:

```json
[]
```

4. Start backend again:

```bash
cd backend
python server.py
```

You will now have a fresh, empty To-Do board.