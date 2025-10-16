import  React   from "react";
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
import { createLicenseM } from "../../DAL/create";
import { updateLicenseM } from "../../DAL/edit";
import { useEffect, useState } from "react";


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

export default function AddLicense({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [productName, setProductName] = useState(Modeldata?.productName || "");
  const [licenseKey, setLicenseKey] = React.useState(Modeldata?.licenseKey || "");
  const [expiryDate, setExpiryDate] = React.useState(Modeldata?.expiryDate || "");
  const [assignedTo, setAssignedTo] = React.useState(Modeldata?.assignedTo || "");
  const [status, setStatus] = React.useState(Modeldata?.status || "Active");
  const [id, setId] = React.useState(Modeldata?._id || "");
  const [errors, setErrors] = React.useState({});

  // ✅ Product dropdown state
  const [productList, setProductList] = React.useState([]);

  useEffect(() => {
    setProductName(Modeldata?.productName || "");
    setLicenseKey(Modeldata?.licenseKey || "");
    setExpiryDate(Modeldata?.expiryDate || "");
    setAssignedTo(Modeldata?.assignedTo || "");
    setStatus(Modeldata?.status || "Active");
    setId(Modeldata?._id || "");
    setErrors({});
  }, [Modeldata]);

  // ✅ Fetch product list when modal opens

 React.useEffect(() => {
  const getProducts = async () => {
    try {
      const response = await fetchallProductlist();
      console.log("Fetched products:", response?.products);

      // ✅ Correct condition
      if (response) {
        setProductList(response.products);
        console.log("Response full:", response);
console.log("Direct products:", response?.products);

      } else {
        console.warn("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  if (open) {
    getProducts();
  }
}, [open]);




  

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const licenseData = {
      productName,
      licenseKey,
      expiryDate,
      assignedTo,
      status,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createLicenseM(licenseData);
      } else {
        response = await updateLicenseM(id, licenseData);
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
          {Modeltype} License
        </Typography>

        {/* ✅ Product Dropdown + License Key */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth error={!!errors.productName}>
            <InputLabel id="product-label">Product</InputLabel>
            <Select
              labelId="product-label"
              label="Product"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            >
              {productList.map((p) => (
                <MenuItem key={p._id} value={p.productName}>
                  {p.productName}
                </MenuItem>
              ))}
            </Select>
            {errors.productName && <FormHelperText>{errors.productName}</FormHelperText>}
          </FormControl>

          <TextField
            fullWidth
            required
            label="License Key"
            value={licenseKey}
            onChange={(e) => setLicenseKey(e.target.value)}
            error={!!errors.licenseKey}
            helperText={errors.licenseKey}
          />
        </Box>

        {/* Expiry Date + Assigned To */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Expiry Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            error={!!errors.expiryDate}
            helperText={errors.expiryDate}
          />
          <TextField
            fullWidth
            required
            label="Assigned To"
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            error={!!errors.assignedTo}
            helperText={errors.assignedTo}
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
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Expired">Expired</MenuItem>
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
              color: "#fff",
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
