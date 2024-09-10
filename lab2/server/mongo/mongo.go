package mongo

import (
	"context"

	"time"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const DefaultDatabase = "web-technologies-labs"

const CollectionName = "lab2-users"

const APITimeout = 1000 * time.Second

type MongoHandler struct {
	client   *mongo.Client
	database string

	Projects  *mongo.Collection
	Electrons *mongo.Collection
	Admins    *mongo.Collection
}

// MongoHandler Constructor
func NewHandler(address string) (*MongoHandler, error) {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()
	cl, err := mongo.Connect(ctx, options.Client().ApplyURI(address))

	if err != nil {
		return nil, err
	}

	mh := &MongoHandler{
		client:   cl,
		database: DefaultDatabase,
	}

	mh.Admins = mh.client.Database(mh.database).Collection(CollectionName)

	return mh, nil
}

func (mh *MongoHandler) Upload(doc interface{}) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()

	return mh.Electrons.InsertOne(ctx, doc)
}

func (mh *MongoHandler) AddOne(c map[string]interface{}) (*mongo.InsertOneResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()

	return mh.Electrons.InsertOne(ctx, c)
}

func (mh *MongoHandler) Update(filter interface{}, update interface{}) (*mongo.UpdateResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()

	return mh.Electrons.UpdateOne(ctx, filter, update)
}

func (mh *MongoHandler) RemoveOne(filter interface{}) (*mongo.DeleteResult, error) {
	ctx, cancel := context.WithTimeout(context.Background(), APITimeout)
	defer cancel()

	return mh.Electrons.DeleteOne(ctx, filter)
}
