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
import { createMaintenance } from "../../DAL/create";
import { updateMaintenance } from "../../DAL/edit";



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
  onResponse,
}) {
  const [assetName, setassetName] = React.useState(Modeldata?.assetName || "");
  const [issue, setIssue] = React.useState(Modeldata?.issue || "");
  const [reportedDate, setReportedDate] = React.useState(Modeldata?.reportedDate || "");
  const [resolvedDate, setResolvedDate] = React.useState(Modeldata?.resolvedDate || "");
  const [expense, setExpense] = React.useState(Modeldata?.expense || "");
  const [status, setStatus] = React.useState(Modeldata?.status || "Pending");
  const [id, setId] = React.useState(Modeldata?._id || "");
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    setassetName(Modeldata?.assetName || "");
    setIssue(Modeldata?.issue || "");
    setReportedDate(Modeldata?.reportedDate || "");
    setResolvedDate(Modeldata?.resolvedDate || "");
    setExpense(Modeldata?.expense || "");
    setStatus(Modeldata?.status || "Pending");
    setId(Modeldata?._id || "");
    setErrors({});
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          {Modeltype} Maintenance
        </Typography>

        {/* Product Name + Issue */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth error={!!errors.assetName}>
            <InputLabel id="product-label">Select Product</InputLabel>
            <Select
              labelId="product-label"
              value={assetName}
              onChange={(e) => setassetName(e.target.value)}
              label="Select Product"
            >
              <MenuItem value="Laptop">Laptop</MenuItem>
              <MenuItem value="Printer">Printer</MenuItem>
              <MenuItem value="Router">Router</MenuItem>
              <MenuItem value="Monitor">Monitor</MenuItem>
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

        {/* Reported + Resolved Date */}
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

        {/* Expense + Status */}
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
