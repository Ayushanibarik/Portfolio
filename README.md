# 🖥️ Ayush Animesh Barik — Digital Headquarters

A premium, production-ready digital headquarters and interactive portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Featuring a macOS-inspired workspace design, custom interactive panels, and an embedded Digital Twin AI Chat Assistant.

---

## 🌟 Key Features

*   **macOS Desktop Experience:** Fully responsive workspace environment complete with a glassmorphic top Menubar (with live clock) and a fluid bottom Dock for navigation and external links.
*   **Digital Twin AI Chat:** An interactive floating AI Chat assistant simulating a conversational interface, loaded with knowledge about Ayush's background, projects, education, and credentials.
*   **Flagship Project Spotlights:** Rich architectural breakdowns, technical highlights, challenges overcome, and future plans for multiple major engineering projects.
*   **Modern Interactive Components:** Leverages Framer Motion for state transitions, glassmorphism, responsive layouts, spatial cards, and micro-interactions.
*   **100% Data-Driven Architecture:** All copy, contact details, timeline milestones, and project case studies are managed inside a single, central database file (`src/data/site.ts`).

---

## 🛠️ Tech Stack

*   **Core Framework:** Next.js 15 (App Router), React 19
*   **Language:** TypeScript (Strict Mode)
*   **Styling:** Tailwind CSS (v3/v4 utility architecture)
*   **Animations:** Framer Motion (for fluid menus, Dock scaling, and spatial reveals)
*   **Icons:** Lucide React
*   **Analytics & Metadata:** SEO Optimized with Next.js dynamic metadata, robots, sitemap, OpenGraph, and Twitter cards.

---

## 📂 Highlighted Projects

### 1. PRAMANIKA (Flagship Case Study)
*   **Title:** AI-Powered Publication Title Admissibility & Verification System
*   **Purpose:** Automates and accelerates publication title verification and compliance verification in alignment with the *Press Registration of Periodicals Act*.
*   **Architecture:** Built an 8-layer NLP processing and verification pipeline connecting title ingestion, normalization, semantic comparison, rule-based verification, risk classification, and a reviewer governance review dashboard.
*   **Stack:** Python, FastAPI, Next.js, TypeScript, SQLite, SQLAlchemy, spaCy, PyTorch, scikit-learn, Sentence Transformers.

### 2. JanSevak
*   **Title:** AI-Powered Citizen Feedback & Prioritization System
*   **Purpose:** Aggregates multi-modal citizen grievances (voice, text, image, PDF) and objectively prioritizes municipal/public infrastructure works using GIS and AI scoring.
*   **Stack:** Flutter, Next.js, FastAPI, Python, PyTorch, PostgreSQL, PostGIS, Meta Llama 3, OpenAI Whisper.

### 3. SAVE
*   **Title:** Strategic Agent-Based Victim Evacuation System
*   **Purpose:** Coordinated disaster response platform optimizing real-time patient triage, emergency routing, hospital allocation, and automated communication.
*   **Stack:** Python, Flask, Streamlit, PyTorch, Twilio API, OpenStreetMap.

### 4. SafeChoice
*   **Title:** Restaurant Trust Index
*   **Purpose:** Food safety compliance and transparency platform, organizing public audit signals, consumer complaint workflows, and rating indices into a clear score.
*   **Stack:** Node.js, JavaScript, REST APIs.

---

## ⚙️ Customization & Structure

This codebase is designed for rapid customization. **All portfolio text, links, and content are stored in one single file:**

📂 `src/data/site.ts`

To update your portfolio details:
1.  Open [site.ts](file:///a:/Portfolio/src/data/site.ts).
2.  Edit the `site` object properties (e.g. `name`, `role`, `tagline`, `projects`, `skills`, `timeline`, `contact`).
3.  Save the changes. The Next.js dev server will instantly reflect the updates.

### Customizing Assets:
*   **Profile Portrait:** Replace `/images/ayush-portrait.jpg` in the `public/` directory or change the file path in `site.ts` under the `portrait` property.
*   **Resume PDF:** Replace `public/resume.pdf` with your actual resume PDF.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the portfolio live.

### 3. Production Build
To build and check the project for production readiness:
```bash
# Verify TypeScript
npm run typecheck

# Build and start
npm run build
npm run start
```

---

## 🌐 Deployment to Vercel

The easiest way to deploy this Next.js project is via the [Vercel Platform](https://vercel.com/new).

1.  Push your project updates to your GitHub repository:
    ```bash
    git add .
    git commit -m "Configure README and verify codebase"
    git push origin main
    ```
2.  Import your repository into a new project on Vercel.
3.  Vercel will auto-detect the Next.js framework. Use the default build and install configurations:
    *   **Framework Preset:** `Next.js`
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `.next`
    *   **Install Command:** `npm install`
4.  Click **Deploy**.

### Connecting a Custom Domain (GoDaddy Example)
1.  In Vercel, open your project and navigate to **Settings > Domains**.
2.  Add your domain (e.g., `ayushanimeshbarik.co.in` or `ayushanimeshbarik.com`).
3.  Configure your DNS records on GoDaddy:
    *   **Root Domain (`@`):** Type `A`, Name `@`, Value `76.76.21.21`, TTL `600` (or default).
    *   **Subdomain (`www`):** Type `CNAME`, Name `www`, Value `cname.vercel-dns.com`, TTL `600` (or default).
4.  Wait a few minutes for DNS propagation, then click **Refresh** in Vercel.

---

## 📜 License
Developed as a personal digital headquarters. Feel free to fork and adapt it for your own professional portfolio.
