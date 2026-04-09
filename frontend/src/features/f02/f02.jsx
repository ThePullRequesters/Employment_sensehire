import React, { useEffect, useState } from "react";
import "./f02.css";

export default function DisabilityProfiler() {
  const [categories, setCategories] = useState([]);
  const [expandedCategoryId, setExpandedCategoryId] = useState(null);
  const [selectedSubType, setSelectedSubType] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/disability-types")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const toggleCategory = (id) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  const handleSubTypeSelect = (category, subType) => {
    setSelectedSubType({ category, subType });
  };

  const handleConfirm = () => {
    if (!selectedSubType) return;
    setSaving(true);
    fetch("/api/disability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        disabilityCategory: selectedSubType.category.category,
        disabilitySubType: selectedSubType.subType.label,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Disability saved successfully!");
        setSaving(false);
      })
      .catch((err) => {
        console.error(err);
        alert("Error saving disability");
        setSaving(false);
      });
  };

  if (loading) return <div>Loading disability categories...</div>;

  return (
    <div className="f02-container">
      <h2>Disability Profiler</h2>
      <div className="accordion">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card">
            <div
              className="category-header"
              onClick={() => toggleCategory(cat.id)}
            >
              <span className="icon">{cat.icon}</span>
              <div>
                <h3>{cat.category}</h3>
                <p>{cat.description}</p>
              </div>
              <span className="arrow">
                {expandedCategoryId === cat.id ? "▲" : "▼"}
              </span>
            </div>

            {expandedCategoryId === cat.id && (
              <div className="subtypes">
                {cat.subTypes.map((sub) => (
                  <div
                    key={sub.id}
                    className={`subtype-item ${selectedSubType &&
                        selectedSubType.subType.id === sub.id
                        ? "selected"
                        : ""
                      }`}
                    onClick={() => handleSubTypeSelect(cat, sub)}
                  >
                    <strong>{sub.label}</strong>
                    <p>{sub.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedSubType && (
        <div className="selection-summary">
          Selected: {selectedSubType.category.category} →{" "}
          {selectedSubType.subType.label}
        </div>
      )}

      {selectedSubType && (
        <button
          className="confirm-btn"
          onClick={handleConfirm}
          disabled={saving}
        >
          {saving ? "Saving..." : "Confirm"}
        </button>
      )}
    </div>
  );
}