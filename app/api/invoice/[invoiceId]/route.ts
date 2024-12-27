import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ invoiceId: string }>;
  }
) {
  const { invoiceId } = await params;
  console.log(invoiceId);

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  // Colors and Fonts
  const primaryColor: [number, number, number] = [63, 81, 181]; // Blue
  const grayColor: [number, number, number] = [150, 150, 150];
  const darkColor: [number, number, number] = [33, 33, 33]; // Dark color for footer text
  const primaryFont = "helvetica";

  doc.setFont(primaryFont);

  // Header Section
  doc.setFontSize(20);
  doc.setTextColor(...primaryColor);
  doc.text("Business Name", 14, 20);
  doc.setFontSize(12);
  doc.setTextColor(...grayColor);
  doc.text("123 Main Street, Kandy, Sri Lanka", 14, 27);
  doc.text("Email: business@example.com | Phone: +94 77 123 4567", 14, 33);
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.line(14, 36, 196, 36);

  // Invoice Details
  doc.setFontSize(12);
  doc.setTextColor(0, 0, 0);
  doc.text("Invoice #: INV-1001", 14, 45);
  doc.text("Date: 2024-12-27", 14, 50);
  doc.text("Due Date: 2025-01-03", 14, 55);

  // Client Details
  doc.setFontSize(12);
  doc.text("Bill To:", 14, 65);
  doc.setFont("helvetica", "bold");
  doc.text("Client Name", 14, 70);
  doc.setFont("helvetica", "normal");
  doc.text("456 Client Street, Colombo, Sri Lanka", 14, 75);

  // Invoice Items Table
  let items = Array.from({ length: 100 }, (_, index) => [
    `Item ${index + 1}`,
    `Description for item ${index + 1}`,
    `${Math.ceil(Math.random() * 5)}`, // Random quantity
    `$${(Math.random() * 50 + 10).toFixed(2)}`, // Random unit price
    `$${((Math.random() * 50 + 10) * Math.ceil(Math.random() * 5)).toFixed(2)}`, // Random total
  ]);

  let subtotal = 0;
  items.forEach((item) => {
    const total = parseFloat(item[4].replace("$", ""));
    subtotal += total;
  });
  const taxRate = 0.1; // 10%
  const taxTotal = subtotal * taxRate;
  const discountTotal = 50; // Example fixed discount
  const grandTotal = subtotal + taxTotal - discountTotal;

  // Content height before the table (Header + Client Details)
  const initialContentHeight = 90;
  const footerMargin = 20; // Footer margin from bottom of the page
  const pageHeight = doc.internal.pageSize.height;
  const footerHeight = 10; // Height of the footer

  // Start position for the first page's table
  let startY = initialContentHeight;

  items = [
    ...items,
    ...[
      ["", "", "", "", ""],
      ["", "", "", "Subtotal:", `$${subtotal.toFixed(2)}`],
      ["", "", "", "Tax (10%):", `$${taxTotal.toFixed(2)}`],
      ["", "", "", "Discount:", `$${discountTotal.toFixed(2)}`],
      ["", "", "", "Grand Total:", `$${grandTotal.toFixed(2)}`],
    ],
  ];

  // Render first page with 20 rows
  autoTable(doc, {
    head: [["Item", "Description", "Qty", "Unit Price", "Total"]],
    body: items.slice(0, 20), // Render first 20 rows
    startY: startY,
    theme: "grid",
    styles: {
      font: primaryFont,
      fontSize: 10,
      textColor: [0, 0, 0],
    },
    headStyles: {
      fillColor: primaryColor,
      textColor: [255, 255, 255],
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
    bodyStyles: {
      fillColor: [255, 255, 255],
      textColor: [0, 0, 0],
    },
    columnStyles: {
      2: { halign: "right" }, // Qty column
      3: { halign: "right" }, // Unit Price column
      4: { halign: "right" }, // Total column
    },
    didDrawPage: () => {
      const footerY = pageHeight - footerMargin - footerHeight;

      // Draw footer separator line at a fixed position (20mm from bottom)
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.5);
      doc.line(14, footerY, 196, footerY); // Footer separator line

      // Footer content
      doc.setFontSize(10);
      doc.setTextColor(...darkColor);
      doc.text(
        "Thank you for your business! Please contact us if you have any questions.",
        14,
        footerY + 5
      );

      // Page number
      doc.setFont("helvetica", "italic");
      doc.text(
        `Page ${doc.getNumberOfPages()}`,
        doc.internal.pageSize.width - 20,
        footerY + 5
      );
    },
  });

  // Add a new page for the remaining items and render 30 items per page
  let currentRow = 20;

  while (currentRow < items.length) {
    doc.addPage();
    startY = 20; // Reset startY for new page

    autoTable(doc, {
      head: [["Item", "Description", "Qty", "Unit Price", "Total"]],
      body: [...items.slice(currentRow, currentRow + 30)], // Render 30 rows per page
      startY: startY,
      theme: "grid",
      styles: {
        font: primaryFont,
        fontSize: 10,
        textColor: [0, 0, 0],
      },
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
      },
      columnStyles: {
        2: { halign: "right" }, // Qty column
        3: { halign: "right" }, // Unit Price column
        4: { halign: "right" }, // Total column
      },
      didDrawPage: () => {
        const footerY = pageHeight - footerMargin - footerHeight;

        // Draw footer separator line at a fixed position (20mm from bottom)
        doc.setDrawColor(...primaryColor);
        doc.setLineWidth(0.5);
        doc.line(14, footerY, 196, footerY); // Footer separator line

        // Footer content
        doc.setFontSize(10);
        doc.setTextColor(...darkColor);
        doc.text(
          "Thank you for your business! Please contact us if you have any questions.",
          14,
          footerY + 5
        );

        // Page number
        doc.setFont("helvetica", "italic");
        doc.text(
          `Page ${doc.getNumberOfPages()}`,
          doc.internal.pageSize.width - 20,
          footerY + 5
        );
      },
    });

    currentRow += 30; // Move to the next set of 30 rows
  }

  // Generate PDF as buffer
  const pdfBuffer = Buffer.from(doc.output("arraybuffer"));

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline",
    },
  });
}
