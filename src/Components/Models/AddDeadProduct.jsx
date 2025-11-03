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
import { fetchallProductlist } from "../../DAL/fetch";
import { createDeadProduct } from "../../DAL/create";
import { updateDeadProduct } from "../../DAL/edit";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "12px",
};

export default function AddDeadProduct({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [productName, setProductName] = useState(Modeldata?.productName || "");
  const [reason, setReason] = useState(Modeldata?.reason || "");
  const [status, setStatus] = useState(Modeldata?.status || "Dead");
  const [id, setId] = useState(Modeldata?._id || "");
  const [errors, setErrors] = useState({});
  const [productList, setProductList] = useState([]);

  // 🔄 Reset form data when editing
  useEffect(() => {
    setProductName(Modeldata?.productName || "");
    setReason(Modeldata?.reason || "");
    setStatus(Modeldata?.status || "Dead");
    setId(Modeldata?._id || "");
    setErrors({});
  }, [Modeldata]);

  // ✅ Fetch products when modal opens
  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchallProductlist(1, 100, "");
        const products =
          response?.data?.data ||
          response?.data?.products ||
          response?.products ||
          response?.data ||
          [];
        setProductList(products);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    if (open) getProducts();
  }, [open]);

  // ❌ Close Modal
  const handleClose = () => setOpen(false);

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const deadProductData = { productName, reason, status };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createDeadProduct(deadProductData);
      } else {
        response = await updateDeadProduct(id, deadProductData);
      }

      if (response?.status === 201 || response?.status === 200) {
        // ✅ Success
        onResponse({ messageType: "success", message: response.message, reload: true });

        // ✅ Reset form fields
        setProductName("");
        setReason("");
        setStatus("Dead");
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
          {Modeltype} Dead Product
        </Typography>

        {/* Product Name + Reason */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth error={!!errors.productName}>
            <InputLabel id="product-label">Product Name</InputLabel>
            <Select
              labelId="product-label"
              label="Product Name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            >
              {productList.length > 0 ? (
                productList.map((p) => (
                  <MenuItem key={p._id} value={p.productName}>
                    {p.productName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No Products Found</MenuItem>
              )}
            </Select>
            {errors.productName && (
              <FormHelperText>{errors.productName}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            required
            label="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            error={!!errors.reason}
            helperText={errors.reason}
          />
        </Box>

        {/* Status Dropdown */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth error={!!errors.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Dead">Dead</MenuItem>
            </Select>
            {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
          </FormControl>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
          <Button
            type="button"
            variant="contained"
            sx={{ backgroundColor: "#B1B1B1" , textTransform: "none",}}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            type="submit"
            variant="contained"
            sx={{
              background: "var(--horizontal-gradient, #1976d2)",
              color: "#fff",
              borderRadius: "8px",
              "&:hover": { background: "var(--vertical-gradient, #115293)" },
                textTransform: "none",
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
