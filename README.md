# LeadAI - Lead Intelligence Platform 🚀

LeadAI (PDC Lead Intelligence) is an end-to-end automated business discovery, website verification, AI qualification scoring, and sales pipeline CRM platform.

---

## 🌟 Key Features

- **Google Places API (New) Discovery Engine**: Queries businesses using Google's Places API v1 (`searchText`) with automatic query splitting, radius targeting, and comprehensive field masking (formatted address, international phone numbers, website URIs, ratings, reviews, opening hours).
- **Automated Digital Audit Engine**: Performs on-the-fly technical audits of prospective business websites, checking SSL status, mobile responsiveness, meta tags, OpenGraph data, social presence (Instagram, Facebook, LinkedIn, Twitter, YouTube), and contact forms.
- **AI Qualification & Pain-Point Scoring**: Leverages Groq-accelerated LLMs (`qwen/qwen3.8-27b`) to evaluate lead viability, identify digital gaps, and craft customized outreach pitch angles.
- **Interactive CRM Kanban Pipeline**: Manage leads across customizable stages (*Discovered*, *Contacted*, *Engaged*, *Meeting Scheduled*, *Proposal Sent*, *Won / Closed*, *Lost*).
- **Export & Reporting**: Instant export of qualified lead lists to CSV/Excel format.
- **Multi-Channel Outreach Tracker**: Direct messaging templates and tracking across WhatsApp, Instagram DM, and Email.

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, React Router, Framer Motion, SCSS, React Icons
- **Backend**: Node.js, Express.js, Mongoose / MongoDB
- **APIs & AI**: Google Places API (New), Groq Cloud AI (`qwen/qwen3.8-27b`)
- **Deployment**: GitHub Pages (`/docs` or GitHub Actions workflow)

---

## 🚀 Live Demo & Deployment

This repository is configured for automated deployment to **GitHub Pages**:
- **GitHub Actions Workflow**: `.github/workflows/deploy.yml` automatically builds and deploys upon every push to the `main` branch.
- **Static `/docs` Folder**: The production build is compiled into `/docs` for GitHub Pages branch deployment (`main` branch -> `/docs` folder).

### Enabling GitHub Pages on Your Fork / Repo:
1. Go to your repository on GitHub: `Settings` > `Pages`.
2. Under **Build and deployment**:
   - **Option A (GitHub Actions)**: Select `GitHub Actions` as the Source.
   - **Option B (Deploy from branch)**: Select `Deploy from a branch`, choose branch `main`, and folder `/docs`.
3. Save changes. Your live site will be accessible at `https://<username>.github.io/<repo-name>/`.

---

## 💻 Local Setup & Development

### 1. Prerequisites
- Node.js (v18 or v20+)
- MongoDB running locally on `mongodb://127.0.0.1:27017` (or MongoDB Atlas URI)

### 2. Backend Setup
```bash
cd server
cp .env.example .env
# Edit .env with your Google Maps API Key and Groq AI API Key
npm install
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

### 4. Build for Production / Docs
```bash
cd client
npm run build
```
This compiles the production assets into `/docs` ready for GitHub Pages hosting.
