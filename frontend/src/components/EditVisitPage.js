import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditVisitPage = () => {
  const [formData, setFormData] = useState(null);
  const { visitId } = useParams();

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("editVisit"));
    if (data) {
      setFormData(data);
    } else {
      // fallback: fetch from backend
      axios.get(`http://localhost:8000/api/newpatients/${visitId}/`).then((res) => {
        setFormData(res.data);
      });
    }
  }, [visitId]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/api/newpatients/${visitId}/`, formData);
      alert("Visit updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Error updating visit");
    }
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div>
      <h2>Edit Visit</h2>
      <input value={formData.doctor_notes} onChange={(e) => setFormData({ ...formData, doctor_notes: e.target.value })} />
      {/* Add other fields as needed */}
      <button onClick={handleUpdate}>Save Changes</button>
    </div>
  );
};

export default EditVisitPage;
