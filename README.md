# Draft — AI Study Tool
# Draft — Next-Gen AI Study & Exam Platform

Turn any PDF into a summary, quiz, and flashcards instantly using Claude AI.
Turn any lecture PDF, syllabus, or notes into active recall flashcards, timed multiple-choice exam simulations, executive cheat sheets, and conversational AI tutoring.

## Tech Stack
Inspired by ExamCrush, redesigned with an elevated **Obsidian & Electric Indigo / Gold** design system, instant audio text-to-speech recitation, spaced repetition queues, and zero-friction offline persistence.

- React 18 + Vite
- Tailwind CSS
- PDF.js (text extraction)
- Anthropic API (Claude Haiku)
---

## Tech Stack & Architecture

- **React 18 + Vite**: Lightning-fast compilation and reactive UI state
- **Tailwind CSS**: Custom obsidian dark mode, glassmorphism surfaces, and 3D perspective animations
- **Lucide React**: Clean vector icon suite
- **Canvas Confetti**: Visual celebration on exam mastery and quiz completion
- **Web Audio API**: Native synthesized study chimes, card flip sounds, and fanfare without heavy audio assets
- **Web Speech Synthesis**: Hands-free auditory learning for flashcards and quiz questions
- **PDF.js**: Client-side PDF text extraction
- **Anthropic Claude API & Local Fallback**: Automatic curriculum parsing with fallback generation for zero-friction local testing

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Add your API key

Copy the example env file:

### 2. Configure API key (Optional)
Draft includes ready-to-study sample decks and an offline generator out of the box. To enable live Claude AI extraction on your custom PDFs, add your key to `.env`:
```bash
cp .env.example .env
VITE_ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

Then open `.env` and paste your Anthropic API key:

```
VITE_ANTHROPIC_API_KEY=sk-ant-...
```

Get your key at https://console.anthropic.com

### 3. Run the dev server

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

Open http://localhost:5173 in your browser.

## Build for Production

### 4. Build for Production
```bash
npm run build
```

Deploy the `dist/` folder to Vercel, Netlify, or any static host.
---

**Important:** Before deploying to production, move the API calls to a backend
(e.g. a Vercel API route or Express server) so your API key is not exposed
in the browser. The current setup is fine for local development and testing.
## Features & Superpowers

1. **High-Converting Landing Page**:
   - Live sample deck preview without signing in
   - Value propositions, Nigerian university trust badges, tiered student pricing with custom contribution slider, verified student testimonials, and interactive FAQ accordion.
2. **Student Dashboard Command Center**:
   - Personalized greeting, daily streak flame with 7/30/60/90-day milestone locks, total XP counter, and active deck mastery progress.
3. **Curriculum Creation Studio**:
   - Upload PDF or paste text notes.
   - Interactive Topic Curation Modal to select specific exam topics before generation.
   - Target card/question count sliders and difficulty level targeting (High School, Undergrad, Exam Prep).
4. **Active Recall Flashcards Study Engine**:
   - 3D perspective flip card animations.
   - Keyboard speed shortcuts: `[Spacebar]` to flip, `[1]` for Still Learning, `[2]` for Know / Mastered.
   - Difficult cards automatically re-queue at the end of the deck for spaced repetition.
   - Native audio Text-to-Speech playback.
5. **Timed Practice MCQ Simulator**:
   - Exam stopwatch timer, question status grid, instant answer reveal, and comprehensive explanations.
   - **"Ask AI Tutor: Why is this wrong?"** button for instant Socratic clarification on missed questions.
   - Results breakdown with circular score gauge and one-click review mode.
6. **24/7 Lumina AI Study Tutor**:
   - Conversational AI tutor grounded directly in your uploaded notes.
   - Quick prompts for "Explain like I'm 5", mnemonic generation, and formula summaries.
7. **Executive Summary & Cheat Sheets**:
   - Executive overview, core principles checklist, high-yield exam tips, and formula cheat sheet.
   - **Export to Markdown** and printable study sheets with one click.
8. **Offline Persistence**:
   - All custom sets, study streaks, and XP points are automatically saved in `localStorage`.

---

## Project Structure

```
src/
├── App.jsx                  # Main app, phase management
├── main.jsx                 # React entry point
├── index.css                # Tailwind + global styles
├── main.jsx                     # Application entry point
├── App.jsx                      # StudyProvider wrapper & AppShell
├── index.css                    # Tailwind + 3D flip card utilities & glow mesh
├── context/
│   └── StudyContext.jsx         # Global state (study sets, active deck, XP, streak, sound)
├── lib/
│   ├── claude.js            # All Anthropic API calls
│   └── pdf.js               # PDF text extraction
│   ├── claude.js                # AI integration, topic extraction, and fallback generator
│   ├── pdf.js                   # Client-side PDF text extraction
│   ├── sound.js                 # Web Audio API synthesizer for study chimes
│   └── sampleData.js            # Preloaded academic study sets (OS, Anatomy, etc.)
├── hooks/
│   └── useSpeech.js             # Web Speech Synthesis hook
├── views/
│   ├── AppShell.jsx             # View router (landing vs dashboard vs engines)
│   └── LandingView.jsx          # Full landing page composite
└── components/
    ├── Header.jsx            # Top nav
    ├── UploadZone.jsx        # PDF upload + drag-and-drop
    ├── ProcessingView.jsx    # Loading screen
    ├── StudyPack.jsx         # Tab shell (summary/quiz/flashcards)
    ├── SummaryTab.jsx        # Overview + key points + exam tips
    ├── QuizTab.jsx           # MCQ quiz with scoring
    └── FlashcardsTab.jsx     # Flip cards
    ├── common/
    │   ├── Navbar.jsx           # Top navigation bar with search, streak, and XP
    │   ├── Sidebar.jsx          # Collapsible navigation drawer
    │   ├── Modal.jsx            # Accessible dialog modal
    │   └── Badge.jsx            # Status badges
    ├── landing/                 # Hero, ValueProps, UniversityTrust, Features, Pricing, Testimonials, FAQ, Footer
    ├── dashboard/               # Action hub, quick cards, recent sets list
    ├── studio/                  # Creation studio & TopicSelectorModal
    ├── flashcards/              # FlashcardStudy engine & FlashcardSummary
    ├── quiz/                    # QuizPractice engine & QuizResults
    ├── tutor/                   # AITutorChat component
    └── summary/                 # StudySummaryView & markdown exporter
```

## Switching Models

To use a different Claude model, edit `src/lib/claude.js`:

```js
// Cheapest (fastest, good quality)
model: 'claude-haiku-4-5-20251001'

// Better quality (costs ~4x more)
model: 'claude-sonnet-4-6'
```

## Cost Estimate

Using Claude Haiku at current rates (~$1/$5 per million tokens):
- Each PDF upload costs roughly ₦14–27 in API calls
- 100 students uploading 3 PDFs/month ≈ ₦4,200–8,100/month
