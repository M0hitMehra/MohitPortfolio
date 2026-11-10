# ⚡ Mohit Mehra — Neumorphic Software Engineering Portfolio

A responsive, high-performance developer portfolio built with an authentic **Neumorphism Design System** inspired by your provided references (Sleek Dark Tesla Cybertruck + Soft Light Fitness Clay UI).

---

## 🌟 Key Features

1. **Dual Neumorphic Themes (Directly from Reference)**:
   - **Cybertruck Dark Mode** (Default): Gunmetal matte surfaces, tactile double shadows, glowing electric cyan dials, and illuminated indicators.
   - **Fitness Clay Light Mode**: Soft off-white clay surfaces, smooth embossed and debossed cards, and vibrant pastel progress capsules.
   - Seamless one-click theme switcher with persistent local storage.

2. **Single-File Content Architecture (`portfolio-data.js`)**:
   - **All texts, external links, social handles, image URLs, metrics, projects, skills, and work experience live in `portfolio-data.js`**.
   - Whenever you want to add a project, update a link, or tweak your resume, you only edit `portfolio-data.js` — no HTML or CSS edits needed!

3. **Interactive Control Pod (Reference UI Replica)**:
   - **Circular Gauge Dial**: Visualizes production metrics (`1,000+ RPS`, `80% Sync Overhead Saved`, `20ms Query Latency`, `99.98% Uptime`).
   - Clicking the dial or tabs cycles through your live engineering benchmarks.
   - **Vertical Stat Capsules**: Replicates the reference's `Relax 82%`, `Strength 54%`, `Stretch 91%` pill meters with glowing gradient fills.

4. **Integrated ATS-Ready Resume & 1-Click Print**:
   - Built-in "View Full Resume" modal rendering your complete SDE-2 experience, projects, skills, and education.
   - Includes a **"Print / Save PDF"** button with print-optimized CSS for recruiters.

5. **Tactile Sound Effects**:
   - Realistic physical click synthesized directly with the HTML5 Web Audio API (zero external audio files needed). Can be toggled on/off anytime.

6. **Fully Responsive for Mobile, Tablet & PC**:
   - Fluid grid layouts, touch-friendly tactile cards, and collapsible mobile drawer.

7. **One-Click Quick Copy**:
   - Instant clipboard copy for your email (`mehramohit532@gmail.com`) and phone (`+91 9625945952`) with toast notifications.

---

## 📂 Project Structure

```text
portfolio/
├── index.html            # Clean semantic HTML markup & layout
├── style.css             # Pure Neumorphic CSS design system (Dark & Light variables)
├── portfolio-data.js     # ⭐ SINGLE SOURCE OF TRUTH (All links, text & assets)
├── app.js                # Dynamic rendering engine, sound synth & interactions
└── README.md             # Documentation & deployment guide
```

---

## 🛠️ How to Update Your Information

Open `portfolio-data.js` in any code editor. You will find clearly commented sections:

```javascript
// --- Personal & Contact Information ---
personal: {
  fullName: "Mohit Mehra",
  title: "Software Development Engineer - 2 (SDE-2)",
  email: "mehramohit532@gmail.com",
  phone: "+91 9625945952",
  avatarUrl: "https://avatars.githubusercontent.com/u/98013205?v=4",
  ...
}

// --- Featured Projects ---
projects: [
  {
    id: "mcp-ai-platform",
    title: "Model Context Protocol (MCP) AI Tooling Server",
    githubUrl: "https://github.com/M0hitMehra/chat-mcp-fastapi",
    liveUrl: "https://chat-mcp-fastapi.onrender.com/",
    ...
  }
]
```

Save the file and refresh your browser. Everything updates automatically!

---

## 🚀 How to Preview & Run Locally

### Option 1: Direct File Open
Simply double-click `index.html` or drag it into any web browser (Chrome, Edge, Firefox, Safari).

### Option 2: Using Node or Python Local Server
```bash
# With Node.js npx
npx serve portfolio

# Or with Python
python -m http.server 3000 --directory portfolio
```
Then navigate to `http://localhost:3000` in your browser.

---

## 🌐 Free 1-Click Deployment

### Deploy to GitHub Pages:
1. Push this folder to a GitHub repository (e.g. `M0hitMehra/portfolio` or `M0hitMehra.github.io`).
2. Go to **Repository Settings** > **Pages**.
3. Select the `main` branch and `/` (or `/portfolio`) root directory, then click **Save**.
4. Your portfolio will be live at `https://m0hitmehra.github.io` in under 60 seconds!

### Deploy to Vercel or Netlify:
- Drag and drop the `portfolio` folder directly into [Vercel](https://vercel.com) or [Netlify](https://netlify.com) for instant global edge deployment with zero configuration.
