import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PrintablePatientReport = () => {
  const location = useLocation();
  const { state } = location;
  const { formData } = location.state || {};

  useEffect(() => {
    console.log("Received formData in /report:", formData);
  }, [formData]);

  const handlePrint = () => {
    window.print();
  };

  if (!formData) {
    return (
      <div style={{ padding: "2rem", color: "red" }}>
        <h2>No data received</h2>
        <p>Try submitting the form again.</p>
      </div>
    );
  }

  return (
    <div className="report-container">
      {/* Print Button */}
      <div className="print-button-container">
        <button onClick={handlePrint} className="print-button">🖨️ Print</button>
      </div>

      {/* Header */}
      <div className="header">
        <div>
          <h1 className="clinic-title">
            Chitara <span className="highlight">Eye Care</span>
          </h1>
        </div>
        <div className="clinic-contact">
          Tara Complex, Radha Rani Sinha Rd,<br />
          Adampur, Bhagalpur, Bihar 812001<br />
          GST No: 19AADCD4418M1ZE<br />
          📞 06412405673 | 📠 06412405673
        </div>
      </div>

      {/* Title */}
      <h2 className="report-title">Patient Report</h2>

      {/* Patient Info in 2 Columns */}
      <div className="patient-info">
        <div className="column">
          <p><strong>Patient ID:</strong> {formData.patientId}</p>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Age:</strong> {formData.age}</p>
          <p><strong>Sex:</strong> {formData.sex}</p>
          <p><strong>Mobile:</strong> {formData.mobile}</p>
        </div>
        <div className="column">
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Doctor Name:</strong> {formData.doctorName}</p>
          <p><strong>Appointment Date:</strong> {formData.appointmentDate}</p>
          <p><strong>Note Date:</strong> {formData.noteDate}</p>
        </div>
      </div>

      {/* On Examination */}
      <h3>On Examination</h3>
      <table className="exam-table">
        <thead>
          <tr>
            <th>Test</th>
            <th>OD</th>
            <th>OS</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>UVA</td>
            <td>{formData.examination.UVA.OD}</td>
            <td>{formData.examination.UVA.OS}</td>
          </tr>
          <tr>
            <td>BCVA</td>
            <td>{formData.examination.BCVA.OD}</td>
            <td>{formData.examination.BCVA.OS}</td>
          </tr>
          <tr>
            <td>IOP</td>
            <td>{formData.examination.IOP.OD}</td>
            <td>{formData.examination.IOP.OS}</td>
          </tr>
        </tbody>
      </table>

      {/* Doctor Notes & Investigation */}
      <div className="notes-section">
        <h4>Doctor Notes:</h4>
        <p>{formData.doctorNotes}</p>
        <h4>Investigation/Medicine:</h4>
        <p>{formData.investigation}</p>
      </div>

      {/* Signature */}
      <div className="signature">
        <p>______________________</p>
        <p><strong>Signature</strong></p>
      </div>
      <div className="footer-note">
  <p><strong>WORKING HOURS | Mon-Sat: 09:00AM to 08:00PM &nbsp; Sunday: Holiday &nbsp; | &nbsp; Email: chitaraeyecare@gmail.com</strong></p>
</div>


      {/* Print Styles */}
      <style>
        {`
          @media print {
            .print-button-container {
              display: none;
            }
            @page {
              size: A4;
              margin: 10mm;
            }
          }

          .report-container {
            font-family: Arial;
            padding: 20px;
            color: #000;
            max-width: 800px;
            margin: 0 auto;
            background: white;
          }

          .print-button-container {
            text-align: right;
            margin-bottom: 20px;
          }

          .print-button {
            background-color: #0047AB;
            color: white;
            border: none;
            padding: 8px 16px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 4px;
          }

          .header {
            display: flex;
            justify-content: space-between;
            border-bottom: 4px solid #0195A3;
            padding-bottom: 10px;
          }

          .clinic-title {
            color: #0047AB;
            margin: 0;
          }

          .highlight {
            color: #0195A3;
          }

          .clinic-contact {
            text-align: right;
            font-size: 14px;
          }

          .report-title {
            text-align: center;
            margin: 20px 0;
            text-decoration: underline;
          }

          .patient-info {
            display: flex;
            justify-content: space-between;
            border: 2px solid black;
            padding: 5px;
            margin-bottom: 10px;
          }

          .column {
            width: 40%;
          }

          .exam-table {
            width: 70%;
            border-collapse: collapse;
            margin-bottom: 10px;
          }

          .exam-table th, .exam-table td {
            border: 1px solid black;
            padding: 2px;
            text-align: center;
          }
            
          .notes-section {
            margin-bottom: 20px;
          }

          .signature {
            text-align: right;
            margin-top: 40px;
          }
            .footer-note {
            border: 1px solid black;
            text-align: center;
            margin-top: 30px;
            font-size: 13px;
            color:#0047AB;
            font-style: italic;
}

        `}
      </style>
    </div>
  );
};

export default PrintablePatientReport;
