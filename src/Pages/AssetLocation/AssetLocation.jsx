import React from "react";
import { useTable } from "../../Components/Models/useTable";

const AssetLocation = () => {
  // const assetLocationData = [
  //   { _id: 1, assetName: "Dell Laptop", branch: "Head Office", floor: "2nd", room: "201", assignedTo: "EMP-101", status: "Active" },
  //   { _id: 2, assetName: "HP Printer", branch: "Branch Office", floor: "1st", room: "105", assignedTo: "EMP-203", status: "Active" },
  //   { _id: 3, assetName: "Projector", branch: "Main Office", floor: "3rd", room: "305", assignedTo: "EMP-110", status: "Inactive" },
  // ];

  const attributes = [
    // { id: "_id", label: "Asset Id" },
    { id: "assetName", label: "Asset Name" },
    { id: "branch", label: "Branch" },
    { id: "floor", label: "Floor" },
    { id: "room", label: "Room" },
    { id: "assignedTo", label: "Assigned To" },
    { id: "status", label: "Status" },
  ];

  const { tableUI } = useTable({ 
    attributes,
    //  pageData: assetLocationData,
      tableType: "AssetLocation" });

  return <div>{tableUI}</div>;
};

export default AssetLocation;