import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
} from "@mui/material";
import { createStockM } from "../../DAL/create";
import { updateStock } from "../../DAL/edit";
import { fetchallProductlist, fetchallSupplierlist } from "../../DAL/fetch";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddStock({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  // ✅ Dropdown states
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplier, setSelectedSupplier] = useState("");

  // ✅ Other form states
  const [quantity, setQuantity] = useState(Modeldata?.quantity || "");
  const [unitPrice, setUnitPrice] = useState(Modeldata?.unitPrice || "");
  const [totalPrice, setTotalPrice] = useState(Modeldata?.totalPrice || "");
  const [currentDate, setCurrentDate] = useState(Modeldata?.currentDate || "");
  const [warrantyDate, setWarrantyDate] = useState(Modeldata?.warrantyDate || "");
  const [id, setId] = useState(Modeldata?._id || "");
  const [errors, setErrors] = useState({});

  // ✅ Fetch Products & Suppliers
  useEffect(() => {
    const getDropdownData = async () => {
      try {
        const productRes = await fetchallProductlist(1, 1000, "");
        const supplierRes = await fetchallSupplierlist(1, 1000, "");

        console.log("🟢 Products:", productRes);
        console.log("🟢 Suppliers:", supplierRes);

        // ✅ Adjust according to API response structure
        setProducts(productRes?.products || productRes?.data || []);
        setSuppliers(supplierRes?.suppliers || supplierRes?.data || []);
      } catch (error) {
        console.error("Error fetching dropdown data:", error);
      }
    };

    getDropdownData();
  }, []);

  // ✅ Auto-calc total price
  useEffect(() => {
    if (quantity && unitPrice) {
      setTotalPrice(quantity * unitPrice);
    }
  }, [quantity, unitPrice]);

  // ✅ Handle model data update
 useEffect(() => {
  if (Modeldata) {
    // ✅ Product name OR nested object
    setSelectedProduct(
      Modeldata?.productName?.productName || // if productName is an object
      Modeldata?.productName || // if it's a string
      ""
    );

    // ✅ Supplier name OR nested object
    setSelectedSupplier(
      Modeldata?.supplierName?.name || // if supplierName is an object
      Modeldata?.supplierName || // if it's a string
      ""
    );

    setQuantity(Modeldata?.quantity || "");
    setUnitPrice(Modeldata?.unitPrice || "");
    setTotalPrice(Modeldata?.totalPrice || "");

    // ✅ Date fix for input type="date"
    setCurrentDate(
      Modeldata?.currentDate ? Modeldata.currentDate.split("T")[0] : ""
    );
    setWarrantyDate(
      Modeldata?.warrantyDate ? Modeldata.warrantyDate.split("T")[0] : ""
    );

    setId(Modeldata?._id || "");
  }
}, [Modeldata]);


  const handleClose = () => setOpen(false);

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const stockData = {
      productName: selectedProduct,
      supplierName: selectedSupplier,
      quantity,
      unitPrice,
      totalPrice,
      currentDate,
      warrantyDate,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createStockM(stockData);
      } else {
        response = await updateStock(id, stockData);
      }

      if (response?.status === 201 || response?.status === 200) {
        onResponse({ messageType: "success", message: response.message });
        setErrors({});
        setOpen(false);
      } else if (response?.status === 400 && response?.missingFields) {
        const fieldErrors = {};
        response.missingFields.forEach((f) => {
          fieldErrors[f.name] = f.message;
        });
        setErrors(fieldErrors);
      } else {
        onResponse({ messageType: "error", message: response?.message });
      }
    } catch (err) {
      console.error("❌ Error:", err);
      onResponse({
        messageType: "error",
        message: err.response?.data?.message || "Server error",
      });
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {Modeltype} Stock
        </Typography>

        {/* Product + Supplier Dropdowns */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
<FormControl fullWidth error={!!errors.productName}>
  <InputLabel>Select Product</InputLabel>
  <Select
    value={selectedProduct}
    onChange={(e) => setSelectedProduct(e.target.value)}
    label="Select Product"
  >
    {products.map((prod) => (
      <MenuItem key={prod._id} value={prod.productName}>
        {prod.productName}
      </MenuItem>
    ))}
  </Select>
</FormControl>

<FormControl fullWidth error={!!errors.supplierName}>
  <InputLabel>Select Supplier</InputLabel>
  <Select
    value={selectedSupplier}
    onChange={(e) => setSelectedSupplier(e.target.value)}
    label="Select Supplier"
  >
    {suppliers.map((sup) => (
      <MenuItem key={sup._id} value={sup.name}>
        {sup.name}
      </MenuItem>
    ))}
  </Select>
</FormControl>


        </Box>

        {/* Quantity + Unit Price */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            type="number"
            label="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            error={!!errors.quantity}
            helperText={errors.quantity}
          />
          <TextField
            fullWidth
            type="number"
            label="Unit Price"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            error={!!errors.unitPrice}
            helperText={errors.unitPrice}
          />
        </Box>

        {/* Total Price */}
        <Box sx={{ mt: 2 }}>
          <TextField
            fullWidth
            label="Total Price"
            value={totalPrice}
            InputProps={{ readOnly: true }}
          />
        </Box>

        {/* Dates */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            type="date"
            label="Current Date"
            InputLabelProps={{ shrink: true }}
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            error={!!errors.currentDate}
            helperText={errors.currentDate}
          />
          <TextField
            fullWidth
            type="date"
            label="Warranty Date"
            InputLabelProps={{ shrink: true }}
            value={warrantyDate}
            onChange={(e) => setWarrantyDate(e.target.value)}
            error={!!errors.warrantyDate}
            helperText={errors.warrantyDate}
          />
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
          <Button
            type="button"
            variant="contained"
            sx={{ backgroundColor: "#B1B1B1" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={{
              background: "var(--horizontal-gradient)",
              color: "var(--white-color)",
              borderRadius: "var(--border-radius-secondary)",
              "&:hover": { background: "var(--vertical-gradient)" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
