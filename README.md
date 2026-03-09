# Sarvesh Portfolio

> Futuristic Glassmorphism Portfolio — Go + Gin backend, React + Vite frontend

## Stack
- **Backend:** Go 1.21 + Gin + CORS
- **Frontend:** React 18 + Vite + Tailwind CSS
- **Animations:** GSAP, Lenis (smooth scroll), Framer Motion
- **Styling:** Glassmorphism, Cyan glow, Space Mono + Syne fonts

## Project Structure
```
sarvesh-portfolio/
├── backend/
│   ├── main.go          # Go/Gin API server
│   └── go.mod
├── frontend/
│   ├── src/
│   │   ├── components/  # Navbar, Hero, About, Projects, Skills, Contact, Footer
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Running Locally

### Frontend (dev mode)
```bash
cd frontend
npm install
npm run dev        # → http://localhost:5173
```

### Backend
```bash
cd backend
go mod tidy
go run main.go     # → http://localhost:8080
```

### Production (Go serves built React)
```bash
cd frontend && npm run build      # builds to dist/
cp -r dist ../backend/dist
cd ../backend && go run main.go   # serves everything on :8080
```

### Docker (full stack)
```bash
docker-compose up --build
```

## API Endpoints
| Method | Path | Description |
|--------|------|-------------|
| GET | /api/health | Health check |
| GET | /api/projects | List all projects |
| GET | /api/skills | List all skills |
| POST | /api/contact | Send contact message |

## Customization
- **Projects:** Edit `getProjects()` in `backend/main.go`
- **Skills:** Edit `getSkills()` in `backend/main.go`
- **Colors:** Change `--cyan` CSS variable in `frontend/src/index.css`
- **Content:** Update text in each component in `frontend/src/components/`
