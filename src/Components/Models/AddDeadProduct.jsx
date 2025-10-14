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

import { updateDeadProduct } from "../../DAL/edit";
import { createDeadProduct } from "../../DAL/create";

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
  const [deadProductId, setDeadProductId] = React.useState(Modeldata?.deadProductId || "");
  const [productName, setProductName] = React.useState(Modeldata?.productName || "");
  const [reason, setReason] = React.useState(Modeldata?.reason || "");
  const [status, setStatus] = React.useState(Modeldata?.status || "Dead");
  const [id, setId] = React.useState(Modeldata?._id || "");
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setDeadProductId(Modeldata?.deadProductId || "");
    setProductName(Modeldata?.productName || "");
    setReason(Modeldata?.reason || "");
    setStatus(Modeldata?.status || "Dead");
    setId(Modeldata?._id || "");
    setErrors({});
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const deadProductData = {
      deadProductId,
      productName,
      reason,
      status,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createDeadProduct(deadProductData);
      } else {
        response = await updateDeadProduct(id, deadProductData);
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
          {Modeltype} Dead Product
        </Typography>

        {/* Dead Product ID */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            required
            label="Dead Product ID"
            value={deadProductId}
            onChange={(e) => setDeadProductId(e.target.value)}
            error={!!errors.deadProductId}
            helperText={errors.deadProductId}
          />
        </Box>

        {/* Product Name + Reason */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth error={!!errors.productName}>
            <InputLabel id="product-name-label">Select Product</InputLabel>
            <Select
              labelId="product-name-label"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              label="Select Product"
            >
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Printer">Printer</MenuItem>
              <MenuItem value="Router">Router</MenuItem>
              <MenuItem value="Monitor">Monitor</MenuItem>
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

        {/* Status */}
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
              background: "var(--horizontal-gradient, #1976d2)",
              color: "var(--white-color, #fff)",
              borderRadius: "8px",
              "&:hover": { background: "var(--vertical-gradient, #115293)" },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
