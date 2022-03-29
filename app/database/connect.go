package database

import (
	"fmt"
	"log"
	"strconv"

	"github.com/mayudev/yet-another-pronouns-page/app/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error

	port, err := strconv.ParseUint(GetEnv("DB_PORT"), 10, 32)
	if err != nil {
		log.Println("none or invalid db port provided, falling back to default")
		port = 5432
	}

	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		GetEnv("DB_HOST"),
		port,
		GetEnv("DB_USER"),
		GetEnv("DB_PASSWORD"),
		GetEnv("DB_NAME"),
	)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln("failed to connect to database")
	}

	DB.AutoMigrate(&models.User{}, &models.Pronoun{})
	log.Println("you have connected to database wow")
}
