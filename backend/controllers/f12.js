const fs = require("fs");
const path = require("path");

const candidatesPath = path.join(__dirname, "../data/candidates.json");

function getApplicantsByJob(req, res) {
  const jobId = req.params.jobId;
  if (!jobId) return res.status(400).json({ message: "Job ID required" });

  fs.readFile(candidatesPath, "utf-8", (err, data) => {
    if (err) return res.status(500).json({ message: "Server error" });

    const candidates = JSON.parse(data);
    const applicants = candidates.filter(c => c.appliedJobs.includes(jobId));

    // Assign dummy score if missing
    const applicantsWithScore = applicants.map(c => ({
      ...c,
      score: c.score || Math.floor(Math.random() * 101)
    }));

    res.json(applicantsWithScore);
  });
}

module.exports = { getApplicantsByJob };