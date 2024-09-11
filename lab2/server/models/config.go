package models

import (
	"encoding/json"
	"os"
)

type Config struct {
	Database      string `json:"database" bson:"database"`
	AdminPassword string `json:"admin_password" bson:"admin_password"`
}

func LoadConfiguration() (Config, error) {
	var config Config
	configFile, err := os.Open("config.json")

	if err != nil {
		return config, err
	}
	defer configFile.Close()
	jsonParser := json.NewDecoder(configFile)
	err = jsonParser.Decode(&config)

	return config, err
}
