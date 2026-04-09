import React, { useEffect, useState } from "react";
import "./f12.css";

export default function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [sortBy, setSortBy] = useState("scoreDesc");

  // Fetch jobs from backend
  useEffect(() => {
    fetch("/api/jobs")
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error("Failed to fetch jobs:", err));
  }, []);

  // Fetch applicants when a job is selected
  useEffect(() => {
    if (!selectedJob) {
      setApplicants([]);
      return;
    }
    fetch(`/api/employer/applicants/${selectedJob}`)
      .then(res => res.json())
      .then(data => setApplicants(data))
      .catch(err => console.error("Failed to fetch applicants:", err));
  }, [selectedJob]);

  // Sorting
  const sortedApplicants = [...applicants]
    .map(a => {
      let tier;
      if (a.score > 80) tier = "Excellent";
      else if (a.score > 60) tier = "Good";
      else if (a.score > 40) tier = "Possible";
      else tier = "Unlikely";
      return { ...a, tier };
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "scoreDesc": return b.score - a.score;
        case "scoreAsc": return a.score - b.score;
        case "nameAsc": return a.name.localeCompare(b.name);
        case "nameDesc": return b.name.localeCompare(a.name);
        default: return b.score - a.score;
      }
    });

  return (
    <div className="dashboard-container">
      <h1>Employer Dashboard</h1>

      <div className="job-selector">
        <label>Select Job:</label>
        <select value={selectedJob} onChange={e => setSelectedJob(e.target.value)}>
          <option value="">--Select a Job--</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>

        <label>Sort By:</label>
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}>
          <option value="scoreDesc">Score ↓</option>
          <option value="scoreAsc">Score ↑</option>
          <option value="nameAsc">Name A–Z</option>
          <option value="nameDesc">Name Z–A</option>
        </select>
      </div>

      <div className="applicant-list">
        {sortedApplicants.length === 0 ? (
          <p className="no-applicants">
            {selectedJob
              ? "No applicants for this job."
              : "Select a job to see applicants."}
          </p>
        ) : (
          sortedApplicants.map(c => (
            <div key={c.id} className="applicant-card">
              <h2>{c.name}</h2>
              <p>{c.preferredRole} | {c.location}</p>
              <p>
                Score: {c.score}% <span className={`tier-badge ${c.tier.toLowerCase()}`}>{c.tier}</span>
              </p>
              <p>Gap: {c.gapSummary || "No significant gaps identified"}</p>
              <button onClick={() => window.location.href = `/match/${selectedJob}?candidateId=${c.id}`}>
                View Full Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}