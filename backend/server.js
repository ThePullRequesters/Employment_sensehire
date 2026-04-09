// backend/server.js
const express = require("express");
const app = express();
const path = require("path");

// Middleware
app.use(express.json());

// Routes
const f12Routes = require("./routes/f12-routes.js");
app.use(f12Routes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));