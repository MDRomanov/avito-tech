const express = require('express');
const config = require('./config/config');
const app = express();
const PORT = 5001;

config(app);

const gameRoutes = require('./routes/games.routes');

app.use('api/games', gameRoutes)

async function server() {
    try {
      app.listen(PORT, () => {
        console.log(`Server is running at ${PORT}`);
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  server();