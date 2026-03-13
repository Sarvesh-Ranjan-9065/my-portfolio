# Sarvesh Portfolio

Glassmorphism-style developer portfolio with a React frontend and a Go (Gin) API backend.

## What We Have Done Till Now

### Completed frontend sections
- Navbar
- Hero
- About
- Achievements
- Projects (API-driven)
- Education
- Training
- Certifications
- Resume
- Skills (tabbed: tech + soft skills)
- Fun section with randomized dev jokes
- Contact form
- Footer

### UI and experience implemented
- Futuristic glassmorphism theme
- Cyan glow visual system with ambient background effects
- Scroll-triggered heading reveal animations
- Cursor glow effect (with reduced-motion/device checks)
- Responsive layout with component-wise section structure

### Backend/API completed
- Gin server with CORS setup for local frontend ports
- Health endpoint
- Projects endpoint serving portfolio project data
- Skills endpoint serving categorized skill data
- Contact endpoint with request validation and success/error response

### Deployment setup completed
- Multi-stage Dockerfile:
	- Build React app
	- Build Go binary
	- Serve built frontend from Go server
- Docker Compose to run backend service on port 8080

## Current Tech Stack
- Backend: Go 1.25 + Gin + gin-contrib/cors
- Frontend: React 18 + Vite 5
- Styling: Tailwind setup + custom CSS theme and section styles
- Animation/libs in project: Framer Motion, GSAP, Lenis, tsParticles

## Project Structure
```bash
sarvesh-portfolio/
├── backend/
│   ├── go.mod
│   └── main.go
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── About.jsx
│   │   │   ├── Achievements.jsx
│   │   │   ├── Certifications.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Education.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Fun.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── Resume.jsx
│   │   │   ├── Skills.jsx
│   │   │   └── Training.jsx
│   │   ├── data/
│   │   │   └── jokes.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── Dockerfile
├── docker-compose.yml
└── README.md
```

## Run Locally

### 1) Frontend dev server
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at http://localhost:5173

### 2) Backend API server
```bash
cd backend
go mod tidy
go run main.go
```
Backend runs at http://localhost:8080

## Run in Production Style (Go serves built React)
```bash
cd frontend
npm install
npm run build

cp -r dist ../backend/dist

cd ../backend
go run main.go
```
Open: http://localhost:8080

## Run with Docker
```bash
docker-compose up --build
```
Open: http://localhost:8080

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | API health check |
| GET | /api/projects | Returns project cards data |
| GET | /api/skills | Returns skill categories |
| POST | /api/contact | Accepts contact form payload |

Example contact payload:
```json
{
	"name": "Your Name",
	"email": "you@example.com",
	"message": "Hello Sarvesh"
}
```

## Where To Edit Content
- Projects data: `backend/main.go` in `getProjectsData()`
- Skills data: `backend/main.go` in `getSkillsData()`
- Contact response behavior: `backend/main.go` in `sendContact()`
- Section content/UI: `frontend/src/components/`
- Global styles/theme: `frontend/src/index.css`

## Notes
- Contact endpoint currently validates and acknowledges requests, but does not yet send emails or persist messages.
- Frontend and backend communicate through relative API paths (`/api/...`) when served together from Go.
