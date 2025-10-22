import React from "react";
import { useTable } from "../../Components/Models/useTable";

const Maintenance = () => {
  // const maintenanceData = [
  //   {
  //     _id: 1,
  //     assetName: "Dell Laptop Latitude 5400",
  //     issue: "Battery Replacement",
  //     reportedDate: "2023-01-05",
  //     resolvedDate: "2023-01-10",
  //     status: "Resolved",
  //     expense: 5000,
  //   },
  //   {
  //     _id: 2,
  //     assetName: "HP ProDesk 400 G6",
  //     issue: "Hard Disk Failure",
  //     reportedDate: "2023-02-12",
  //     resolvedDate: "2023-02-15",
  //     status: "In Progress",
  //     expense: 8000,
  //   },
  //   {
  //     _id: 3,
  //     assetName: "Epson L3150 Printer",
  //     issue: "Paper Jam Issue",
  //     reportedDate: "2023-03-08",
  //     resolvedDate: "2023-03-09",
  //     status: "Resolved",
  //     expense: 1500,
  //   },
  //   {
  //     _id: 4,
  //     assetName: "Cisco Switch 24-Port",
  //     issue: "Port Malfunction",
  //     reportedDate: "2023-04-18",
  //     resolvedDate: "2023-04-25",
  //     status: "Pending",
  //     expense: 6000,
  //   },
  //   {
  //     _id: 5,
  //     assetName: "Samsung Projector",
  //     issue: "Lens Cleaning",
  //     reportedDate: "2023-05-10",
  //     resolvedDate: "2023-05-11",
  //     status: "Resolved",
  //     expense: 2000,
  //   },
  //   {
  //     _id: 6,
  //     assetName: "Canon DSLR 200D",
  //     issue: "Shutter Issue",
  //     reportedDate: "2023-06-20",
  //     resolvedDate: "2023-06-25",
  //     status: "Resolved",
  //     expense: 7000,
  //   },
  //   {
  //     _id: 7,
  //     assetName: "Lenovo ThinkPad T14",
  //     issue: "Keyboard Replacement",
  //     reportedDate: "2023-07-15",
  //     resolvedDate: "2023-07-18",
  //     status: "In Progress",
  //     expense: 3500,
  //   },
  //   {
  //     _id: 8,
  //     assetName: "Brother Scanner DS-640",
  //     issue: "Scanning Error",
  //     reportedDate: "2023-08-12",
  //     resolvedDate: "2023-08-14",
  //     status: "Resolved",
  //     expense: 1800,
  //   },
  //   {
  //     _id: 9,
  //     assetName: "MS Surface Pro 7",
  //     issue: "Screen Flickering",
  //     reportedDate: "2023-09-02",
  //     resolvedDate: "2023-09-05",
  //     status: "Pending",
  //     expense: 9000,
  //   },
  //   {
  //     _id: 10,
  //     assetName: "Apple iMac 27-inch",
  //     issue: "OS Reinstallation",
  //     reportedDate: "2023-10-01",
  //     resolvedDate: "2023-10-02",
  //     status: "Resolved",
  //     expense: 4000,
  //   },
  // ];

  const attributes = [
    { id: "assetName", label: "Asset Name" },
    { id: "maintenanceId", label: "maintenance Id" },
    { id: "issue", label: "Issue" },
    { id: "reportedDate", label: "Reported Date" },
    { id: "resolvedDate", label: "Resolved Date" },
    { id: "status", label: "Status" },
    { id: "expense", label: "Expense (PKR)" },
  ];

  const { tableUI } = useTable({
    attributes,
    // pageData: maintenanceData,
    tableType: "Maintenance",
  });

  return <div>{tableUI}</div>;
};

export default Maintenance;
