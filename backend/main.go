package main

import (
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type ContactRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Message string `json:"message" binding:"required"`
}

type Project struct {
	ID          int      `json:"id,omitempty"`
	Title       string   `json:"title"`
	Period      string   `json:"period,omitempty"`
	Icon        string   `json:"icon,omitempty"`
	Badge       string   `json:"badge,omitempty"`
	Description string   `json:"description"`
	Bullets     []string `json:"bullets,omitempty"`
	Tech        []string `json:"tech"`
	Github      string   `json:"github,omitempty"`
	Demo        string   `json:"demo,omitempty"`
	Live        string   `json:"live,omitempty"`
	Featured    bool     `json:"featured,omitempty"`
}

type SkillCategory struct {
	Name  string   `json:"name"`
	Items []string `json:"items"`
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"http://localhost:5173",
			"http://127.0.0.1:5173",
			"http://localhost:3000",
			"http://127.0.0.1:3000",
		},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Sarvesh Portfolio API"})
		})
		api.GET("/projects", handleGetProjects)
		api.GET("/skills", handleGetSkills)
		api.POST("/contact", sendContact)
	}

	r.Static("/assets", "./dist/assets")
	r.StaticFile("/favicon.ico", "./dist/favicon.ico")
	r.NoRoute(func(c *gin.Context) {
		if strings.HasPrefix(c.Request.URL.Path, "/api") {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}

		if filePath, ok := resolveDistFilePath(c.Request.URL.Path); ok {
			c.File(filePath)
			return
		}

		c.File("./dist/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

func resolveDistFilePath(rawPath string) (string, bool) {
	if rawPath == "" || rawPath == "/" {
		return "", false
	}

	decodedPath, err := url.PathUnescape(rawPath)
	if err != nil {
		return "", false
	}

	cleaned := filepath.Clean(decodedPath)
	if cleaned == "." || cleaned == "/" || strings.Contains(cleaned, "..") {
		return "", false
	}

	name := strings.TrimPrefix(cleaned, "/")
	if name == "" || strings.Contains(name, "/") {
		return "", false
	}

	directPath := filepath.Join("./dist", name)
	if info, err := os.Stat(directPath); err == nil && !info.IsDir() {
		return directPath, true
	}

	entries, err := os.ReadDir("./dist")
	if err != nil {
		return "", false
	}

	for _, entry := range entries {
		if entry.IsDir() {
			continue
		}
		if strings.EqualFold(entry.Name(), name) {
			return filepath.Join("./dist", entry.Name()), true
		}
	}

	return "", false
}

func handleGetProjects(c *gin.Context) {
	projects := getProjectsData()
	c.JSON(http.StatusOK, projects)
}

func getProjectsData() []Project {
	return []Project{
		{
			Title:       "simple-static",
			Icon:        "🗂️",
			Badge:       "FEATURED",
			Description: "A lightweight static file server written in pure Go using only the standard library. No frameworks, no dependencies — just clean Go serving files fast and efficiently.",
			Bullets: []string{
				"Built a fully functional static file server using Go's net/http package",
				"Serves HTML, CSS, JS, and other static assets from a local directory",
				"Zero external dependencies — pure Go standard library only",
				"Clean and minimal codebase demonstrating strong Go fundamentals",
			},
			Tech:   []string{"Go", "net/http", "Standard Library"},
			Github: "https://github.com/Sarvesh-Ranjan-9065/simple-static",
		},
		{
			Title:       "go-movie-crud",
			Icon:        "🎬",
			Badge:       "FEATURED",
			Description: "A full CRUD REST API for managing movies, built entirely in Go using only the net/http standard library — no Gin, no Fiber, just raw Go showing solid backend fundamentals.",
			Bullets: []string{
				"Implemented full CRUD operations — Create, Read, Update, Delete for movie records",
				"Built REST API endpoints using Go's net/http package with no external frameworks",
				"Handled JSON encoding/decoding, routing, and HTTP methods manually",
				"Demonstrates deep understanding of how Go HTTP servers work under the hood",
			},
			Tech:   []string{"Go", "net/http", "REST API", "JSON", "Standard Library"},
			Github: "https://github.com/Sarvesh-Ranjan-9065/go-movies-crud",
		},
		{
			Title:       "AI Virtual Mall",
			Period:      "Apr 2025 – May 2025",
			Icon:        "🛍️",
			Badge:       "FEATURED",
			Description: "An AI-powered virtual shopping platform built with React, Gemini API, and Supabase. Has a conversational chatbot, product search, and category filtering.",
			Bullets: []string{
				"Built with React frontend and Gemini API for AI-driven chatbot assistance",
				"Integrated Supabase for product data storage and backend connectivity",
				"Implemented product search and category filtering",
				"Designed a clean and responsive UI to make product discovery more intuitive",
			},
			Tech:   []string{"React", "Gemini API", "Supabase", "JavaScript"},
			Github: "https://github.com/Sarvesh-Ranjan-9065/Ai-Project",
		},
		{
			Title:       "Air Quality Monitoring System",
			Icon:        "🌫️",
			Badge:       "FEATURED",
			Description: "A monitoring system designed to track and visualize environmental air quality metrics. The project collects sensor data and processes it to monitor pollution levels and environmental conditions in real time.",
			Bullets: []string{
				"Developed a monitoring solution for tracking air quality metrics such as pollution levels and environmental conditions",
				"Implemented backend logic to process and manage incoming sensor data",
				"Structured the system to support scalable monitoring and future cloud integration",
				"Demonstrates practical understanding of system monitoring and environmental data handling",
			},
			Tech:   []string{"HTML", "CSS", "JavaScript", "Weather API"},
			Github: "https://github.com/Sarvesh-Ranjan-9065/Chemistry-Project.github.io",
			Demo:   "https://sarvesh-ranjan-9065.github.io/Chemistry-Project.github.io/",
		},
	}
}

func handleGetSkills(c *gin.Context) {
	skills := getSkillsData()
	c.JSON(http.StatusOK, skills)
}

func getSkillsData() []SkillCategory {
	return []SkillCategory{
		{Name: "Languages", Items: []string{"Go", "C++", "Python", "Java", "C"}},
		{Name: "Cloud & DevOps", Items: []string{"AWS", "Azure", "Docker", "Kubernetes", "Minikube", "NGINX Ingress", "Apache CloudStack"}},
		{Name: "Backend & Tools", Items: []string{"net/http", "REST APIs", "Git", "GitHub", "Linux"}},
		{Name: "Currently Learning", Items: []string{"Azure (AZ-900 → AZ-104)", "Go Advanced Patterns", "Docker", "Kubernetes"}},
	}
}

func sendContact(c *gin.Context) {
	var req ContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"success": true,
		"message": "Message received! Sarvesh will get back to you soon.",
	})
}
