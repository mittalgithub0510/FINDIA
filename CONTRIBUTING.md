# Contributing to FINDIA 🇮🇳

> 💡 **Hinglish Contributor Guide:** Agar aap Hindi / Hinglish me step-by-step guide dekhna chahte hain, toh [CONTRIBUTOR_README.md](CONTRIBUTOR_README.md) zaroor padhein!

Thank you for your interest in contributing to **FINDIA**! This guide outlines how to contribute using Git branches and GitHub Pull Requests to keep collaboration clean, safe, and conflict-free.

---

## 🧭 Collaboration Workflow Overview

We follow the **Feature Branch Workflow**:
1. No one (including maintainers) commits directly to the `main` branch.
2. Every feature, bugfix, or enhancement is developed in a dedicated branch.
3. Code is reviewed and merged into `main` via a **GitHub Pull Request (PR)**.

```
       (feature/places-filter)
         ●───────●───────● 
        /                 \   (Pull Request & Review)
───●───●───────────────────●─── (main branch)
```

---

## 🛠️ Step-by-Step Contributor Guide

### 1. Clone the Repository
If you are a direct collaborator:
```bash
git clone https://github.com/Kislaya-06/Findia.git
cd Findia
```
*(If you are an external contributor, first **Fork** the repository on GitHub, then clone your fork).*

---

### 2. Install Dependencies
Ensure Node.js (>= 20) is installed:
```bash
npm install
```

Copy the environment variables template:
```bash
cp .env.example .env
```

---

### 3. Create a Feature Branch
Always branch off the latest `main` branch:
```bash
git checkout main
git pull origin main
git checkout -b <branch-type>/<short-description>
```

#### Branch Naming Conventions:
- `feature/<feature-name>` (e.g., `feature/places-filter`, `feature/itinerary-multiday`)
- `fix/<issue-name>` (e.g., `fix/metro-fare-calc`, `fix/navbar-mobile-overlap`)
- `docs/<topic>` (e.g., `docs/api-routes`, `docs/setup-guide`)
- `refactor/<scope>` (e.g., `refactor/city-context`)

---

### 4. Implement Changes & Respect Boundaries
Before writing code, check [docs/FEATURE_OWNERSHIP.md](docs/FEATURE_OWNERSHIP.md):
- **Work exclusively in your feature directory**: `src/features/<feature>/` and `src/data/<city>/<feature>.js`.
- **Do not edit shared core files directly** (`src/components/common/`, `src/routes.js`, etc.) without team consensus.
- **Design Tokens**: Use Tailwind semantic tokens (`bg-bg-raised`, `text-brand`, etc.) rather than hardcoded hex values.

---

### 5. Verify & Test Locally
Before committing, make sure there are no lint or build errors:
```bash
# 1. Run linter
npm run lint

# 2. Verify production build
npm run build

# 3. Test in local browser
npm run dev
```

---

### 6. Commit Your Changes
Keep commits atomic and use descriptive messages:
```bash
git add .
git commit -m "feat(places): add category filter chips to filter bar"
```

---

### 7. Push Branch to GitHub
```bash
git push -u origin <branch-type>/<short-description>
```

---

### 8. Open a Pull Request (PR)
1. Go to your repository on GitHub.
2. You will see a prompt: **"Compare & pull request"**. Click it.
3. Set the base branch to `main` and the compare branch to your feature branch.
4. Fill in the PR description:
   - What changes were made?
   - Screenshots/videos (for UI changes).
   - Any testing steps for the reviewer.
5. Request review from teammates / repository maintainers.
6. Once approved and checks pass, the PR can be merged into `main`.

---

## 🔒 Keeping Your Branch Up to Date
If changes were merged into `main` while you were working:
```bash
git checkout main
git pull origin main
git checkout <your-branch-name>
git merge main
```
Resolve any merge conflicts if they appear, then run `npm run build` to confirm everything still builds.
