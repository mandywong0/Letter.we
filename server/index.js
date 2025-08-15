const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require('./src/db');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //add restriction after setting up frontend
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");           
});

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error('DB connection error:', err));
