<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-green?style=for-the-badge&logo=mongodb&logoColor=white" alt="MERN Stack" />
  <img src="https://img.shields.io/badge/AI-Gemini%203.5-blue?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/Node.js-Express%205-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License" />
</p>

<h1 align="center">🧘 InnerPulse</h1>
<h3 align="center">AI-Powered Yoga & Mindfulness Wellness Platform</h3>

<p align="center">
  <i>A digital sanctuary that transforms traditional fitness tracking into an intelligent, emotionally-aware wellness companion.</i>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-api-reference">API Reference</a> •
  <a href="#-project-structure">Project Structure</a> •
  <a href="#-future-scope">Future Scope</a>
</p>

---

## 📋 About

**InnerPulse** is a full-stack web application that delivers a personalized yoga and wellness experience powered by artificial intelligence. It integrates guided yoga sessions, breathwork training, mood tracking, and an AI wellness chatbot (Google Gemini) into a unified platform — all tailored to the user's stress level, flexibility, and wellness goals through a hybrid recommendation engine.

The platform features a gamification engine with streak tracking, consistency scoring, and a composite **Zen Score** to encourage sustained practice, along with a premium glassmorphism UI built with Framer Motion animations.

---

## ✨ Features

### 🤖 AI Wellness Guru
- Conversational chatbot powered by **Google Gemini 3.5 Flash**
- Personalized responses based on user's stress level, flexibility, and mood history
- 7 suggested quick prompts for common wellness topics
- Intelligent **rule-based fallback** when AI is unavailable (covers 6 topic categories)

### 🧘 Guided Yoga Sessions
- Timer-based pose-by-pose progression with animated transitions
- Visual progress bar with completion percentage
- Automatic session logging with stat updates
- Multiple curated flows: Morning, Stress Relief, Sleep, Flexibility, Balance

### 🌬️ Breathwork Trainer
- Animated 4-7-8 breathing technique with expanding/contracting visual orb
- Phase indicators: Inhale (4s) → Hold (7s) → Exhale (8s)
- Cycle counter and total session time tracking

### 📊 Intelligent Dashboard
- Time-of-day personalized greeting
- AI-generated daily flow recommendation with reasoning
- 7-day activity trend chart (Recharts)
- Real-time mood status with latest stress score
- Quick-action navigation to all features

### 😊 Mood Tracker
- Emoji-based mood selection (Happy, Neutral, Stressed, Very Stressed)
- Stress level slider (1-10) with dynamic status labels
- Free-text reflection journal
- Dynamic background glow based on selected mood

### 📚 Yoga Library
- Searchable asana encyclopedia (English & Sanskrit names)
- Filter by difficulty (Beginner / Intermediate / Advanced)
- Filter by category (Standing, Seated, Inversion, Core, Backbend, Balancing, Restorative)
- Detail modal with pose description, benefits, and hold time

### 🎮 Gamification Engine
- **Streak tracking** — Consecutive day monitoring with longest streak record
- **Consistency Score** — 7-day rolling active percentage
- **Zen Score** — Composite metric: `(consistency × 0.4) + (streak × 2) + (sessions × 0.5)`

### 🧠 Hybrid Recommendation Engine
- Multi-factor algorithm analyzing stress, streak, flexibility, and goals
- Time-aware daily flow selection based on time of day
- 6 distinct flow types: Nervous System Reset, Stoic Resilience, Celestial Foundation, Solar Plexus Activation, Ascendance Flow, Sanctuary Protocol

### 🔐 Authentication & Security
- JWT-based stateless authentication (30-day expiry)
- Bcrypt password hashing (10 salt rounds)
- Protected routes with middleware verification
- 4-step personalization onboarding wizard

---

## 🛠️ Tech Stack

### Frontend

| Technology      | Version | Purpose                  |
| --------------- | ------- | ------------------------ |
| React           | 19.2    | UI framework             |
| Vite            | 8.0     | Build tool & dev server  |
| TailwindCSS     | 3.4     | Utility-first styling    |
| Framer Motion   | 12.38   | Animations & transitions |
| Redux Toolkit   | 2.11    | State management         |
| React Router    | 7.14    | Client-side routing      |
| Recharts        | 3.8     | Data visualization       |
| Axios           | 1.15    | HTTP client              |
| Lucide React    | 1.12    | Icon library             |
| react-markdown  | 10.1    | AI response rendering    |

### Backend

| Technology      | Version   | Purpose          |
| --------------- | --------- | ---------------- |
| Node.js         | 20+       | Runtime          |
| Express         | 5.2       | Web framework    |
| MongoDB         | 7+        | Database         |
| Mongoose        | 9.6       | ODM              |
| JWT             | 9.0       | Authentication   |
| Bcrypt          | 6.0       | Password hashing |
| Google Gemini   | 3.5 Flash | AI chatbot       |

---

## 📸 Screenshots

### 🏠 Landing Page

![Landing Page Hero](./Project%20Screenshorts/landing_1.png)

![Landing Page Collections](./Project%20Screenshorts/Langing_2.png)

![Landing Page Methodology](./Project%20Screenshorts/landing_3.png)

### 🔐 Authentication

![Login](./Project%20Screenshorts/login.png)

![Register](./Project%20Screenshorts/register.png)

### 📝 Onboarding

![Onboarding Step 1](./Project%20Screenshorts/onboarding_1.png)

![Onboarding Step 2](./Project%20Screenshorts/onboarding_2.png)

![Onboarding Step 3](./Project%20Screenshorts/onboarding_3.png)

![Onboarding Step 4](./Project%20Screenshorts/onboarding_4.png)

### 📊 Dashboard

![Dashboard Hero](./Project%20Screenshorts/dashboard_1.png)

![Dashboard Charts](./Project%20Screenshorts/dashboard_2.png)

![Dashboard Sidebar](./Project%20Screenshorts/dashboard_3.png)

### 🤖 AI Guru & Library

![AI Guru Chat](./Project%20Screenshorts/AI_yoga_guru.png)

![Asana Library](./Project%20Screenshorts/Asanas_library.png)

### 👤 Profile

![Profile Page](./Project%20Screenshorts/profile%20(2).png)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v20 or higher
- **MongoDB** v7+ (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/apikey))

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/your-username/innerpulse-platform.git
cd innerpulse-platform
```

**2. Set up the backend**
```bash
cd server
npm install
```

**3. Configure environment variables**
```bash
cp .env.example .env
```

Edit `server/.env` with your credentials:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/innerpulse
JWT_SECRET=your-super-secret-key-here

GEMINI_API_KEY=your-gemini-api-key
GEMINI_API_VERSION=v1
GEMINI_MODEL=gemini-3.5-flash
```

**4. Set up the frontend**
```bash
cd ../client
npm install
```

**5. Start the development servers**

In one terminal — start the backend:
```bash
cd server
npm run dev
```

In another terminal — start the frontend:
```bash
cd client
npm run dev
```

**6. Open in browser**
```
Frontend:  http://localhost:5173
Backend:   http://localhost:5000
API Health: http://localhost:5000/api/health
```

---

## 📂 Project Structure

```
innerpulse-platform/
├── client/                          # React Frontend (Vite)
│   ├── public/                      # Static assets & images
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/                # Auth-related components
│   │   │   ├── breathing/           # Breathing exercise components
│   │   │   ├── common/              # Navbar, PrivateRoute, PageTransition
│   │   │   ├── dashboard/           # Dashboard widgets
│   │   │   ├── layout/              # Layout components
│   │   │   ├── ui/                  # Reusable UI (Skeleton, etc.)
│   │   │   ├── widgets/             # Feature widgets
│   │   │   └── yoga/                # Yoga-related components
│   │   ├── context/
│   │   │   └── ThemeContext.jsx      # Dark/light mode provider
│   │   ├── pages/                    # 16 page components
│   │   │   ├── Landing.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Onboarding.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── YogaSession.jsx
│   │   │   ├── Breathing.jsx
│   │   │   ├── GuruChat.jsx
│   │   │   ├── MoodTracker.jsx
│   │   │   ├── YogaLibrary.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Settings.jsx
│   │   │   └── ...                   # About, Research, Privacy, Terms
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/
│   │   │       ├── authSlice.js
│   │   │       └── dashboardSlice.js
│   │   ├── services/
│   │   │   └── api/api.js            # Axios client with JWT interceptor
│   │   ├── App.jsx                   # Root component with routing
│   │   └── main.jsx                  # Entry point
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                           # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── aiGuruController.js   # Gemini AI chat + recommendation logic
│   │   │   ├── apiController.js      # Dashboard, session, mood endpoints
│   │   │   ├── authController.js     # Register, login, onboarding
│   │   │   └── yogaController.js     # Yoga flows, poses, asanas
│   │   ├── middleware/
│   │   │   └── authMiddleware.js     # JWT verification
│   │   ├── models/
│   │   │   ├── User.js               # User schema with profile & stats
│   │   │   ├── Session.js            # Yoga & breathing session logs
│   │   │   ├── MoodLog.js            # Mood tracking records
│   │   │   ├── YogaFlow.js           # Curated yoga sequences
│   │   │   ├── Asana.js              # Individual pose encyclopedia
│   │   │   └── Recommendation.js     # AI-generated daily suggestions
│   │   ├── services/
│   │   │   └── recommenderService.js # Daily wellness flow algorithm
│   │   └── data/
│   │       └── yogaPoses.js          # Static yoga pose data
│   ├── server.js                     # Express app entry point
│   ├── seed.js                       # Database seeding script
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 📡 API Reference

### Authentication

| Method | Endpoint               | Auth | Description             |
| ------ | ---------------------- | ---- | ----------------------- |
| POST   | `/api/auth/register`   | No   | Create new account      |
| POST   | `/api/auth/login`      | No   | Login and get JWT       |
| GET    | `/api/auth/profile`    | Yes  | Get user profile        |
| POST   | `/api/auth/onboarding` | Yes  | Save onboarding data    |

### AI Guru

| Method | Endpoint             | Auth | Description                  |
| ------ | -------------------- | ---- | ---------------------------- |
| POST   | `/api/ai/guru-chat`  | Yes  | Chat with AI wellness mentor |

### Dashboard and Activity

| Method | Endpoint             | Auth | Description               |
| ------ | -------------------- | ---- | ------------------------- |
| GET    | `/api/dashboard`     | Yes  | Aggregated dashboard data |
| POST   | `/api/session`       | Yes  | Log breathing session     |
| POST   | `/api/mood`          | Yes  | Log mood and stress       |
| GET    | `/api/mood/history`  | Yes  | Last 30 mood entries      |
| GET    | `/api/user/profile`  | Yes  | Profile page stats        |

### Yoga

| Method | Endpoint              | Auth | Description          |
| ------ | --------------------- | ---- | -------------------- |
| GET    | `/api/yoga/flows`     | Yes  | All yoga flows       |
| GET    | `/api/yoga/flow/:id`  | Yes  | Single flow by ID    |
| GET    | `/api/yoga/poses`     | Yes  | Static pose data     |
| GET    | `/api/asanas`         | Yes  | All asanas from DB   |
| POST   | `/api/yoga/session`   | Yes  | Log yoga session     |

### Wellness

| Method | Endpoint                   | Auth | Description              |
| ------ | -------------------------- | ---- | ------------------------ |
| GET    | `/api/wellness/daily-flow` | Yes  | AI daily recommendation  |

> **Auth = Yes** means the request requires an `Authorization: Bearer <token>` header

---

## 🗄️ Database Schema

```
MongoDB: innerpulse (6 collections)

Users         → name, email, password, profile{}, stats{}, biometricHistory[]
Sessions      → userId, type, name, duration, flowId, completed
MoodLogs      → userId, mood, stressScore, note
YogaFlows     → flowName, category, difficulty, poses[], duration
Asanas        → name, sanskritName, difficulty, category, benefits, image
Recommendations → userId, flow, flowId, duration, breathing, reason
```

---

## 🧠 Key Algorithms

### Recommendation Decision Tree
```
Stress > 7 AND Streak < 3  → Nervous System Reset (10 min)
Stress > 7 AND Streak ≥ 3  → Stoic Resilience Flow (20 min)
Flexibility = Low           → Celestial Foundation (15 min)
Goal = Focus/Energy         → Solar Plexus Activation (25 min)
Stress < 4 AND Streak > 5  → Ascendance Flow (30 min)
Default                     → Sanctuary Protocol (15 min)
```

### Zen Score
```
Zen = min(100, (Consistency% × 0.4) + (Streak × 2) + (TotalSessions × 0.5))
```

---

## 🔮 Future Scope

- 🎵 **Audio/Video guidance** for poses and breathing sessions
- 🌬️ **Multiple breathing techniques** (Box Breathing, Wim Hof, Nadi Shodhana)
- 🤖 **AI-generated custom flows** using Gemini
- 📈 **Advanced analytics** with mood heatmaps and session-to-mood correlation
- ⌚ **Wearable integration** (Apple Health / Google Fit)
- 🏆 **Achievement badges** and XP-based leveling system
- 👥 **Social features** — friends, group sessions, leaderboards
- 📱 **PWA / Mobile app** with offline support
- 💳 **Subscription model** (Free / Premium / Pro tiers)
- 🌍 **Multi-language support** (Hindi, Spanish, French, Japanese)
- 🔒 **Security hardening** — rate limiting, OAuth, refresh tokens

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Your Name**

- GitHub: [@your-username](https://github.com/your-username)
- LinkedIn: [Your Name](https://linkedin.com/in/your-profile)

---

<p align="center">
  <b>Built with 🧘 mindfulness and ☕ caffeine</b>
  <br><br>
  <i>InnerPulse — Master Your Internal Gravity.</i>
</p>
