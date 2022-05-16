import connect from 'connect-redis';
import Redis from 'ioredis';

const settings = {
  host: process.env.REDIS_HOST as string,
  port: parseInt(process.env.REDIS_PORT as string),
  password: process.env.REDIS_PASSWORD as string,
};

const redisClient = new Redis(settings.port, settings.host, {
  password: settings.password,
});

export const connectRedis = (session: any) => {
  const RedisStore = connect(session);

  redisClient.on('error', err => {
    console.error('Error ' + err);
  });
  redisClient.on('connect', _err => {
    console.log('Connected to redis');
  });

  return new RedisStore({ client: redisClient });
};
