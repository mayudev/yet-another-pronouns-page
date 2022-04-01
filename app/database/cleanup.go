package database

import (
	"log"

	"github.com/mayudev/yet-another-pronouns-page/app/model"
)

func CleanupExpiredSessions() {
	result := DB.Unscoped().Where("expires < now()").Delete(&model.Session{})

	log.Printf("Cleaned up %v expired sessions\n", result.RowsAffected)
}
