package database

import (
	"fmt"
	"log"
	"strconv"

	"github.com/mayudev/yet-another-pronouns-page/app/model"
	"github.com/mayudev/yet-another-pronouns-page/app/util"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	var err error

	port, err := strconv.ParseUint(util.GetEnv("DB_PORT"), 10, 32)
	if err != nil {
		log.Println("none or invalid db port provided, falling back to default")
		port = 5432
	}

	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		util.GetEnv("DB_HOST"),
		port,
		util.GetEnv("DB_USER"),
		util.GetEnv("DB_PASSWORD"),
		util.GetEnv("DB_NAME"),
	)

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalln("failed to connect to database")
	}

	DB.AutoMigrate(&model.User{}, &model.Pronoun{}, &model.Session{})

	CleanupExpiredSessions()

	log.Println("you have connected to database wow")
}
