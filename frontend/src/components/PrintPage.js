// src/components/PrintPage.js

import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import PrintablePatientReport from "./PrintablePatientReport";

const PrintPage = () => {
  const location = useLocation();
  const data = location.state?.data;

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Patient Report",
  });

  return (
    <div>
      <button onClick={handlePrint} style={{ margin: "20px", padding: "10px 20px" }}>Print</button>
      <PrintablePatientReport ref={componentRef} data={data} />
    </div>
  );
};

export default PrintPage;
