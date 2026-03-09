package main

import (
	"net/http"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type ContactRequest struct {
	Name    string `json:"name" binding:"required"`
	Email   string `json:"email" binding:"required,email"`
	Message string `json:"message" binding:"required"`
}

type Project struct {
	ID          int      `json:"id"`
	Title       string   `json:"title"`
	Description string   `json:"description"`
	Tech        []string `json:"tech"`
	Github      string   `json:"github"`
	Live        string   `json:"live"`
	Featured    bool     `json:"featured"`
}

type Skill struct {
	Category string   `json:"category"`
	Items    []string `json:"items"`
}

func main() {
	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173", "http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST"},
		AllowHeaders:     []string{"Content-Type"},
		AllowCredentials: true,
	}))

	api := r.Group("/api")
	{
		api.GET("/health", func(c *gin.Context) {
			c.JSON(http.StatusOK, gin.H{"status": "ok", "message": "Sarvesh Portfolio API"})
		})
		api.GET("/projects", getProjects)
		api.GET("/skills", getSkills)
		api.POST("/contact", sendContact)
	}

	r.Static("/assets", "./dist/assets")
	r.StaticFile("/favicon.ico", "./dist/favicon.ico")
	r.NoRoute(func(c *gin.Context) {
		c.File("./dist/index.html")
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	r.Run(":" + port)
}

func getProjects(c *gin.Context) {
	projects := []Project{
		{
			ID:          1,
			Title:       "CloudNative Orchestrator",
			Description: "A Kubernetes-native workload orchestrator built in Go with custom CRDs, auto-scaling policies, and real-time metrics dashboard.",
			Tech:        []string{"Go", "Kubernetes", "gRPC", "Prometheus", "Docker"},
			Github:      "https://github.com/sarvesh/cloud-orchestrator",
			Featured:    true,
		},
		{
			ID:          2,
			Title:       "DevOps Pipeline Engine",
			Description: "High-performance CI/CD pipeline engine with parallel job execution, artifact caching, and multi-cloud deployment targets.",
			Tech:        []string{"Go", "Gin", "Redis", "PostgreSQL", "Terraform"},
			Github:      "https://github.com/sarvesh/pipeline-engine",
			Live:        "https://demo.example.com",
			Featured:    true,
		},
		{
			ID:          3,
			Title:       "Distributed Tracing System",
			Description: "OpenTelemetry-compatible distributed tracing system with custom sampling strategies and real-time trace visualization.",
			Tech:        []string{"Go", "OpenTelemetry", "Jaeger", "Kafka", "ClickHouse"},
			Github:      "https://github.com/sarvesh/trace-system",
			Featured:    true,
		},
		{
			ID:          4,
			Title:       "SecretVault CLI",
			Description: "Zero-trust secrets management CLI tool with envelope encryption, audit logs, and Vault/AWS KMS integration.",
			Tech:        []string{"Go", "HashiCorp Vault", "AWS KMS", "CLI"},
			Github:      "https://github.com/sarvesh/secretvault",
			Featured:    false,
		},
	}
	c.JSON(http.StatusOK, projects)
}

func getSkills(c *gin.Context) {
	skills := []Skill{
		{Category: "Backend", Items: []string{"Go", "gRPC", "REST APIs", "GraphQL", "PostgreSQL", "Redis", "Kafka"}},
		{Category: "DevOps", Items: []string{"Docker", "Kubernetes", "Helm", "ArgoCD", "GitHub Actions", "Jenkins"}},
		{Category: "Cloud & Infrastructure", Items: []string{"AWS", "GCP", "Terraform", "Pulumi", "Ansible", "Linux"}},
		{Category: "Observability", Items: []string{"Prometheus", "Grafana", "OpenTelemetry", "Jaeger", "ELK Stack"}},
	}
	c.JSON(http.StatusOK, skills)
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
