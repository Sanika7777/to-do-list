# Sanika Deshmukh — Work Guide
## Postman API Testing + COCOMO 2 Estimation

**Prepared for:** Diploma Capstone Team  
**Project:** To-Do List Web Application (React + Flask)

---

## What Sanika Did

Sanika handled two deliverables for this capstone project:

1. **Postman API Testing** — Wrote a complete test collection covering all 6 Flask REST API endpoints with 9 test cases and 25 assertions. Also ran the tests using Newman (Postman's CLI runner) and saved the run report.

2. **COCOMO 2 Software Cost Estimation** — Applied the COCOMO 2 Post-Architecture model to estimate how much effort and time the project would realistically take based on code size, team skill, and project factors.

---

## Files She Created

| File | What it is |
|------|------------|
| `postman/todo_api_collection.json` | The Postman collection — 9 requests with automated test scripts |
| `reports/postman_report.json` | The run report — shows all 25 assertions passed, all 9 requests succeeded |
| `cocomo2/cocomo2_estimation.md` | Full COCOMO 2 calculation — effort, schedule, team size estimates |

---

## Part 1: Postman API Testing

### What it covers

The collection tests all 6 Flask endpoints across 9 requests:

| # | Request | What it checks |
|---|---------|----------------|
| 1 | GET /tasks | Returns 200 + JSON array, response under 500ms |
| 2 | POST /tasks (valid) | Returns 201, task has all fields, status is "pending", saves task ID for later tests |
| 3 | POST /tasks (empty text) | Returns 400 with error "Task text cannot be empty" |
| 4 | PUT /tasks/{{task_id}} | Returns 200, updated text matches what was sent |
| 5 | PUT /tasks/99999 | Returns 404 with error "Task not found" (non-existent ID) |
| 6 | POST /tasks/{{task_id}}/complete | Returns 200, status changes to "completed" |
| 7 | POST /tasks/{{task_id}}/complete (again) | Returns 400 with error "Task already completed" |
| 8 | DELETE /tasks/{{task_id}} | Returns 200 with message "Task deleted" |
| 9 | DELETE /tasks | Returns 200 with message "All tasks cleared" |

**Total: 9 requests, 25 assertions, all passed.**

A smart feature in the collection: Request 2 automatically saves the created task's ID into a collection variable (`task_id`). Requests 4, 6, 7, and 8 reuse that variable so the tests always run against the task that was just created — no hardcoded IDs needed.

### Run Results (from `reports/postman_report.json`)

- All 9 requests passed
- All 25 assertions passed
- Average response time: 8ms, max: 21ms
- Zero failures, zero skipped assertions

---

### How to Use Postman — Installation to Final Run

#### Method A: Postman Desktop App (GUI)

**Step 1 — Install Postman**

Go to https://www.postman.com/downloads/ and download the app for your OS (Windows/Mac/Linux). Install and open it. Creating an account is optional — you can skip sign-in and use it locally.

**Step 2 — Start the Flask backend**

The Postman collection hits `http://127.0.0.1:5000`. The backend must be running before you send any requests.

```bash
cd backend
pip install -r requirements.txt
python server.py
```

You should see:
```
 * Running on http://127.0.0.1:5000
```

**Step 3 — Import the collection**

1. Open Postman
2. Click **Import** (top-left area)
3. Click **Upload Files**
4. Select `postman/todo_api_collection.json` from this project
5. Click **Import**

The collection "To-Do List API Collection" will appear in your left sidebar.

**Step 4 — Run all tests at once (Collection Runner)**

1. Click on the collection name in the sidebar
2. Click the **Run** button (or "Run collection")
3. In the Collection Runner window, leave all settings as default
4. Click **Run To-Do List API Collection**
5. Watch each request execute — green = passed, red = failed

**Step 5 — Read the results**

After the run completes you'll see a summary:
- All 9 requests listed
- Each assertion shown with pass/fail status
- Response times and status codes visible

You can also click any individual request in the sidebar, hit **Send**, and see the raw response + test results in the bottom panel.

---

#### Method B: Newman (Command Line Runner)

Newman lets you run the collection from a terminal — useful for CI/CD or if you prefer the command line.

**Step 1 — Install Node.js**

Newman requires Node.js. Download from https://nodejs.org/ (LTS version). Verify install:

```bash
node --version
npm --version
```

**Step 2 — Install Newman globally**

```bash
npm install -g newman
```

Verify:

```bash
newman --version
```

**Step 3 — Start the Flask backend** (same as Method A, Step 2)

```bash
cd backend
python server.py
```

**Step 4 — Run the collection**

From the project root:

```bash
newman run postman/todo_api_collection.json
```

**Step 5 — Read the terminal output**

Newman prints a table like:

```
┌─────────────────────────────────────────┬──────────┬──────────┐
│                                         │ executed │   failed │
├─────────────────────────────────────────┼──────────┼──────────┤
│              iterations                 │        1 │        0 │
│                requests                 │        9 │        0 │
│            test-scripts                 │        9 │        0 │
│      prerequest-scripts                 │        0 │        0 │
│              assertions                 │       25 │        0 │
├─────────────────────────────────────────┴──────────┴──────────┤
│ total run duration: 312ms                                      │
└────────────────────────────────────────────────────────────────┘
```

If everything passes, no failures will appear.

**Optional — Save the run report to a file:**

```bash
newman run postman/todo_api_collection.json --reporters json --reporter-json-export reports/postman_report.json
```

This overwrites `reports/postman_report.json` with a fresh run report.

---

## Part 2: COCOMO 2 Estimation

### What it is

COCOMO 2 (Constructive Cost Model 2) is a mathematical model for estimating how much effort (person-months) and time (calendar months) a software project needs. It was created by Dr. Barry Boehm and is widely used in software engineering.

Sanika used the **Post-Architecture** variant, which is the most detailed version — it takes into account code size, team skill, project complexity, and tool usage.

### What she estimated

| Metric | Result |
|--------|--------|
| Project size | 850 SLOC (0.85 KSLOC) |
| Estimated effort | ~1.06 person-months |
| Estimated schedule | ~3.74 months |
| Average team size | ~0.28 FTE (4 part-time students) |

The 3.74-month schedule matches a typical 4-month academic semester, and the 0.28 FTE confirms this is a part-time capstone — not a full-time commercial project.

### How the calculation works (simplified)

The model has 3 main steps:

**Step 1 — Count lines of code (SLOC)**  
Count all logical lines of code across the project. This project had 850 SLOC across backend, frontend, components, utilities, and tests.

**Step 2 — Rate Scale Factors (SF)**  
5 factors about the project's nature (team experience, schedule flexibility, risk planning, team cohesion, process maturity) combine into an exponent `E = 1.1083`.

**Step 3 — Rate Cost Drivers (EAF)**  
17 attributes about the product, platform, people, and project (reliability needs, team capability, tool quality, etc.) multiply together into an Effort Adjustment Factor `EAF = 0.431`. A value below 1.0 means favorable conditions (capable team, modern tools, low-risk app).

**Final formula:**
```
Effort (PM) = 2.94 × EAF × (KSLOC)^E
            = 2.94 × 0.431 × (0.85)^1.1083
            ≈ 1.06 person-months
```

---

### How to Use COCOMO 2 — From Scratch

The COCOMO 2 estimation is a document/calculation, not a software tool you install. Here's how to read, verify, or redo it for any project.

#### Method A: Read the existing estimation

Just open the file:

```bash
cat cocomo2/cocomo2_estimation.md
```

Or open `cocomo2/cocomo2_estimation.md` in any text editor or Markdown viewer. The document is fully self-contained — every formula, every input value, and every calculation step is written out.

#### Method B: Use an online COCOMO 2 calculator

If you want to verify Sanika's numbers or run your own estimation:

1. Go to a COCOMO 2 calculator (search "COCOMO 2 calculator online" or use tools like the one from USC's Center for Systems and Software Engineering)
2. Input:
   - **Size:** 0.85 KSLOC
   - **Scale Factors:** PREC=3.72, FLEX=2.03, RESL=5.65, TEAM=2.19, PMAT=6.24
   - **Cost Drivers:** as listed in the estimation document (Section 4)
3. Compare the output to Sanika's results

#### Method C: Do it manually (for a new project)

Follow the same steps Sanika followed in `cocomo2/cocomo2_estimation.md`:

1. **Count SLOC** — go through every source file and count non-blank, non-comment lines
2. **Rate the 5 Scale Factors** (PREC, FLEX, RESL, TEAM, PMAT) from the COCOMO 2 rating tables
3. **Calculate E:** `E = 0.91 + 0.01 × ΣSF`
4. **Rate the 17 Cost Drivers** (RELY, DATA, CPLX, etc.) from the rating tables
5. **Calculate EAF:** multiply all cost driver values together
6. **Calculate Effort:** `PM = 2.94 × EAF × (KSLOC)^E`
7. **Calculate Schedule:** `TDEV = 3.67 × (PM)^(0.28 + 0.2×(E−0.91))`
8. **Calculate Team Size:** `Staff = PM / TDEV`

The full reference with all rating tables is in: Boehm, B. et al., *Software Cost Estimation with COCOMO II* (2000).

---

## Quick Reference — Running Both Together

To do a complete run of Sanika's work from scratch:

```bash
# 1. Start the Flask backend
cd backend && python server.py

# 2. In a new terminal — run Postman tests via Newman
cd ..
newman run postman/todo_api_collection.json

# 3. Read the COCOMO 2 estimation
cat cocomo2/cocomo2_estimation.md
```

All 25 Postman assertions should pass. The COCOMO 2 document needs no "running" — it's a static estimation document.

---

## Summary

| Tool | Purpose | Where to find it | How to run |
|------|---------|-----------------|------------|
| Postman collection | API testing — verifies all 6 endpoints work correctly with proper status codes and response shapes | `postman/todo_api_collection.json` | Import into Postman app OR `newman run postman/todo_api_collection.json` |
| COCOMO 2 estimation | Software cost model — estimates effort, schedule, and team size for the project | `cocomo2/cocomo2_estimation.md` | Read the document; no execution needed |
| Test run report | Saved output from Newman showing all tests passed | `reports/postman_report.json` | Read the JSON or regenerate with Newman |