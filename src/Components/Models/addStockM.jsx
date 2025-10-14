import * as React from "react";
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
  const [productName, setProductName] = React.useState(Modeldata?.productName || "");
  const [quantity, setQuantity] = React.useState(Modeldata?.quantity || "");
  const [unitPrice, setUnitPrice] = React.useState(Modeldata?.unitPrice || "");
  const [totalPrice, setTotalPrice] = React.useState(Modeldata?.totalPrice || "");
  const [supplierName, setSupplierName] = React.useState(Modeldata?.supplierName || "");
  const [currentDate, setCurrentDate] = React.useState(Modeldata?.currentDate || "");
  const [warrantyDate, setWarrantyDate] = React.useState(Modeldata?.warrantyDate || "");
  const [id, setId] = React.useState(Modeldata?._id || "");
  const [errors, setErrors] = React.useState({});

  // Auto-calc total price
  React.useEffect(() => {
    if (quantity && unitPrice) {
      setTotalPrice(quantity * unitPrice);
    }
  }, [quantity, unitPrice]);

  React.useEffect(() => {
    setProductName(Modeldata?.productName || "");
    setQuantity(Modeldata?.quantity || "");
    setUnitPrice(Modeldata?.unitPrice || "");
    setTotalPrice(Modeldata?.totalPrice || "");
    setSupplierName(Modeldata?.supplierName || "");
    setCurrentDate(Modeldata?.currentDate || "");
    setWarrantyDate(Modeldata?.warrantyDate || "");
    setId(Modeldata?._id || "");
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const stockData = {
      productName,
      quantity,
      unitPrice,
      totalPrice,
      supplierName,
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
        // 🔴 Handle missing fields like Supplier
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

        {/* Product Name + Supplier */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            error={!!errors.productName}
            helperText={errors.productName}
          />
          <TextField
            fullWidth
            label="Supplier Name"
            value={supplierName}
            onChange={(e) => setSupplierName(e.target.value)}
            error={!!errors.supplierName}
            helperText={errors.supplierName}
          />
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

        {/* Total Price (readonly) */}
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
        <Box
          sx={{
            display: "flex",
            gap: 2,
            justifyContent: "flex-end",
            mt: 3,
          }}
        >
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
