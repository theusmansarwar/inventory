import React from "react";
import { useTable } from "../../Components/Models/useTable";

const DeadProduct = () => {
  // const deadProduct = [
  //   {
  //     _id: 1,
  //     productName: "HP Laptop",
  //     reason: "Motherboard Failure",
  //     status: "Dead",
  //   },
  //   {
  //     _id: 2,
  //     productName: "Dell Monitor",
  //     reason: "Screen Cracked",
  //     status: "Dead",
  //   },
  //   {
  //     _id: 3,
  //     productName: "Canon Printer",
  //     reason: "No longer functional",
  //     status: "Dead",
  //   },
  // ];

  const attributes = [
    // { id: "_id", label: "Dead Product ID" },
    { id: "productName", label: "Product Name" },
     //  { id: "deadProductId", label: "dead Id" },
    { id: "reason", label: "Reason" },
    { id: "status", label: "Status" },
  ];

  const { tableUI } = useTable({
    attributes,
    // pageData: deadProduct,
    tableType: "DeadProduct",
  });

  return <div>{tableUI}</div>;
};

export default DeadProduct;
