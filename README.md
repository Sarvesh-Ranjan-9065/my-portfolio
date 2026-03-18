# Sarvesh Portfolio

Developer portfolio with a React frontend and a Go (Gin) backend.

## Stack
- Backend: Go + Gin + gin-contrib/cors
- Frontend: React 18 + Vite 5
- Styling: Tailwind + custom CSS
- UI/animation libs currently used: framer-motion, motion, gsap, ogl, three, pdfjs-dist

## Cleanup Summary
This repository was audited and cleaned to remove unused files/dependencies.

Removed:
- Unused frontend UI modules in extra_UI/animations and extra_UI/compo
- Stale backend binary artifact
- Unused root-level Node manifest files
- Unused frontend dependencies

Kept intentionally:
- Everything in frontend/src/extra_UI/background (as requested)

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
│   │   ├── data/
│   │   ├── extra_UI/
│   │   │   ├── animations/
│   │   │   ├── background/
│   │   │   └── compo/
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

### 1) Start frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

### 2) Start backend
```bash
cd backend
go mod tidy
go run main.go
```
Backend: http://localhost:8080

## Production-style Local Run
Build frontend and serve it from the Go app:

```bash
cd frontend
npm install
npm run build
cp -r dist ../backend/dist

cd ../backend
go run main.go
```

Open http://localhost:8080

## Docker Run
```bash
docker-compose up --build
```

Open http://localhost:8080

## API Endpoints
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /api/health | Health check |
| GET | /api/projects | Portfolio projects |
| GET | /api/skills | Skill categories |
| POST | /api/contact | Contact payload handler |

Example payload:
```json
{
  "name": "Your Name",
  "email": "you@example.com",
  "message": "Hello Sarvesh"
}
```

## Notes
- Contact endpoint validates input and returns acknowledgement response.
- Frontend calls backend through /api proxy in dev and direct /api routes in production.
