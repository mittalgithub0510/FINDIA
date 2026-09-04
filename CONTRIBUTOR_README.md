# 🤝 FINDIA - Contributor Guide (Hinglish) 🇮🇳

Namaste! Agar aap **FINDIA** project me contribute karna chahte hain, toh ye guide aapke liye hai. Isko step-by-step follow karein taaki bina kisi error ya merge conflict ke aapka code asani se merge ho sake.

---

## ⚠️ Sabse Zaroori Niyam (Golden Rules)
1. **Direct `main` branch me push ya commit bilkul NA karein.** `main` branch protected hai.
2. Har feature ya bug fix ke liye **hamesha ek naya branch** banayein.
3. Sirf **apne feature folder** (`src/features/<feature>/`) me kaam karein, core common files ko bina discuss kiye modify na karein.
4. Code complete hone ke baad GitHub par **Pull Request (PR)** raise karein. Project maintainer usko verify karke merge karega.

---

## 🚀 Step 1: Project Setup (Sirf Pehli Baar)

### 1. Repository Clone karein
Apne terminal ya command prompt me run karein:
```bash
git clone https://github.com/Kislaya-06/Findia.git
cd Findia
```

*(Agar aap external open-source contributor hain, toh pehle GitHub par **Fork** karein, fir apne forked URL se clone karein).*

### 2. Dependencies Install karein
Make sure aapke paas Node.js (v20 ya higher) installed ho:
```bash
npm install
```

### 3. Environment Variables Setup karein
`.env.example` file ko copy karke `.env` banayein:
- **Windows (PowerShell):**
  ```powershell
  copy .env.example .env
  ```
- **Mac / Linux / Git Bash:**
  ```bash
  cp .env.example .env
  ```

---

## 💻 Step 2: Roz Ka Kaam Kaise Karein (Daily Workflow)

### 1. Hamesha latest `main` branch se shuru karein
Koi bhi naya kaam shuru karne se pehle ensure karein ki aapka local code updated hai:
```bash
git checkout main
git pull origin main
```

### 2. Naya Feature Branch banayein
Apne kaam ke hisab se meaningful branch name rakhein:
```bash
git checkout -b feature/aapka-feature-name
```

**Branch Name Examples:**
- Naya feature: `feature/places-search` ya `feature/itinerary-planner`
- Bug fix: `fix/metro-fare-bug` ya `fix/header-mobile-view`
- Documentation: `docs/api-routes`

---

## 🛠️ Step 3: Code Likhein & Local Test Karein

### 1. Local Server Run karein
Browser me live changes dekhne ke liye:
```bash
npm run dev
```
Terminal me diye gaye link (jaise `http://localhost:5173`) ko browser me open karein.

### 2. Kahan Code Karna Hai?
- Apna component: `src/features/<aapka-feature>/` ke andar banayein.
- Apna city data: `src/data/<city>/<aapka-feature>.js` ke andar dalein.
- Common shared components (`src/components/common/`) ko bina team consensus ke na badlein.

---

## 🧪 Step 4: Verification (Push karne se pehle Zaroor karein)

Push karne se pehle ensure karein ki koi lint error ya build failure na aaye:

```bash
# 1. Linting check karein
npm run lint

# 2. Production build check karein (Koi error nahi aana chahiye)
npm run build
```

Agar dono commands successfully pass ho jayein, tabhi aage commit karein.

---

## 📦 Step 5: Commit & Push Karein

### 1. Changes Stage & Commit karein
```bash
git add .
git commit -m "feat(places): add category filter chips"
```
*(Commit message hamesha clear aur informative likhein).*

### 2. Branch ko GitHub par Push karein
```bash
git push -u origin feature/aapka-feature-name
```

---

## 🔀 Step 6: Pull Request (PR) Raise Karein

1. Push hone ke baad browser me **[github.com/Kislaya-06/Findia](https://github.com/Kislaya-06/Findia)** open karein.
2. Upar aapko ek yellow banner dikhega: **"Compare & pull request"**. Us green/blue button par click karein.
3. PR Form fill karein:
   - **Title**: Short summary (e.g. `feat: added heritage places filter`).
   - **Description**: Aapne kya add ya change kiya hai short points me likhein.
   - UI change kiya hai toh screenshot ya screen recording attach karein.
4. **"Create pull request"** button par click karein.

---

## 🎉 Step 7: Done! (Aage Kya Hoga?)

1. Maintainer aapka PR open karke check karega.
2. Agar koi change chahiye hoga, toh PR ke comments me bata diya jayega.
3. Sab kuch sahi hone par maintainer aapke PR ko **Approve** karke **Merge** kar dega!
4. Merge hote hi aap officially **FINDIA** ke **Contributor** ban jayenge aur GitHub Contributors page par aapka profile aa jayega!

---

## 💡 Quick Tips & Conflict Troubleshooting

### Agar aapka branch outdated ho jaye (`main` aage nikal gaya ho):
Agar aapka feature banate waqt kisi aur ka PR merge ho gaya hai:
```bash
git checkout main
git pull origin main
git checkout feature/aapka-feature-name
git merge main
```
Agar koi conflict aaye, toh code editor me accept changes karke `npm run build` run karein aur wapas commit & push kar dein.

---
Koi bhi doubt ho toh repo ke **Issues** section me pooch sakte hain! Happy Coding! 🚀
