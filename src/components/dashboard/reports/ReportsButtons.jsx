import jsPDF from "jspdf";
import React from "react";
import logo from "../../../assets/common/logo.png";

function ReportsButtons({ handleGenerateReport, tabUsers, allBtn }) {
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    pdfFile(doc);

    // Save the PDF with a meaningful filename
    doc.save("user_booking_report.pdf");
  };

  const handlePrint = () => {
    const doc = new jsPDF();

    pdfFile(doc);

    // Open the PDF in a new window for printing
    const pdfDataUrl = doc.output("dataurlstring");

    const printWindow = window.open();
    if (printWindow) {
      printWindow.document.write(
        `<iframe width='100%' height='100%' src='${pdfDataUrl}'></iframe>`
      );
      printWindow.document.close();
    }
  };

  const pdfFile = (doc) => {
    // Add logo (replace with the actual base64 string or image URL)

    doc.addImage(logo, "JPEG", 130, 20, 50, 15); // Reducing width to 50 and height to 15
    // Adjust dimensions and positioning accordingly
    doc.text(" Online Hostel Room Reservation", 20, 30); // Position title accordingly
    doc.setFontSize(10);
    doc.text(" WhatsApp: +92 33344455521", 120, 50); // Position text accordingly
    doc.setFontSize(10);
    doc.text(" Email:    hfahad534@gmail.com", 120, 55); // Position text accordingly
    doc.text(
      "______________________________________________________________________________________________________________",
      0,
      63
    );
    doc.text(
      "______________________________________________________________________________________________________________",
      0,
      64
    );
    doc.setFontSize(16);
    doc.setFont("bold"); // Set font style to bold
    doc.text("User Report", 90, 72);

    // Add report title below the logo
    doc.setFontSize(10);
    doc.text("Street 26 Biha road Matta Swat KP, Pakistan", 23, 40); // Position title accordingly

    // Add table with relevant user data
    const tableColumn = ["User", "Hostel", "Booking Date", "Status"];
    const tableRows = tabUsers.map((user) => [
      user.userName,
      user.name,
      new Date(user.bookingDate.seconds * 1000).toLocaleDateString(),
      user.status,
    ]);

    // Start table after the title
    doc.autoTable(tableColumn, tableRows, { startY: 75 });

    // Get the final Y position of the table to place the footer after the table
    const finalY = doc.lastAutoTable.finalY || 70;

    // Footer text after the table
    doc.setTextColor(100); // Optional: Set text color (gray in this case)
    doc.setFont("helvetica"); // Set font style to bold
    doc.setFontSize(10);
    doc.text("Created by: Hassan Fahad Khan", 20, finalY + 30);
    doc.setFontSize(10);
    doc.text("Signature: _______________________", 20, finalY + 40);
    doc.text("Dated:       /      /    ", 20, finalY + 50);
  };
  const reportsBtn = [
    {
      text: "Generate Report",
      fnc: handleGenerateReport,
      bgc: "bg-blue-500 dark:bg-blue-900 hover:bg-blue-700",
    },
    {
      text: "Download PDF",
      fnc: handleDownloadPDF,
      bgc: "bg-green-500 dark:bg-green-900 hover:bg-green-700",
    },
    {
      text: "Print Report",
      fnc: handlePrint,
      bgc: "bg-yellow-500 dark:bg-yellow-900 hover:bg-yellow-700",
    },
  ];
  return (
    <div className="flex justify-center items-center flex-wrap">
      {
        (allBtn) ? 
      (
        reportsBtn.map((repBtn) => (
        <button
          onClick={repBtn.fnc}
          className={` text-white px-4 py-2 rounded-md mr-4 mb-3 transition-all duration-150 ${repBtn.bgc} `}
        >
          {repBtn.text}
        </button>
      )))
        : 
          <button
          onClick={handleGenerateReport}
          className={` text-white px-4 py-2 rounded-md mr-4 mb-3 transition-all duration-150 bg-blue-500 dark:bg-blue-900 hover:bg-blue-700 `}
        >
          Generate Report
        </button>
      
      }
    </div>
  );
}

export default ReportsButtons;