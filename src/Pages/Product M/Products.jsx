import React from "react";
import { useTable } from "../../Components/Models/useTable";

const Products = () => {
  // const productData = [
  //   { _id: 1, productName: "Dell Laptop", category: "Hardware", status: "Active" },
  //   { _id: 2, productName: "HP Monitor", category: "Hardware", status: "Active" },
  //   { _id: 3, productName: "MS Office License", category: "License", status: "Active" },
  //   { _id: 4, productName: "Logitech Mouse", category: "Hardware", status: "Inactive" },
  //   { _id: 5, productName: "Projector", category: "Hardware", status: "Active" },
  //   { _id: 6, productName: "Adobe Photoshop", category: "Software", status: "Active" },
  // ];

  const attributes = [
    // { id: "_id", label: "Product Id" },
    { id: "productName", label: "Product Name" },
    { id: "productId", label: "Product ID" },
     { id: "category", label: "Category" },
    { id: "status", label: "Status" },
  ];

  const { tableUI } = useTable({
    attributes,
    // pageData: productData,
    tableType: "Products",
  });

  return <div>{tableUI}</div>;
};

export default Products;
