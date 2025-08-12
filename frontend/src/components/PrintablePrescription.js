// import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { generatePrintableHTML } from "./generatePrintableHTML";


// const PrintablePrescription = () => {
//   const navigate = useNavigate();
//   let patient = null;
// try {
//   patient = JSON.parse(localStorage.getItem("printData"));
// } catch (e) {
//   console.error("Invalid JSON in printData:", e);
//   localStorage.removeItem("printData");
// }

//   useEffect(() => {
//     if (!patient) {
//       navigate("/new-patient");
//     }
//   }, [patient, navigate]);

//   const handlePrint = () => {
//     const htmlContent = generatePrintableHTML(patient);
//     const printWindow = window.open("", "_blank");
//     printWindow.document.write(htmlContent);
//     printWindow.document.close();
//     printWindow.focus();
//     printWindow.print();
//   };

//   if (!patient) {
//     return <div className="text-center mt-10 text-red-500">No patient data found.</div>;
//   }

//   return (
//     <div className="flex justify-center items-center min-h-screen">
//       <button
//         onClick={handlePrint}
//         className="bg-green-600 text-white px-6 py-3 rounded shadow-md hover:bg-green-700 transition duration-300"
//       >
//         Print / Download PDF
//       </button>
//     </div>
//   );
// };

// export default PrintablePrescription;
