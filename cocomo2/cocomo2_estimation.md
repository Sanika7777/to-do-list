# COCOMO 2 Software Cost Estimation
## To-Do List Web Application

**Prepared by:** Sanika Deshmukh
**Date:** 2026-04-12
**Model:** COCOMO 2 — Post-Architecture Model
**Reference:** Boehm, B. et al., *Software Cost Estimation with COCOMO II* (2000)

---

## 1. Project Description

| Attribute | Value |
|-----------|-------|
| Project Name | To-Do List Web Application |
| Project Type | Web Application (React + Flask) |
| Team Size | 4 members (diploma capstone) |
| Development Mode | Organic (small team, familiar tools) |
| Language(s) | JavaScript (React), Python (Flask) |
| Storage | JSON file (no external DB) |
| Testing Coverage | 4 tools: Vitest, Selenium, Postman, Cypress |

---

## 2. Source Lines of Code (SLOC) Count

SLOC counts include logical lines of code (non-blank, non-comment).

| Component | Files | Estimated SLOC |
|-----------|-------|----------------|
| Flask Backend | `backend/server.py` | 80 |
| React App Component | `todo-app/src/App.jsx` | 120 |
| React Components (6) | TaskCard, TaskList, TaskInput, FilterBar, StatsBar, EmptyState | 330 |
| Utility Helpers | `todo-app/src/utils/taskManager.js` | 80 |
| Vitest Test Files (4) | taskManager.test.js, TaskInput, TaskCard, FilterBar tests | 180 |
| Config & Setup | vite.config.js, package.json, eslint.config.js, index.html | 60 |
| **Total** | | **850 SLOC** |

**Equivalent KSLOC = 0.85**

---

## 3. Scale Factors (SF)

Scale Factors adjust the exponent E in the effort equation.
Rating scale: Very Low → Very High (with corresponding numeric values).

| Scale Factor | Description | Rating | Value (Wi) |
|--------------|-------------|--------|-----------|
| **PREC** — Precedentedness | How familiar the team is with this type of project. Diploma students building a web app for the first time. | Nominal | 3.72 |
| **FLEX** — Development Flexibility | Degree to which requirements are flexible. Capstone project has flexible scope and no strict customer constraints. | High | 2.03 |
| **RESL** — Architecture/Risk Resolution | Degree of risk analysis and architecture resolution. Limited formal risk planning typical of academic projects. | Low | 5.65 |
| **TEAM** — Team Cohesion | How well the team communicates and collaborates. 4-member team working cooperatively with clear role division. | High | 2.19 |
| **PMAT** — Process Maturity | CMM process maturity level. Academic project — no formal CMM processes (Level 1). | Low | 6.24 |

**ΣSF = 3.72 + 2.03 + 5.65 + 2.19 + 6.24 = 19.83**

**Exponent E = 0.91 + 0.01 × ΣSF**
**E = 0.91 + 0.01 × 19.83 = 0.91 + 0.1983 = 1.1083**

---

## 4. Effort Multipliers (EM) — Cost Drivers

Effort Multipliers (EM) adjust the effort calculation based on product, platform, personnel, and project attributes.

### 4.1 Product Factors

| Cost Driver | Description | Rating | EM Value |
|-------------|-------------|--------|----------|
| **RELY** — Required Software Reliability | Failure consequence is minor inconvenience (local to-do app). | Low | 0.92 |
| **DATA** — Database Size | Small JSON file (~10 KB typical). D/P ratio ≈ 10. | Nominal | 1.00 |
| **CPLX** — Product Complexity | Straightforward CRUD operations, no complex algorithms. | Nominal | 1.00 |
| **RUSE** — Required Reusability | Code is for single project use only. | Low | 0.95 |
| **DOCU** — Documentation Match to Lifecycle Needs | Moderate documentation (README, test reports). | Nominal | 1.00 |

### 4.2 Platform Factors

| Cost Driver | Description | Rating | EM Value |
|-------------|-------------|--------|----------|
| **TIME** — Execution Time Constraint | No strict performance constraints. | Nominal | 1.00 |
| **STOR** — Main Storage Constraint | No memory constraints for a local web app. | Nominal | 1.00 |
| **PVOL** — Platform Volatility | Flask and React are stable, mature platforms. | Low | 0.87 |

### 4.3 Personnel Factors

| Cost Driver | Description | Rating | EM Value |
|-------------|-------------|--------|----------|
| **ACAP** — Analyst Capability | Diploma-level students with good problem-solving ability. | High | 0.85 |
| **PCAP** — Programmer Capability | Students with intermediate Python and JavaScript skills. | High | 0.88 |
| **PCON** — Personnel Continuity | Full team present for project duration (no turnover). | High | 0.90 |
| **APEX** — Applications Experience | Limited prior experience building full-stack apps. | Nominal | 1.00 |
| **PLEX** — Platform Experience | Moderate experience with React and Flask. | Nominal | 1.00 |
| **LTEX** — Language & Tool Experience | Python and JavaScript experience; new to testing tools. | Nominal | 1.00 |

### 4.4 Project Factors

| Cost Driver | Description | Rating | EM Value |
|-------------|-------------|--------|----------|
| **TOOL** — Use of Software Tools | Using modern tools: Vite, Vitest, Postman, Selenium, Cypress. | High | 0.90 |
| **SITE** — Multisite Development | Small 4-person team, likely co-located or online collaboration. | High | 0.93 |
| **SCED** — Required Development Schedule | No aggressive schedule compression imposed. | Nominal | 1.00 |

### 4.5 Effort Adjustment Factor (EAF)

EAF = Product of all EM values

EAF = 0.92 × 1.00 × 1.00 × 0.95 × 1.00 × 1.00 × 1.00 × 0.87 × 0.85 × 0.88 × 0.90 × 1.00 × 1.00 × 1.00 × 0.90 × 0.93 × 1.00

**EAF = 0.92 × 0.95 × 0.87 × 0.85 × 0.88 × 0.90 × 0.90 × 0.93**
**EAF ≈ 0.431**

---

## 5. Effort Calculation

The COCOMO 2 Post-Architecture effort formula is:

```
PM = A × EAF × (Size)^E
```

Where:
- **A** = 2.94 (COCOMO 2 constant)
- **EAF** = 0.431 (calculated above)
- **Size** = 0.85 KSLOC
- **E** = 1.1083 (calculated above)

**Step 1: Compute Size^E**
(0.85)^1.1083 = e^(1.1083 × ln(0.85)) = e^(1.1083 × (−0.1625)) = e^(−0.1802) ≈ **0.8350**

**Step 2: Compute PM**
PM = 2.94 × 0.431 × 0.8350
PM = 2.94 × 0.3599
**PM ≈ 1.06 person-months**

---

## 6. Schedule Calculation

The COCOMO 2 schedule (time to develop) formula is:

```
TDEV = C × (PM)^(D + 0.2 × (E - B))
```

Where:
- **C** = 3.67 (COCOMO 2 constant)
- **D** = 0.28
- **B** = 0.91
- **PM** = 1.06 person-months
- **E** = 1.1083

**Step 1: Compute exponent**
D + 0.2 × (E − B) = 0.28 + 0.2 × (1.1083 − 0.91) = 0.28 + 0.2 × 0.1983 = 0.28 + 0.0397 = **0.3197**

**Step 2: Compute TDEV**
TDEV = 3.67 × (1.06)^0.3197
(1.06)^0.3197 = e^(0.3197 × ln(1.06)) = e^(0.3197 × 0.0583) = e^(0.01864) ≈ 1.01881
TDEV = 3.67 × 1.01881
**TDEV ≈ 3.74 months**

---

## 7. Average Team Size

```
Staff = PM / TDEV = 1.06 / 3.74 ≈ 0.28 persons (full-time equivalent)
```

This means roughly **0.28 FTE** — consistent with 4 part-time students each contributing ~7% of their time, which matches a diploma capstone workload alongside other coursework.

---

## 8. Summary of Results

| Metric | Value |
|--------|-------|
| Project Size | 850 SLOC (0.85 KSLOC) |
| Exponent E | 1.1083 |
| Effort Adjustment Factor (EAF) | 0.431 |
| **Estimated Effort** | **~1.06 person-months** |
| **Estimated Schedule** | **~3.74 months** |
| Average Staff | ~0.28 FTE (≈ 4 part-time students) |
| Productivity | ~802 SLOC/person-month |

---

## 9. Interpretation

- The **1.06 person-months** of effort reflects the relatively small codebase (~850 SLOC) with favorable EAF (capable team, modern tools, low reliability requirements).
- The **~3.74-month schedule** aligns with a typical 4-month academic semester timeline.
- The low Staff figure (0.28 FTE) confirms this is a **part-time capstone project**, not a full-time commercial engagement.
- If treated as a commercial project at a typical internship rate of ₹15,000/month, the cost estimate would be approximately **₹15,900** (~1.06 × ₹15,000).

---

## 10. Assumptions & Limitations

1. SLOC counts are estimates based on code inspection; exact counts may vary by ±15%.
2. New code only — no reuse/adaptation factors applied.
3. Scale Factor ratings are subjective judgments appropriate for a diploma-level academic project.
4. COCOMO 2 was originally calibrated for commercial software projects; academic projects may show variance from predictions.
5. Testing code (Vitest tests) is included in the SLOC count as it represents development effort.
