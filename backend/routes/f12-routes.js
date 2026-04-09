const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { getApplicantsByJob } = require("../controllers/f12");

// Route to get all jobs
router.get("/api/jobs", (req, res) => {
  const jobsPath = path.join(__dirname, "../data/jobs.json");
  fs.readFile(jobsPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Cannot read jobs.json" });
    res.json(JSON.parse(data));
  });
});

// Route to get applicants for a specific job
router.get("/api/employer/applicants/:jobId", getApplicantsByJob);

module.exports = router;