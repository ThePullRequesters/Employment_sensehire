const fs = require("fs");
const path = require("path");

const typesPath = path.join(__dirname, "../data/disability-types.json");
const candidatesPath = path.join(__dirname, "../data/candidates.json");

// GET /api/disability-types
exports.getDisabilityTypes = (req, res) => {
    fs.readFile(typesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Unable to read types" });
        res.json(JSON.parse(data));
    });
};

// POST /api/disability
exports.saveDisability = (req, res) => {
    const { disabilityCategory, disabilitySubType } = req.body;
    if (!disabilityCategory || !disabilitySubType)
        return res.status(400).json({ error: "Missing fields" });

    fs.readFile(candidatesPath, "utf8", (err, data) => {
        if (err) return res.status(500).json({ error: "Unable to read candidates" });
        const candidates = JSON.parse(data);

        // For demo, assuming first candidate (or use req.user.id)
        candidates[0].disability = { disabilityCategory, disabilitySubType };

        fs.writeFile(candidatesPath, JSON.stringify(candidates, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Unable to save candidate" });
            res.json({ message: "Disability saved successfully" });
        });
    });
};