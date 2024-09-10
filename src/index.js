import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

(async () => {
  try {
    await initMongoConnection();
    setupServer();
  } catch (error) {
    console.log(error);
  }
})();
