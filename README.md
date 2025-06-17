# 🎓 UniPron
An interactive educational escape room game for university students studying computer science and engineering.

<div align="center">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&amp;logo=typescript&amp;logoColor=white">
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=flat&amp;logo=react&amp;logoColor=61DAFB">
<img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=flat&amp;logo=vite&amp;logoColor=white">
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&amp;logo=tailwind-css&amp;logoColor=white">

  Navigate through 12 challenging levels that mirror real academic subjects

## 🎮 Play Now • 📖 Documentation • 🤝 Contributing

</div>

### 🎯 About
UniPron transforms university-level STEM education into an engaging puzzle-solving adventure. Players progress through interconnected levels featuring programming challenges, circuit-building tasks, and logic puzzles set in a mysterious digital world.

### 🌟 Key Features
12 Unique Levels - Each with distinct mechanics and educational themes

Real Academic Content - Based on actual computer science and engineering coursework

Interactive Learning - Hands-on problem solving rather than passive consumption

Progressive Difficulty - From basic concepts to advanced technical challenges

Immersive Storytelling - University life meets escape room mechanics

### 🎮 Game Levels
**`WARNING`**: Do not unwrap any of the levels below, to not spoil the game! Play it first!
<details> 
  <summary>
    <strong>🏠 Level 1: Welcome</strong>
  </summary> 
  University recruitment announcement with a twist - your journey into academic chaos begins.
</details>

<details>
  <summary>
    <strong>⚙️ Level 2: System Maintenance</strong>
  </summary> 
USOS system malfunction requires your assistance. Find the "W" key in the heart of the machine.
<br/> <br/>
Hidden mechanics: Press 'W' for auto-complete
  
Skills: Problem solving, pattern recognition
</details>

<details> 
  <summary>
    <strong>🤖 Level 3: Machine W Debugging</strong>
  </summary>
Debug assembly-like code based on fictional W-Machine (von Neunmann architecture simple computer). \
Fix the program by correcting command syntax.
<br/> <br/>
Challenge: Assembly code debugging
  
Skills: Programming logic, syntax correction
</details>

<details>
  <summary>
    <strong>📚 Level 4: Mathematical Analysis</strong>
  </summary>
Navigate through multiple exam terms. Experience the reality of university mathematics.
<br/><br/>

Progression: Term 0 → Term 1 → Term 2 → Term 3 \
Theme: Academic perseverance and mathematical proofs
</details>

<details>
  <summary>
    <strong>🔬 Level 5: Physics Surveillance</strong>
  </summary>
  Answer physics questions under watchful security cameras. Anti-cheating detection active!
<br/><br/>

Security: DevTools detection \
Challenge: Define entropy without external help \
Skills: Physics knowledge, academic integrity
</details>

<details> 
  <summary>
    <strong>⚡ Level 6: Electrical Castle</strong>
  </summary>
  Solve electrical engineering puzzles by pulling the correct levers. Build formulas using physical units.
<br/><br/>

Formulas: R = U/I, P = U×I, E = P×t (in corresponding units) \
Mechanics: Lever pulling, formula construction \
Skills: Electrical engineering, unit relationships
</details>

<details>
  <summary>
    <strong>📄 Level 7: Report Formatting</strong>
  </summary>
  Format a laboratory report to meet strict requirements.
<br/><br/>

Challenge: Font = Calibri, Size = 11-12pt \
Skills: Attention to detail, academic standards
</details>

<details>
  <summary>
    <strong>💻 Level 8: Programming Detective</strong>
  </summary>
  Solve programming puzzles using browser DevTools. Answers hidden in various locations.
<br/><br/>

Tools: LocalStorage, Console, CSS, Network tab, HTML comments \
Skills: Web development, debugging techniques
</details>

<details>
  <summary>
    <strong>🔐 Level 9: Terminal Access</strong>
  </summary>
  Matrix-style terminal interface with SSH simulation and data form completion.
<br/><br/>

Environment: Realistic terminal simulation \
Challenge: Navigate filesystem, complete data forms \
Skills: Command line proficiency, data handling
</details>

<details>
  <summary>
    <strong>💾 Level 10: Algorithm Archives</strong>
  </summary>
Quiz based on historical exam data found in the FTP disk simulation.
<br/><br/>

Requirement: Explore in-app resources for answers \
Challenge: 8 questions about past examinations \
Skills: Research, academic database navigation
</details>

<details>
  <summary>
    <strong>🔌 Level 11: Circuit Assembly</strong>
  </summary>
Build a functional LED circuit with optional assistance.
<br/><br/>

Components: Battery, switch, resistors, LEDs, capacitor, wires \
Mechanics: Drag & drop, connection building \
Skills: Electronics, circuit design
</details>

<details>
  <summary>
    <strong>🏦 Level 12: Bank Pac-Man</strong>
  </summary>
Pac-Man inspired finale! Collect dots while avoiding aggressive bank employees.
<br/><br/>

Controls: WSAD movement \
Enemies: mBank and ING representatives with marketing messages \
Power-ups: Beer pellets for temporary invincibility \
Skills: Quick reflexes, strategic navigation
</details>

<hr/>

### 🛠️ Installation & Setup
#### Prerequisites
- Node.js 16+
- npm or yarn

#### Quick Start

```bash
# Clone the repository
git clone https://github.com/szymonwilczek/unipron.git
cd unipron

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

#### Vercel Deployment
The project includes a vercel.json configuration for proper SPA routing:

```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
<hr/>

### 🎯 Game Mechanics
#### 🔑 Hidden Features
Level 2: Press 'W' for automatic password completion \
Level 5: Real-time cheating detection using DevTools monitoring \
Level 8: Multiple hidden answer locations throughout browser tools \
Level 9: Persistent form overlay with terminal interaction
#### 🎮 Interactive Elements
Drag & Drop: Circuit building in Level 11 \
Real-time Physics: Pac-Man movement and collision detection \
Terminal Simulation: Full command-line interface with file system \
Formula Building: Dynamic equation construction with operators

### 🤝 Contributing
We welcome contributions! Here's how to get started:

#### 🐛 Bug Reports
- Use GitHub Issues
- Include browser and OS information
- Provide steps to reproduce

#### 🚀 Feature Requests
- Suggest new levels or mechanics
- Educational content improvements
- UI/UX enhancements

#### 💻 Development
- Fork the repository
- Create a feature branch: `git checkout -b feature/amazing-feature`
- Commit changes: `git commit -m 'Add amazing feature'`
- Push to branch: `git push origin feature/amazing-feature`
- Open a Pull Request

### 👥 Team
<div align="center">
Made with ❤️ by:

Szymon Wilczek • Konrad Salej • Bartosz Kaprak • Rafał Szczygieł

Faculty of Automatic Control, Electronics and Computer Science
Silesian University of Technology

</div>

### 📊 Game Statistics
- 12 Interactive levels
- 9 Unique character interactions
- Multiple Hidden mechanics and easter eggs
- 100% Educational content based on real coursework

### 🙏 Acknowledgments
NotPron - Inspiration for puzzle design philosophy \
Open Source Community - Amazing tools and libraries that made this possible

<div align="center">
  Ready to test your university survival skills?
</div>

