import { NextResponse } from "next/server";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getBusinessById } from "@/app/(dashboard)/dashboard/business/[businessId]/queries";
import {
    getAllInvoiceItemsByInvoiceId,
    getClientById,
    getInvoiceById,
} from "@/app/(dashboard)/dashboard/business/[businessId]/invoices/queries";
import { getUserById } from "@/app/(dashboard)/dashboard/account/queries";
import { inspect } from "node:util";

export async function GET(
    request: Request,
    {
        params,
    }: {
        params: Promise<{ invoiceId: string }>;
    }
) {
    const { invoiceId } = await params;

    //get invoice
    const invoice = await getInvoiceById(invoiceId);
    if (!invoice) return null;

    const invoiceItems = await getAllInvoiceItemsByInvoiceId(invoice.id);
    if (!invoiceItems) return null;
    //get client
    //get client address
    const client = await getClientById(invoice.clientId);
    if (!client) return null;
    console.log(inspect(client, { depth: null }));

    //get business
    const business = await getBusinessById(invoice!.businessId!);
    if (!business) return null;
    //get business owner
    const owner = await getUserById(business.userId);
    if (!owner) return null;

    //build business details
    const businessName =
        business.name[0].toUpperCase() + business.name.slice(1);
    const businessAddress = [
        business.address.addressLine1,
        business.address.addressLine2 ? business.address.addressLine2 : "",
        business.address.city,
        business.address.postalCode,
    ]
        .filter(Boolean)
        .join(", ");
    const businessEmail = owner.email;
    const businessPhone = "+94 77 123 4567";

    //client address
    const clientAddress = [
        client.address.addressLine1,
        client.address.addressLine2 ? client.address.addressLine2 : "",
        client.address.city,
        client.address.postalCode,
    ]
        .filter(Boolean)
        .join(", ");

    //pdf

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
    doc.text(businessName, 14, 20);
    doc.setFontSize(12);
    doc.setTextColor(...grayColor);
    doc.text(businessAddress, 14, 27);
    doc.text(`Email: ${businessEmail} | Phone: ${businessPhone}`, 14, 33);
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(14, 36, 196, 36);

    // Invoice Details
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Invoice No: #${invoice.id}`, 14, 45);
    doc.text(`Date: ${invoice.issueDate.toDateString()}`, 14, 50);
    doc.text(`Due Date: ${invoice.dueDate.toDateString()}`, 14, 55);

    // Client Details
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Bill To:", 14, 65);
    doc.setFont("helvetica", "normal");
    doc.text(`Client Name: ${client.name}`, 14, 70);
    doc.text(`Client Email: ${client.email}`, 14, 75);
    doc.text(`Client Address:${clientAddress} `, 14, 80);

    // Client description
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Description:", 14, 90);
    doc.setFont("helvetica", "normal");
    doc.text(`${invoice.description}`, 14, 95);

    //actualdata
    let subtotal = 0;
    let totalTax = 0;
    let totalDiscount = 0;

    let items = invoiceItems.map((item, index) => {
        const baseTotal = +item.price * +item.quantity;

        const taxRate = Number(item.taxRate) ?? 0; // Default to 0 if null
        const discountRate = Number(item.discountRate) ?? 0; // Default to 0 if null

        const taxAmount = baseTotal * (taxRate / 100);
        const discountAmount = baseTotal * (discountRate / 100);

        const finalTotal = baseTotal + taxAmount - discountAmount;

        subtotal += baseTotal;
        totalTax += taxAmount;
        totalDiscount += discountAmount;

        return [
            `${index + 1}`,
            item.name,
            `${item.quantity}`,
            discountRate > 0 ? `${discountRate}%` : "-", // Replace 0 or null with "-"
            taxRate > 0 ? `${taxRate}%` : "-", // Replace 0 or null with "-"
            `${item.price}`,
            `${finalTotal.toFixed(2)}`,
        ];
    });

    const grandTotal = subtotal + totalTax - totalDiscount;

    // Content height before the table (Header + Client Details)
    const initialContentHeight = 120;
    const footerMargin = 20; // Footer margin from bottom of the page
    const pageHeight = doc.internal.pageSize.height;
    const footerHeight = 10; // Height of the footer

    // Start position for the first page's table
    let startY = initialContentHeight;
    items = [
        ...items,
        ["", "", "", "", ""], // Empty Row for spacing
        ["", "", "", "", "", "Subtotal:", `${subtotal.toFixed(2)}`],
        [
            "",
            "",
            "",
            "",
            "",
            "Total Tax:",
            totalTax > 0 ? `${totalTax.toFixed(2)}` : "-",
        ],
        [
            "",
            "",
            "",
            "",
            "",
            "Total Discount:",
            totalDiscount > 0 ? `${totalDiscount.toFixed(2)}` : "-",
        ],
        ["", "", "", "", "", "Grand Total:", `${grandTotal.toFixed(2)}`],
    ];

    autoTable(doc, {
        head: [
            [
                "Product Id",
                "Product Name",
                "Qty",
                "Discount%",
                "Tax%",
                "Unit Price($)",
                "Product Total($)",
            ],
        ],
        body: items.slice(0, 15),
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
            0: { halign: "left" },
            1: { halign: "left" },
            2: { halign: "right" },
            3: { halign: "right" },
            4: { halign: "right" },
            5: { halign: "right" },
            6: { halign: "right" },
        },
        didDrawPage: () => {
            const footerY = pageHeight - footerMargin - footerHeight;

            // Draw footer separator line at a fixed position (20mm from bottom)
            doc.setDrawColor(...primaryColor);
            doc.setLineWidth(0.5);
            doc.line(14, footerY, 196, footerY);

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

    let currentRow = 15;

    while (currentRow < items.length) {
        doc.addPage();
        startY = 20;

        autoTable(doc, {
            head: [
                [
                    "Product Id",
                    "Product Name",
                    "Qty",
                    "Discount%",
                    "Tax%",
                    "Unit Price($)",
                    "Product Total($)",
                ],
            ],
            body: items.slice(0, 15),
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
                0: { halign: "left" },
                1: { halign: "left" },
                2: { halign: "right" },
                3: { halign: "right" },
                4: { halign: "right" },
                5: { halign: "right" },
                6: { halign: "right" },
            },
            didDrawPage: (data) => {
                const footerY = pageHeight - footerMargin - footerHeight;

                // Draw footer separator line at a fixed position (20mm from bottom)
                doc.setDrawColor(...primaryColor);
                doc.setLineWidth(0.5);
                doc.line(14, footerY, 196, footerY);

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
