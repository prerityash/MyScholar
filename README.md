# MyScholar 🎓🛡️
### Intelligent Scholarship Verification Portal & Scam Detector

**MyScholar** is a comprehensive scholarship verification web portal designed to protect students from predatory and fraudulent scholarship offers. It collects publicly available scholarship details and performs deep multi-vector heuristic analysis to identify misleading domains, fee demands, fake organizations, copied content, urgency pressure, and sensitive credential harvesting.

---

## 🚀 Key Capabilities

- **🔐 Prisma ORM Authentication**: Complete user authentication system backed by **Prisma ORM** and SQLite. Features password hashing via `bcryptjs` and AES-encrypted HTTP-only session cookies.
- **📐 Centralized Zod Schema Validation**: Comprehensive request payload validation and client-side pre-validation powered by **Zod** (`registerSchema`, `loginSchema`, `scholarshipInputSchema`). Ensures safe type sanitization, trimmed inputs, and consistent error messaging.
- **🌫️ Blurred Background Login Overlay**: Unauthenticated visitors see the homepage gracefully blurred in the background with a centered, glassmorphic login and account creation modal. The navbar remains completely hidden until authentication succeeds.
- **🌓 Dynamic Light & Dark Mode**: Persistent theme toggle supporting dark and light themes with automatic system preference detection, custom CSS variables, and an adaptive brand logo (inverted white silhouette in dark mode, crisp black silhouette in light mode).
- **📸 1:1 Hero Slideshow**: Clean visual slideshow with smooth transitions, manual dot/arrow navigation, auto-advance timers, and custom high-resolution student celebration and cyber awareness posters.
- **🌐 Domain & Host Analysis**: Detects typosquatting (e.g., mimicking Fastweb, CollegeBoard, NSP), disposable TLDs (`.xyz`, `.top`, `.buzz`, `.club`), raw IP addresses, missing HTTPS, and recognizes legitimate `.gov`, `.gov.in`, `.nic.in`, `.edu`, and `.ac.in` domains.
- **💳 Payment & Advance Fee Detection**: Identifies illegal upfront application fees, processing charges, wire transfers, cryptocurrency demands, and gift card schemes.
- **🏛️ Organization Verification**: Catches fictitious and vague sponsoring entities, cross-references legitimate national and international scholarship boards (such as India's National Scholarship Portal / PM-USP and fellowships like Fulbright, NSF, DAAD, Chevening), and flags suspicious webmail contacts (Gmail/Yahoo used for official schemes).
- **📋 Copied Content & Template Detection**: Flags boilerplate scam templates, generic guarantees (*"100% guaranteed"*, *"you are a winner"*), and unedited placeholder texts.
- **🔒 Context-Aware Data Harvesting Defense**: Distinguishes authentic bank account details needed for **Direct Benefit Transfer (DBT)** or direct deposit disbursement from dangerous credential theft (passwords, ATM PINs, CVVs, and OTPs).
- **📊 Real-time Scoring & Risk Reports**: Generates instant 0–100 risk scores, severity-coded red flag breakdowns, category progress bars, and actionable safety recommendations.
- **💡 Built-in Sample Presets**: Includes one-click realistic test cases:
  1. 🇮🇳 PM-USP Central Sector Scheme (NSP Legitimate DBT)
  2. 🚨 Phishing & Advance Fee Scam (High Risk)
  3. ⚠️ Typosquatting & Data Harvesting (Suspicious)
  4. ✅ NSF Graduate Fellowship (US Legitimate)

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: JavaScript (ES Modules & React 19 JSX)
- **Schema Validation**: Zod
- **Database & ORM**: SQLite & Prisma ORM v6
- **Authentication**: Bcrypt password hashing & AES-256 encrypted session cookies
- **Styling**: Tailwind CSS & Custom Modern Glassmorphic CSS Variables
- **Bundler**: Webpack

---

## 💻 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Initialize the Database
Generate the Prisma Client and create the SQLite database:
```bash
npx prisma db push
```

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📁 Clean File Hierarchy

```
MyScholar/
├── prisma/
│   └── schema.prisma             # Prisma schema & SQLite User model
├── public/
│   ├── logo.png                  # Adaptive silhouette graduation cap logo
│   └── slides/                   # 1:1 hero aspect-ratio slideshow images
│       ├── slide1.jpg            # School students photo
│       ├── slide2.jpg            # College students photo
│       └── slide3.jpg            # Cyber scam awareness alert poster
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── auth/
│   │   │   │   ├── login/route.js    # POST: Authenticate user & set session cookie
│   │   │   │   ├── logout/route.js   # POST: Clear session cookie
│   │   │   │   ├── me/route.js       # GET: Validate session & return user info
│   │   │   │   └── register/route.js # POST: Create account with Prisma
│   │   │   └── verify/route.js       # POST: Real-time scholarship analysis
│   │   ├── verify/
│   │   │   └── page.jsx          # Protected scholarship verification tool
│   │   ├── favicon.ico           # Application favicon
│   │   ├── globals.css           # Glassmorphism, theme variables & animations
│   │   ├── layout.jsx            # Root layout with AuthProvider & theme bootstrap
│   │   └── page.jsx              # Landing page with blur overlay & hero slideshow
│   ├── components/
│   │   ├── AuthModal.jsx         # Sign in / Register modal with theme toggle
│   │   ├── HeroSlideshow.jsx     # 1:1 auto-advancing slideshow with dots & arrows
│   │   ├── Navbar.jsx            # Authenticated navigation bar & logout
│   │   ├── ReportView.jsx        # Visual risk gauge & categorized red flags
│   │   ├── ThemeToggle.jsx       # Light / Dark mode toggle switch
│   │   └── VerificationForm.jsx  # Multi-vector submission form with sample presets
│   ├── context/
│   │   └── AuthContext.jsx       # Global authentication state & session provider
│   └── lib/
│       ├── analysis-engine.js    # Heuristic verification & scoring engine
│       ├── prisma.js             # PrismaClient singleton instance
│       ├── schemas.js            # Centralized Zod schemas & error formatting
│       └── session.js            # Encrypted session token generator & validator
├── eslint.config.mjs             # ESLint configuration
├── jsconfig.json                 # Path aliases configuration (@/* -> ./src/*)
├── next.config.mjs               # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Project documentation
```

---

## 🛡️ License
Private repository for MyScholar scholarship verification portal.
