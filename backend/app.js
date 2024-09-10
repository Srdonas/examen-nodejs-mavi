// app.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sequelize = require('./api/config/database');
const customerRoutes = require('./api/routes/customerRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse incoming JSON requests
app.use(express.json());  // Parses incoming requests with JSON payloads

//Para habiliatr a cualquier dominio cnectarse a la API
app.use(cors());

// Routes
app.use('/api', customerRoutes);


// Sync Sequelize models and start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error('Unable to sync database:', error);
});
