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
import { fetchallProductlist } from "../../DAL/fetch";

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
  const [products, setProducts] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState("");

  const [employeeName, setEmployeeName] = React.useState("");
  const [employeeId, setEmployeeId] = React.useState("");
  const [assignDate, setAssignDate] = React.useState("");
  const [condition, setCondition] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [id, setId] = React.useState("");
  const [errors, setErrors] = React.useState({});

  // ✅ Fetch product list for dropdown
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetchallProductlist(1, 1000, "");
        setProducts(response?.products || response?.data || []);
      } catch (error) {
        console.error("❌ Error fetching products:", error);
      }
    };
    getProducts();
  }, []);

  // ✅ Load edit data
  React.useEffect(() => {
    if (Modeldata) {
      setSelectedProduct(Modeldata?.productName || "");
      setEmployeeName(Modeldata?.employeeName || "");
      setEmployeeId(Modeldata?.employeeId || "");
      setAssignDate(Modeldata?.assignDate?.split("T")[0] || "");
      setCondition(Modeldata?.condition || "");
      setStatus(Modeldata?.status || "");
      setId(Modeldata?._id || "");
      setErrors({});
    } else {
      // Reset if adding new
      setSelectedProduct("");
      setEmployeeName("");
      setEmployeeId("");
      setAssignDate("");
      setCondition("");
      setStatus("");
      setErrors({});
    }
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  // ✅ Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!employeeName.trim()) {
      newErrors.employeeName = "Employee name is required.";
    } else if (!/^[A-Za-z\s]+$/.test(employeeName)) {
      newErrors.employeeName = "Only letters and spaces are allowed.";
    }

    if (!employeeId.trim()) {
      newErrors.employeeId = "Employee ID is required.";
    } else if (isNaN(employeeId)) {
      newErrors.employeeId = "Employee ID must be a number.";
    } else if (Number(employeeId) < 0) {
      newErrors.employeeId = "Employee ID cannot be negative.";
    }

    if (!assignDate) newErrors.assignDate = "Assign date is required.";
    if (!selectedProduct) newErrors.productName = "Product selection is required.";
    if (!condition) newErrors.condition = "Condition is required.";
    if (!status) newErrors.status = "Status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

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

      if (response?.status === 201 || response?.status === 200 || response?.success) {
        onResponse({ messageType: "success", message: response.message || "Saved successfully" });

        // ✅ Reset fields
        setEmployeeName("");
        setEmployeeId("");
        setAssignDate("");
        setCondition("");
        setStatus("");
        setSelectedProduct("");
        setErrors({});
        setOpen(false);

        // ✅ Refresh the page (or you can call parent fetch)
    
      } else if (response?.missingFields) {
        const fieldErrors = {};
        response.missingFields.forEach((f) => (fieldErrors[f.name] = f.message));
        setErrors(fieldErrors);
      } else {
        onResponse({
          messageType: "error",
          message: response?.message || "Something went wrong, please check your input.",
        });
      }
    } catch (err) {
      console.error("❌ Error:", err);
      onResponse({
        messageType: "error",
        message: err.response?.data?.message || "Server error. Please try again.",
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
            {errors.productName && <FormHelperText>{errors.productName}</FormHelperText>}
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
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            error={!!errors.employeeId}
            helperText={errors.employeeId}
            inputProps={{ min: 0 }}
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
          <FormControl fullWidth error={!!errors.condition}>
            <InputLabel>Condition</InputLabel>
            <Select
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

          <FormControl fullWidth error={!!errors.status}>
            <InputLabel>Status</InputLabel>
            <Select
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
            sx={{ backgroundColor: "#B1B1B1", textTransform: "none" }}
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
