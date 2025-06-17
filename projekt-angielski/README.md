🎓 UniPron
An interactive educational escape room game for university students studying computer science and engineering.

<div align="center">
<img alt="GitHub" src="https://img.shields.io/github/license/your-username/unipron">
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=flat&amp;logo=typescript&amp;logoColor=white">
<img alt="React" src="https://img.shields.io/badge/React-20232A?style=flat&amp;logo=react&amp;logoColor=61DAFB">
<img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=flat&amp;logo=vite&amp;logoColor=white">
<img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&amp;logo=tailwind-css&amp;logoColor=white">
Navigate through 12 challenging levels that mirror real academic subjects

🎮 Play Now • 📖 Documentation • 🤝 Contributing

</div>

🎯 About
UniPron transforms university-level STEM education into an engaging puzzle-solving adventure. Players progress through interconnected levels featuring programming challenges, circuit-building tasks, and logic puzzles set in a mysterious digital world.

🌟 Key Features
12 Unique Levels - Each with distinct mechanics and educational themes
Real Academic Content - Based on actual computer science and engineering coursework
Interactive Learning - Hands-on problem solving rather than passive consumption
Progressive Difficulty - From basic concepts to advanced technical challenges
Immersive Storytelling - University life meets escape room mechanics

🎮 Game Levels
<details> <summary><strong>🏠 Level 1: Welcome</strong></summary> <br> University recruitment announcement with a twist - your journey into academic chaos begins. </details> <details> <summary><strong>⚙️ Level 2: System Maintenance</strong></summary> <br> USOS system malfunction requires your assistance. Find the "W" key in the heart of the machine.
Hidden mechanics: Press 'W' for auto-complete
Skills: Problem solving, pattern recognition</details>
<details> <summary><strong>🤖 Level 3: Machine W Debugging</strong></summary> <br> Debug assembly-like code with Dr. Tutajewicz's guidance. Fix the program by correcting command syntax.
Challenge: Assembly code debugging
Skills: Programming logic, syntax correction</details>
<details> <summary><strong>📚 Level 4-7: Mathematical Analysis</strong></summary> <br> Navigate through multiple exam terms with Dr. Łobuz. Experience the reality of university mathematics.
Progression: Term 0 → Term 1 → Term 2 → Term 3
Theme: Academic perseverance and mathematical proofs</details>
<details> <summary><strong>🔬 Level 5: Physics Surveillance</strong></summary> <br> Answer physics questions under Dr. Bodzenta's watchful security cameras. Anti-cheating detection active!
Security: DevTools detection
Challenge: Define entropy without external help
Skills: Physics knowledge, academic integrity</details>
<details> <summary><strong>⚡ Level 6: Electrical Castle</strong></summary> <br> Solve electrical engineering puzzles by pulling the correct levers. Build formulas using physical units.
Formulas: R = U/I, P = U×I, E = P×t
Mechanics: Lever pulling, formula construction
Skills: Electrical engineering, unit relationships</details>
<details> <summary><strong>📄 Level 7: Report Formatting</strong></summary> <br> Format a laboratory report to meet Dr. Drabiel-Gabik's strict requirements.
Challenge: Font = Calibri, Size = 11-12pt
Skills: Attention to detail, academic standards</details>
<details> <summary><strong>💻 Level 8: Programming Detective</strong></summary> <br> Solve programming puzzles using browser DevTools. Answers hidden in various locations.
Tools: LocalStorage, Console, CSS, Network tab, HTML comments
Skills: Web development, debugging techniques</details>
<details> <summary><strong>🔐 Level 9: Terminal Access</strong></summary> <br> Matrix-style terminal interface with SSH simulation and data form completion.
Environment: Realistic terminal simulation
Challenge: Navigate filesystem, complete data forms
Skills: Command line proficiency, data handling</details>
<details> <summary><strong>💾 Level 10: Algorithm Archives</strong></summary> <br> Quiz based on historical exam data found in the FTP disk simulation.
Requirement: Explore in-app resources for answers
Challenge: 8 questions about past examinations
Skills: Research, academic database navigation</details>
<details> <summary><strong>🔌 Level 11: Circuit Assembly</strong></summary> <br> Build a functional LED circuit with Dr. Jaciński's optional assistance.
Components: Battery, switch, resistors, LEDs, capacitor, wires
Mechanics: Drag & drop, connection building
Skills: Electronics, circuit design</details>
<details> <summary><strong>🏦 Level 12: Bank Pac-Man</strong></summary> <br> Pac-Man inspired finale! Collect dots while avoiding aggressive bank employees.
Controls: WSAD movement
Enemies: mBank and ING representatives with marketing messages
Power-ups: Beer pellets for temporary invincibility
Skills: Quick reflexes, strategic navigation</details>


🚀 Tech Stack
Frontend
React 18 - Modern UI library
TypeScript - Type-safe development
Vite - Lightning-fast build tool
Tailwind CSS - Utility-first styling
React Router - Client-side routing
Components & UI
Radix UI - Accessible component primitives
Custom Components - Game-specific interactive elements
Responsive Design - Works on desktop and mobile
Deployment
Vercel - Serverless deployment platform
SPA Configuration - Proper routing for direct links


🛠️ Installation & Setup
Prerequisites
Node.js 16+
npm or yarn
Quick Start

```
# Clone the repository
git clone https://github.com/your-username/unipron.git
cd unipron

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Vercel Deployment
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

🎨 Project Structure

src/
├── components/           # Reusable UI components
│   ├── lvl*/            # Level-specific components
│   └── ui/              # Base UI components
├── pages/               # Main game levels
│   ├── hello/           # Level 1 - Welcome
│   ├── lvl*/            # Levels 3-12
│   ├── easter-egg       # 404 page
│   └── end/             # Ending sequence
├── routes/              # App routing configuration
├── types/               # TypeScript type definitions
└── lib/                 # Utility functions


🎯 Game Mechanics
🔑 Hidden Features
Level 2: Press 'W' for automatic password completion
Level 5: Real-time cheating detection using DevTools monitoring
Level 8: Multiple hidden answer locations throughout browser tools
Level 9: Persistent form overlay with terminal interaction
🎮 Interactive Elements
Drag & Drop: Circuit building in Level 11
Real-time Physics: Pac-Man movement and collision detection
Terminal Simulation: Full command-line interface with file system
Formula Building: Dynamic equation construction with operators


🤝 Contributing
We welcome contributions! Here's how to get started:

🐛 Bug Reports
Use GitHub Issues
Include browser and OS information
Provide steps to reproduce
🚀 Feature Requests
Suggest new levels or mechanics
Educational content improvements
UI/UX enhancements
💻 Development
Fork the repository
Create a feature branch: git checkout -b feature/amazing-feature
Commit changes: git commit -m 'Add amazing feature'
Push to branch: git push origin feature/amazing-feature
Open a Pull Request

👥 Team
<div align="center">
Made with ❤️ by:

Szymon Wilczek • Konrad Salej • Bartosz Kaprak • Rafał Szczygieł

Faculty of Automatic Control, Electronics and Computer Science
Silesian University of Technology

</div>

📊 Game Statistics
12 Interactive levels
9 Unique character interactions
Multiple Hidden mechanics and easter eggs
100% Educational content based on real coursework

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
NotPron - Inspiration for puzzle design philosophy
Open Source Community - Amazing tools and libraries that made this possible

<div align="center">
🎓 Ready to test your university survival skills?

🚀 Start Your Journey

UniPron - Where education meets adventure

</div>

