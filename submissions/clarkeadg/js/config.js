
/**
 * Config
 * @author Brian Clarke <https://github.com/clarkeadg>
 */

var Config = {
  enableWorld: true,
  enableJedis: true,
  limit: 5,
  increment: 2,
  api: {
    websocket: 'ws://localhost:4000',
    host: 'http://localhost:3000/',
    get: {
      firstJedi: 3616, // Darth Sidious
      jedis: 'dark-jedis/'
    }
  }
};
