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
import { createMaintenance } from "../../DAL/create";
import { updateMaintenance } from "../../DAL/edit";
import { fetchallProductlist } from "../../DAL/fetch";

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

export default function AddMaintenance({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse, // callback from parent to refresh data
}) {
  const [assetName, setAssetName] = useState("");
  const [issue, setIssue] = useState("");
  const [reportedDate, setReportedDate] = useState("");
  const [resolvedDate, setResolvedDate] = useState("");
  const [expense, setExpense] = useState("");
  const [status, setStatus] = useState("Pending");
  const [id, setId] = useState("");
  const [errors, setErrors] = useState({});
  const [productList, setProductList] = useState([]);

  // 🔁 Reset modal each time it's opened
  useEffect(() => {
    if (Modeltype === "Edit" && Modeldata) {
      setAssetName(Modeldata?.assetName || "");
      setIssue(Modeldata?.issue || "");
      setReportedDate(
        Modeldata?.reportedDate ? Modeldata.reportedDate.split("T")[0] : ""
      );
      setResolvedDate(
        Modeldata?.resolvedDate ? Modeldata.resolvedDate.split("T")[0] : ""
      );
      setExpense(Modeldata?.expense || "");
      setStatus(Modeldata?.status || "Pending");
      setId(Modeldata?._id || "");
    } else {
      clearForm();
    }
  }, [Modeldata, Modeltype, open]);

  // ✅ Fetch products for dropdown
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

  // ✅ Clears form data
  const clearForm = () => {
    setAssetName("");
    setIssue("");
    setReportedDate("");
    setResolvedDate("");
    setExpense("");
    setStatus("Pending");
    setErrors({});
  };

  const handleClose = () => {
    clearForm();
    setOpen(false);
  };

  // ✅ Validation + Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!assetName) newErrors.assetName = "Product is required";
    if (!issue) newErrors.issue = "Issue is required";
    else if (!/^[A-Za-z\s]+$/.test(issue))
      newErrors.issue = "Issue should contain only letters";
    if (!reportedDate) newErrors.reportedDate = "Reported date is required";
    if (status === "Resolved" && !resolvedDate)
      newErrors.resolvedDate = "Resolved date is required";
    if (!expense) newErrors.expense = "Expense is required";
    else if (parseFloat(expense) < 0)
      newErrors.expense = "Expense cannot be negative";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const maintenanceData = {
      assetName,
      issue,
      reportedDate,
      resolvedDate,
      expense,
      status,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createMaintenance(maintenanceData);
      } else {
        response = await updateMaintenance(id, maintenanceData);
      }

      if (response?.status === 200 || response?.status === 201) {
        onResponse({
          messageType: "success",
          message: response?.message || "Maintenance record saved!",
        });

        // ✅ Reset form and close modal
        clearForm();
        setOpen(false);

      
      } else if (response?.status === 400 && response?.missingFields) {
        const fieldErrors = {};
        response.missingFields.forEach((f) => {
          fieldErrors[f.name] = f.message;
        });
        setErrors(fieldErrors);
      } else {
        onResponse({
          messageType: "error",
          message: response?.message || "Something went wrong",
        });
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
          {Modeltype} Maintenance
        </Typography>

        {/* ✅ Product & Issue */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth error={!!errors.assetName}>
            <InputLabel id="product-label">Select Product</InputLabel>
            <Select
              labelId="product-label"
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              label="Select Product"
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
            {errors.assetName && (
              <FormHelperText>{errors.assetName}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            required
            label="Issue"
            value={issue}
            onChange={(e) => setIssue(e.target.value)}
            error={!!errors.issue}
            helperText={errors.issue}
          />
        </Box>

        {/* ✅ Dates */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            required
            label="Reported Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={reportedDate}
            onChange={(e) => setReportedDate(e.target.value)}
            error={!!errors.reportedDate}
            helperText={errors.reportedDate}
          />

          <TextField
            fullWidth
            label="Resolved Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={resolvedDate}
            onChange={(e) => setResolvedDate(e.target.value)}
            error={!!errors.resolvedDate}
            helperText={errors.resolvedDate}
          />
        </Box>

        {/* ✅ Expense + Status */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            required
            type="number"
            label="Expense"
            value={expense}
            onChange={(e) => setExpense(e.target.value)}
            error={!!errors.expense}
            helperText={errors.expense}
          />

          <FormControl fullWidth error={!!errors.status}>
            <InputLabel id="status-label">Status</InputLabel>
            <Select
              labelId="status-label"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
            {errors.status && (
              <FormHelperText>{errors.status}</FormHelperText>
            )}
          </FormControl>
        </Box>

        {/* ✅ Buttons */}
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}
        >
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
