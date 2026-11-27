# MyScholar 🎓🛡️
### Intelligent Scholarship Verification Portal & Scam Detector

**MyScholar** is a comprehensive scholarship verification web portal designed to protect students from predatory and fraudulent scholarship offers. It collects publicly available scholarship details and performs deep multi-vector heuristic analysis to identify misleading domains, fee demands, fake organizations, copied content, urgency pressure, and sensitive credential harvesting.

---

## 🚀 Key Capabilities

- **🌐 Domain & Host Analysis**: Detects typosquatting (e.g. mimicking Fastweb, CollegeBoard, NSP), disposable TLDs (`.xyz`, `.top`, `.buzz`, `.club`), raw IP addresses, missing HTTPS, and validates recognized `.gov`, `.gov.in`, `.nic.in`, `.edu`, and `.ac.in` institutional domains.
- **💳 Payment & Advance Fee Detection**: Identifies illegal upfront application fees, processing charges, wire transfers, cryptocurrency demands, and gift card schemes.
- **🏛️ Organization Verification**: Catches fictitious and vague sponsoring entities, cross-references legitimate national and international scholarship boards (such as India's National Scholarship Portal / PM-USP and global fellowships like Fulbright, NSF, DAAD, Chevening), and flags suspicious webmail contacts (e.g., Gmail/Yahoo used for official schemes).
- **📋 Copied Content & Template Detection**: Flags boilerplate scam templates, generic guarantees (*"100% guaranteed"*, *"you are a winner"*), and unedited placeholder texts.
- **🔒 Context-Aware Data Harvesting Defense**: Distinguishes authentic bank account details needed for **Direct Benefit Transfer (DBT)** or direct deposit disbursement from dangerous credential theft (passwords, ATM PINs, CVVs, and OTPs).
- **📊 Real-time Scoring & Risk Reports**: Generates instant 0–100 risk scores, severity-coded red flag breakdowns, and official safety recommendations.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Modern Glassmorphism Design
- **Runtime / Bundler**: Node.js & Webpack

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
MyScholar/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── verify/route.ts       # POST: Real-time scholarship analysis
│   │   ├── verify/page.tsx           # Verification submission tool with presets
│   │   ├── layout.tsx                # Global layout with navigation
│   │   └── page.tsx                  # Landing page & features overview
│   ├── components/
│   │   ├── Navbar.tsx                # Brand & navigation header
│   │   ├── VerificationForm.tsx      # Submission form with one-click presets
│   │   └── ReportView.tsx            # Visual risk meter & categorized flags
│   └── lib/
│       ├── analysis-engine.ts        # Core heuristic verification engine
│       └── types.ts                  # Type definitions & schemas
├── next.config.ts
├── package.json
└── tsconfig.json
```
