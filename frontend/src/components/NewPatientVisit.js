// NewPatientVisit.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const NewPatientVisit = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState(false);
    const [localUsername, setLocalUsername] = useState("");
  const { visitId, custom_patient_id } = useParams();
  const [formData, setFormData] = useState({
    patient: "",
    age: "",
    sex: "",
    mobile: "",
    email: "",
    address: "",
    doctorName: "",
    appointmentDate: "",
    noteDate: new Date().toISOString().slice(0, 16), // current datetime
    patientId:  "",
    examination: {
      UVA: { OD: "", OS: "" },
      BCVA: { OD: "", OS: "" },
      IOP: { OD: "", OS: "" },
    },
    doctorNotes: "",
    investigation: "",
  });

  useEffect(() => {
    const editData = localStorage.getItem("editVisit");
    const prefillData = localStorage.getItem("prefillVisit");

    if (editData) {
      const visit = JSON.parse(editData);
      setFormData({
        name: visit.patient || "",
        age: visit.age || "",
        sex: visit.sex || "",
        mobile: visit.mobile || "",
        email: visit.email || "",
        address: visit.address || "",
        doctorName: visit.doctor_name || "",
        appointmentDate: visit.appointment_date?.slice(0, 16) || "",
        noteDate: new Date().toISOString().slice(0, 16),
        patientId: visit.custom_patient_id || "",
        examination: {
        UVA: {
          OD: visit.examination?.UVA?.OD || "",
          OS: visit.examination?.UVA?.OS || "",
        },
        BCVA: {
          OD: visit.examination?.BCVA?.OD || "",
          OS: visit.examination?.BCVA?.OS || "",
        },
        IOP: {
          OD: visit.examination?.IOP?.OD || "",
          OS: visit.examination?.IOP?.OS || "",
        },
      },
        doctorNotes: visit.doctor_notes || "",
        investigation: visit.investigation || "",
      });
    } else if (prefillData) {
      const visit = JSON.parse(prefillData);
      setFormData((prev) => ({
        ...prev,
        name: visit.patient || "",
        age: visit.age || "",
        sex: visit.sex || "",
        mobile: visit.mobile || "",
        email: visit.email || "",
        address: visit.address || "",
        doctorName: visit.doctor_name || "",
        patientId: visit.custom_patient_id || "",
        examination: {
        UVA: {
          OD: visit.examination?.UVA?.OD || "",
          OS: visit.examination?.UVA?.OS || "",
        },
        BCVA: {
          OD: visit.examination?.BCVA?.OD || "",
          OS: visit.examination?.BCVA?.OS || "",
        },
        IOP: {
          OD: visit.examination?.IOP?.OD || "",
          OS: visit.examination?.IOP?.OS || "",
        },
      },
      }));
    }
  }, []);

  useEffect(() => {
    const savedUsername = username || localStorage.getItem("username");
    if (savedUsername) {
      setLocalUsername(savedUsername);
    }
    const currentDate = new Date();
    setFormData((prev) => ({
      ...prev,
      noteDate: currentDate.toISOString().slice(0, 16),
      patientId: "PID" + Math.floor(Math.random() * 1000000),
    }));
  }, [username]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "age" && value < 0) return; // prevent negative age
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const accessToken = localStorage.getItem("access");
    const patientId = formData.custom_patient_id;
    const url = visitId
      ? `http://127.0.0.1:8000/api/create_new_visit/?custom_patient_id=${patientId}`
      : `http://127.0.0.1:8000/api/create_new_visit/?custom_patient_id=${patientId}`;

    try {
      const res = await fetch(url, {
        method:"POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Failed to submit");
      }

      alert("Visit saved successfully!");
      localStorage.removeItem("editVisit");
      localStorage.removeItem("prefillVisit");
      window.location.href = "/SearchPatientPage"; // Redirect to search
    } catch (error) {
      alert("Error saving data");
      console.error(error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/LoginForm");
  };
  const handlePrint = () => {
  console.log("Navigating to report with data:", formData);
  navigate('/report', { state: { formData } });
};
  const handleReset = () => {
    setFormData((prev) => ({ ...prev, doctorNotes: "", investigation: "" }));
  };
return (
 <div style={styles.fullscreen}>
      <div style={styles.container}>
        <button onClick={handleLogout} style={styles.logoutButton}>Logout</button>
        <h1 style={styles.header}>CHITRA EYE CARE</h1>
        <div style={styles.username}>USER: {localUsername?.toUpperCase()}</div>
        <hr style={styles.divider} />

        <h2 style={styles.heading}> Patient Visit</h2>
        <form onSubmit={handleSubmit}>

          {/* Row 1 */}
          <div style={styles.formRow}>
            <label>Patient Name:</label>
            <input name="name" type="text" value={formData.name} onChange={handleChange} required />
            <label>Age:</label>
            <input name="age" type="number" value={formData.age} onChange={handleChange} required />
          </div>

          {/* Row 2 */}
          <div style={styles.formRow}>
            <label>Sex:</label>
            <select name="sex" value={formData.sex} onChange={handleChange} required>
              <option value="">-- Select --</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <label>Mobile Number:</label>
            <input name="mobile" type="tel" value={formData.mobile} onChange={handleChange} required />
          </div>

          {/* Row 3 */}
          <div style={styles.formRow}>
            <label>Email Id:</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required />
            <label>Address:</label>
            <textarea name="address" value={formData.address} onChange={handleChange} rows="2" />
          </div>

          {/* Row 4 */}
          <div style={styles.formRow}>
            <label>Doctor Name:</label>
            <select name="doctorName" value={formData.doctorName} onChange={handleChange}>
              <option value="Dr.">Dr.</option>
              <option value="Dr. Sharma">Dr. Sharma</option>
              <option value="Dr. Mehta">Dr. Mehta</option>
            </select>
            <label>Appointment Date:</label>
            <input name="appointmentDate" type="datetime-local" value={formData.appointmentDate} onChange={handleChange} required />
          </div>

          {/* Row 5 */}
          <div style={styles.formRow}>
            <label>Note Date:</label>
            <input name="noteDate" type="datetime-local" value={formData.noteDate} readOnly />
            <label>Patient ID:</label>
            <input name="patientId" type="text" value={formData.patientId} readOnly />
          </div>

          {/* On Examination Table */}
<div style={{ marginTop: "2rem" }}>
  <h3 style={styles.subheading}>Examination:</h3>
  <table style={styles.examTable}>
    <thead>
      <tr style={styles.examHeaderRow}>
        <th style={styles.examHeaderCell}>Parameter</th>
        <th style={styles.examHeaderCell}>Right Eye (OD)</th>
        <th style={styles.examHeaderCell}>Left Eye (OS)</th>
      </tr>
      <tr>
        <td colSpan={3} style={styles.thinLine}></td>
      </tr>
    </thead>
    <tbody>
  {["UVA", "BCVA", "IOP"].map((param) => (
    <tr key={param}>
      <td style={styles.tableCell}>{param}</td>
      <td style={styles.tableCell}>
        <input
          name={`${param}.OD`}
          value={formData.examination?.[param]?.OD || ""}
          onChange={handleChange}
          style={styles.inputCell}
        />
      </td>
      <td style={styles.tableCell}>
        <input
          name={`${param}.OS`}
          value={formData.examination?.[param]?.OS || ""}
          onChange={handleChange}
          style={styles.inputCell}
        />
      </td>
    </tr>
  ))}
</tbody>

  </table>
</div>


          {/* Doctor Notes Table */}
          <div style={{ marginTop: "2rem" }}>
           <h3 style={styles.subheading}>Doctor Notes:</h3>
            <textarea name="doctorNotes" value={formData.doctorNotes} onChange={handleChange} rows="15" style={{ width: "100%", borderRadius: "6px", padding: "0.5rem" }} />
          </div>

          {/* Investigation */}
          <div style={{ marginTop: "1rem" }}>
            <h3 style={styles.subheading}>Investigations:</h3>
            <textarea name="investigation" value={formData.investigation} onChange={handleChange} rows="2" style={{ width: "100%", borderRadius: "6px", padding: "0.5rem" }} />
          </div>

          {/* Submit Button */}
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <button type="submit" style={styles.button}>Submit</button>
             <button type="button" onClick={handleReset} style={{ ...styles.button, backgroundColor: "#e67e22" }}>Reset</button>
          </div>
        </form>
        {/* ✅ Popup after submit */}
        {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>Data Submitted Successfully</h3>
            <p>Would you like to print the prescription?</p>
            <div style={{ marginTop: "1rem" }}>
              <button onClick={handlePrint} style={styles.button}>Print</button>
              <button onClick={() => setShowPopup(false)} style={{ ...styles.button, backgroundColor: "#c0392b", marginLeft: "1rem" }}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
</div>
  );
}

// ----------------------------
// ✅ Styles


const styles = {
   // ...existing styles...
examHeaderRow: {
  background: "#f9f9f9",
},
examHeaderCell: {
  fontWeight: "bold",
  textAlign: "center",
  padding: "0.5rem",
  borderBottom: "none",
},
thinLine: {
  height: "2px",
  background: "#333",
  border: "none",
  padding: 0,
  margin: 0,
},
inputCell: {
  width: "90%",
  padding: "0.3rem",
  borderRadius: "4px",
  border: "1px solid #ccc",
},
// ...existing styles...
    




  fullscreen: {
    height: "100vh",
    width: "100vw",
    overflowY: "scroll",
    backgroundColor: "#f6f8fa",
    padding: "2rem",
    boxSizing: "border-box",
  },
  container: {
    padding: "2rem",
    maxWidth: "1100px",
    margin: "auto",
    background: "linear-gradient(to bottom, #fefcea, #f1da36)",
    borderRadius: "12px",
    boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
    position: "relative",
  },
  logoutButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    fontWeight: "bold",
  },
  header: {
    textAlign: "center",
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#2c3e50",
    fontFamily: "Georgia, serif",
    letterSpacing: "2px",
  },
  username: {
    textAlign: "right",
    fontWeight: "bold",
    fontSize: "1.1rem",
    marginTop: "10px",
  },
  divider: {
    height: "4px",
    backgroundColor: "#2c3e50",
    margin: "1rem 0",
  },
  heading: {
    textAlign: "center",
    color: "#34495e",
    marginBottom: "1rem",
  },
  subheading: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    color: "#2c3e50",
  },
  formRow: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 1fr 2fr",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem",
  },
  button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  examTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  },
  notesTable: {
    width: "100%",
    borderCollapse: "collapse",
    border: "1px solid #ccc",
  },
  tableCell: {
    padding: "0.5rem",
    border: "1px solid #ccc",
  },
  popupOverlay: {
     position: "fixed", 
     top: 0, left: 0, 
     right: 0, bottom: 0, 
     backgroundColor: "rgba(0, 0, 0, 0.5)", 
     display: "flex", 
     justifyContent: "center", 
     alignItems: "center", 
     zIndex: 1000
     },
  popup: { 
    backgroundColor: "#fff", 
    padding: "2rem", 
    borderRadius: "10px", 
    textAlign: "center", 
    boxShadow: "0 4px 12px rgba(0,0,0,0.2)"
 },
    button: {
    backgroundColor: "#27ae60",
    color: "#fff",
    padding: "0.75rem 2rem",
    border: "none",
    borderRadius: "6px",
    fontSize: "1rem",
    cursor: "pointer",
  },

};



export default NewPatientVisit;
