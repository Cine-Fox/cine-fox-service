package redis

import (
	"context"
	"fmt"
	"log"

	"github.com/redis/go-redis/v9"
)

type FoxRedisClient struct {
	rdb *redis.Client
	ctx context.Context
}

var (
	channel   = "cp_controls"
	redisPort = 6379
	redisDB   = 0
)

func CreateConnect() *FoxRedisClient {
	return &FoxRedisClient{
		rdb: redis.NewClient(&redis.Options{
			Addr:     fmt.Sprintf("localhost:%d", redisPort),
			Password: "",
			DB:       redisDB,
		}),
		ctx: context.Background(),
	}
}

func (client *FoxRedisClient) SetAndPublish(key, value string) {
	err := client.rdb.Set(client.ctx, key, value, 0).Err()
	if err != nil {
		log.Println(err)
	}
	client.rdb.Publish(client.ctx, channel, key)
}

func (client *FoxRedisClient) GetValue(key string) string {
	val, err := client.rdb.Get(client.ctx, key).Result()
	if err != nil {
		log.Println(err)
	}
	return val
}
