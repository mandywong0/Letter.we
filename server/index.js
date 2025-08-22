const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const sequelize = require('./src/db');
const authRoutes = require('./src/routes/authRoutes');
const lettersRoutes = require('./src/routes/lettersRoutes');

dotenv.config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors()); //add restriction after setting up frontend
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");           
});

app.use(authRoutes);
app.use('/letters', lettersRoutes);

sequelize.sync()
  .then(() => {
    console.log('Database synced');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error('DB connection error:', err));
