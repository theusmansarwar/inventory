import React from "react";
import { useTable } from "../../Components/Models/useTable";

const LicenseM = () => {
  // const licenseData = [
  //   {
  //     _id: 1,
  //     productName: "Microsoft Office 365",
  //     licenseKey: "MSOFF-12345-67890",
  //     expiryDate: "2025-01-10",
  //     assignedTo: "Finance Dept",
  //     status: "Active"
  //   },
  //   {
  //     _id: 2,
  //     productName: "Adobe Photoshop CC",
  //     licenseKey: "ADOBE-22222-33333",
  //     expiryDate: "2024-07-05",
  //     assignedTo: "Design Dept",
  //     status: "Active"
  //   },
  //   {
  //     _id: 3,
  //     productName: "Visual Studio Enterprise",
  //     licenseKey: "VS-44444-55555",
  //     expiryDate: "2026-03-12",
  //     assignedTo: "Development Team",
  //     status: "Active"
  //   },
  //   {
  //     _id: 4,
  //     productName: "AutoCAD 2022",
  //     licenseKey: "CAD-66666-77777",
  //     expiryDate: "2024-11-22",
  //     assignedTo: "Engineering Dept",
  //     status: "Active"
  //   },
  //   {
  //     _id: 5,
  //     productName: "Zoom Enterprise",
  //     licenseKey: "ZOOM-88888-99999",
  //     expiryDate: "2024-12-31",
  //     assignedTo: "HR Dept",
  //     status: "Active"
  //   },
  //   {
  //     _id: 6,
  //     productName: "Slack Premium",
  //     licenseKey: "SLACK-10101-20202",
  //     expiryDate: "2024-09-09",
  //     assignedTo: "Operations",
  //     status: "Active"
  //   },
  //   {
  //     _id: 7,
  //     productName: "Oracle DB License",
  //     licenseKey: "ORC-30303-40404",
  //     expiryDate: "2026-05-18",
  //     assignedTo: "IT Dept",
  //     status: "Active"
  //   },
  //   {
  //     _id: 8,
  //     productName: "Windows Server 2019",
  //     licenseKey: "WIN-50505-60606",
  //     expiryDate: "2025-10-25",
  //     assignedTo: "Server Room",
  //     status: "Active"
  //   },
  //   {
  //     _id: 9,
  //     productName: "GitHub Enterprise",
  //     licenseKey: "GIT-70707-80808",
  //     expiryDate: "2023-04-15",
  //     assignedTo: "Developers",
  //     status: "Expired"
  //   },
  //   {
  //     _id: 10,
  //     productName: "Dropbox Business",
  //     licenseKey: "DROP-90909-11111",
  //     expiryDate: "2024-08-21",
  //     assignedTo: "Admin Dept",
  //     status: "Active"
  //   }
  // ];

    const attributes = [
    // { id: "_id", label: "License ID" },
    { id: "productName", label: "Product Name" },
    { id: "licenseId", label: "License Id" },
    { id: "licenseKey", label: "License Key" },
    { id: "expiryDate", label: "Expiry Date" },
    { id: "assignedTo", label: "Assigned To" },
    { id: "status", label: "Status" },
  ];

  const { tableUI } = useTable({
    attributes,
    // pageData: licenseData,
    tableType: "LicenseM"
  });

  return <div>{tableUI}</div>;
};

export default LicenseM;
