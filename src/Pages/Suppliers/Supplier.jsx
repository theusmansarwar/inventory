import React from "react";
import { useTable } from "../../Components/Models/useTable";

const Supplier = () => {
  // const supplierData = [
  //   { _id: 1, name: "TechVendor Ltd", contact: "0300-1234567", email: "vendor1@example.com", address: "Karachi", status: "Active" },
  //   { _id: 2, name: "SoftWorld Pvt", contact: "0300-2223334", email: "softworld@example.com", address: "Lahore", status: "Active" },
  //   { _id: 3, name: "FutureTech", contact: "0300-5557778", email: "future@example.com", address: "Islamabad", status: "Inactive" },
  //   { _id: 4, name: "Laptop House", contact: "0300-4446669", email: "laptops@example.com", address: "Karachi", status: "Active" },
  //   { _id: 5, name: "Smart Supplies", contact: "0300-8889990", email: "smart@example.com", address: "Multan", status: "Active" },
  // ];

  const attributes = [
    // { id: "_id", label: "Supplier Id" },
    { id: "name", label: "Name" },
    { id: "contact", label: "Contact" },
    { id: "email", label: "Email" },
    { id: "address", label: "Address" },
    { id: "status", label: "Status" },
  ];

  const { tableUI } = useTable({ 
    attributes,
    //  pageData: supplierData, 
     tableType: "Suppliers" });

  return <div>{tableUI}</div>;
};

export default Supplier;
