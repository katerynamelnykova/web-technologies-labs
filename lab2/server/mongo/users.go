package mongo

import (
	"context"

	"github.com/katerynamelnykova/web-technologies-labs/lab2/server/models"
	"go.mongodb.org/mongo-driver/mongo"
)

func (mh *MongoHandler) AddOneUser(a *models.User) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()

	return mh.Admins.InsertOne(ctx, a)
}

func (mh *MongoHandler) GetOneUser(a *models.User, filter interface{}) error {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()

	return mh.Admins.FindOne(ctx, filter).Decode(a)
}
