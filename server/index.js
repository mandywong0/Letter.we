const dotenv = require("dotenv");

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env' });
}

const express = require("express");
const cors = require("cors");
const sequelize = require("./src/db");
const authRoutes = require("./src/routes/authRoutes");
const lettersRoutes = require("./src/routes/lettersRoutes");
const pairingRoutes = require("./src/routes/pairingRoutes");
const usersRoutes = require("./src/routes/usersRoutes");
const promptsRoutes = require("./src/routes/promptsRoutes");

const app = express();

//websocket
const http = require("http");
const server = http.createServer(app);

// Initialize Socket.io
const { init: initIo } = require("./src/io");
const io = initIo(server);

app.use(cors({
  origin: ["https://letter-we.onrender.com", "http://localhost:5173"],
  credentials: true
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");           
});

app.use(authRoutes);
app.use("/letters", lettersRoutes);
app.use("/pairing-code", pairingRoutes);
app.use(usersRoutes);
app.use("/prompt", promptsRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database synced");
    server.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => console.error("DB connection error:", err));
  
console.log("Connected to DB:", sequelize.config.database);

module.exports = { app, io };
