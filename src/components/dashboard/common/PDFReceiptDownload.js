import jsPDF from 'jspdf';
import logo from '../../../assets/common/logo.png';

export const downloadPDF = (booking) => {
    const doc = new jsPDF();
  
    doc.setFillColor(60, 120, 180); // Blue color
    doc.rect(0, 0, 210, 30, 'F'); // Header rectangle covering the top of the page
  
    // Add the logo image on top of the header
    doc.addImage(logo, 'JPEG', 10, 5, 50, 20 , 'center'); 
  
    // Add title
    doc.setTextColor(255, 255, 255); // White text
    doc.setFontSize(16);
    doc.setFont("bold");
    doc.text('Online Hostel Room Reservation System', 105, 20, null, null, 'center');
  
    // Add contact info below header
    doc.setTextColor(0, 0, 0); // Reset to black
    doc.setFontSize(10);
    doc.text('WhatsApp: +92 3400480888', 150, 40);
    doc.text('Email: hfahad534@gmail.com', 150, 45);
  
    // Add line divider
    doc.setDrawColor(0, 0, 0);
    doc.line(10, 50, 200, 50);
  
    // Add watermark
    doc.setFontSize(60);
    doc.setTextColor(200, 200, 200); // Light gray
    // doc.text('CONFIDENTIAL', 35, 140, null, null, 'rotate', 45); 
  
    // Booking Details Section
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Booking Details', 10, 60);
  
    // Add details
    doc.setFontSize(12);
    doc.text(`Hostel Name: ${booking.name}`, 10, 70);
    doc.text(`Hostel Location: ${booking.location}`, 10, 80);
    doc.text(`Applicant Name: ${booking.userName}`, 10, 90);
  
    // Booking dates
    const bookingDate = booking.bookingDate
        ? new Date(booking.bookingDate.seconds * 1000).toLocaleDateString()
        : 'Not available';
    const startDate = booking.startDate
        ? new Date(booking.startDate.seconds * 1000).toLocaleDateString()
        : 'Not available';
    const endDate = booking.endDate
        ? new Date(booking.endDate.seconds * 1000).toLocaleDateString()
        : 'Not available';
  
    doc.text(`Booking Date: ${bookingDate}`, 10, 100);
    doc.text(`Booked from: ${startDate}`, 10, 110);
    doc.text(`Booked until: ${endDate}`, 10, 120);
    doc.text(`Status: ${booking.status}`, 10, 130);
    doc.text(`Price: ${booking.price}`, 10, 140);
    // Footer Section
    doc.line(10, 260, 200, 260); // Footer line
    doc.setFontSize(10);
    doc.text('Signature _________________________________________', 10, 270);
    doc.text('This document is confidential and intended for official use only.', 10, 280);
    doc.text('Created by : Hassan Fahad Khan', 10, 290);
  
    // Save PDF
    doc.save(`${booking.name}_booking.pdf`);
  };