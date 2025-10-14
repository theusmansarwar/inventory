import React from "react";
import { useTable } from "../../Components/Models/useTable";

const AssetM = () => {
  // const assetData = [
  //   {
  //     _id: 1,
  //     productName: "Dell Laptop Latitude 5400",
  //     employeeName: "Ali Khan",
  //     employeeId: "EMP101",
  //     assignDate: "2023-01-10",
  //     condition: "Good",
  //     status: "Assigned",
  //   },
  //   {
  //     _id: 2,
  //     productName: "HP ProDesk 400 G6",
  //     employeeName: "Sara Ahmed",
  //     employeeId: "EMP102",
  //     assignDate: "2023-03-15",
  //     condition: "Fair",
  //     status: "Returned",
  //   },
  //   {
  //     _id: 3,
  //     productName: "Epson L3150 Printer",
  //     employeeName: "Zain Ali",
  //     employeeId: "EMP103",
  //     assignDate: "2023-06-01",
  //     condition: "Good",
  //     status: "Delay",
  //   },
  //   {
  //     _id: 4,
  //     productName: "Logitech Conference Camera",
  //     employeeName: "Fatima Noor",
  //     employeeId: "EMP104",
  //     assignDate: "2023-08-20",
  //     condition: "Excellent",
  //     status: "Damaged",
  //   },
  // ];

  const attributes = [
    // { id: "_id", label: "Assign ID" },
    { id: "productName", label: "Product Name" },
    { id: "employeeName", label: "Employee Name" },
    { id: "employeeId", label: "Employee ID" },
    { id: "assignDate", label: "Assign Date" },
    { id: "condition", label: "Condition" },
    { id: "status", label: "Status" },
  ];

  const { tableUI } = useTable({
    attributes,
    // pageData: assetData,
    tableType: "AssetM",
  });

  return <div>{tableUI}</div>;
};

export default AssetM;
