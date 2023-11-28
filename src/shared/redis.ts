import { createClient, SetOptions } from 'redis';
import config from '../config';
//VIDEO NO-45-8
const redisClient = createClient({
  url: config.redis.url,
});

const redisPubClient = createClient({
  url: config.redis.url,
});
const redisSubClient = createClient({
  url: config.redis.url,
});

redisClient.on('error', error => console.log('RedisError', error));
redisClient.on('connect', connect => console.log('Redisconnect'));

const set = async (
  key: string,
  values: string,
  options?: SetOptions
): Promise<void> => {
  await redisClient.set(key, values, options);
};
const get = async (key: string): Promise<string | null> => {
  return await redisClient.get(key);
};
const del = async (key: string): Promise<void> => {
  await redisClient.del(key);
};
const connect = async (): Promise<void> => {
  await redisClient.connect();
  await redisPubClient.connect();
  await redisSubClient.connect();
};
const setAccessToken = async (userId: string, token: string): Promise<void> => {
  const key = `access-token${userId}`;

  await redisClient.set(key, token, { EX: Number(config.redis.expires_in) });
};
const getAccessToken = async (userId: string): Promise<string | null> => {
  const key = `access-token${userId}`;
  return await redisClient.get(key);
};
const deleteAccessToken = async (userId: string): Promise<void> => {
  const key = `access-token${userId}`;
  await redisClient.del(key);
};
//redis disconnect
const disconnect = async (): Promise<void> => {
  await redisClient.quit();
  await redisPubClient.quit();
  await redisSubClient.quit();
};
export const RedisClient = {
  connect,
  set,
  get,
  del,
  setAccessToken,
  getAccessToken,
  deleteAccessToken,
  disconnect,
  publish: redisPubClient.publish.bind(redisPubClient),
  subscribe: redisSubClient.subscribe.bind(redisSubClient),
};
