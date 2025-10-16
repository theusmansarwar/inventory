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
import { createAssetM } from "../../DAL/create";
import { updateAssetM } from "../../DAL/edit";
import { fetchallProductlist } from "../../DAL/fetch"; // ✅ Import product API

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

export default function AddAssetAssignment({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  // ✅ Dropdown states
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState("");

  // ✅ Other fields
  const [employeeName, setEmployeeName] = React.useState(Modeldata?.employeeName || "");
  const [employeeId, setEmployeeId] = React.useState(Modeldata?.employeeId || "");
  const [assignDate, setAssignDate] = React.useState(Modeldata?.assignDate || "");
  const [condition, setCondition] = React.useState(Modeldata?.condition || "");
  const [status, setStatus] = React.useState(Modeldata?.status || "");
  const [id, setId] = React.useState(Modeldata?._id || "");
  const [errors, setErrors] = React.useState({});

  // ✅ Fetch product list for dropdown
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchallProductlist(1, 1000, "");
        console.log("🟢 Product list response:", response);

        // Adjust depending on your backend structure
        setProducts(response?.products || response?.data || []);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };

    getProducts();
  }, []);

  // ✅ Update fields when model data changes (for edit mode)
  React.useEffect(() => {
    setSelectedProduct(Modeldata?.productName || "");
    setEmployeeName(Modeldata?.employeeName || "");
    setEmployeeId(Modeldata?.employeeId || "");
    setAssignDate(Modeldata?.assignDate || "");
    setCondition(Modeldata?.condition || "");
    setStatus(Modeldata?.status || "");
    setId(Modeldata?._id || "");
    setErrors({});
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const assignmentData = {
      productName: selectedProduct,
      employeeName,
      employeeId,
      assignDate,
      condition,
      status,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createAssetM(assignmentData);
      } else {
        response = await updateAssetM(id, assignmentData);
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
          {Modeltype} Asset Assignment
        </Typography>

        {/* Product + Employee Name */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {/* ✅ Product dropdown */}
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
            {errors.productName && (
              <FormHelperText>{errors.productName}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            label="Employee Name"
            value={employeeName}
            onChange={(e) => setEmployeeName(e.target.value)}
            error={!!errors.employeeName}
            helperText={errors.employeeName}
          />
        </Box>

        {/* Employee ID + Assign Date */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Employee ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            error={!!errors.employeeId}
            helperText={errors.employeeId}
          />
          <TextField
            fullWidth
            type="date"
            label="Assign Date"
            InputLabelProps={{ shrink: true }}
            value={assignDate}
            onChange={(e) => setAssignDate(e.target.value)}
            error={!!errors.assignDate}
            helperText={errors.assignDate}
          />
        </Box>

        {/* Condition + Status */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth variant="outlined" error={!!errors.condition}>
            <InputLabel id="condition-select-label">Condition</InputLabel>
            <Select
              labelId="condition-select-label"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              label="Condition"
            >
              <MenuItem value="New">New</MenuItem>
              <MenuItem value="Good">Good</MenuItem>
              <MenuItem value="Fair">Fair</MenuItem>
              <MenuItem value="Damaged">Damaged</MenuItem>
            </Select>
            {errors.condition && <FormHelperText>{errors.condition}</FormHelperText>}
          </FormControl>

          <FormControl fullWidth variant="outlined" error={!!errors.status}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Assigned">Assigned</MenuItem>
              <MenuItem value="Returned">Returned</MenuItem>
              <MenuItem value="Lost">Lost</MenuItem>
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
