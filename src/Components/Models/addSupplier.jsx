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
import { createSupplier } from "../../DAL/create";
import { updateSupplier } from "../../DAL/edit";

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

export default function AddSupplier({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [name, setName] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [id, setId] = React.useState("");
  const [errors, setErrors] = React.useState({});

  // ✅ Handle Modeldata (prefill on view/edit)
  React.useEffect(() => {
    if (Modeldata) {
      setName(Modeldata?.name || "");
      setContact(Modeldata?.contact || "");
      setEmail(Modeldata?.email || "");
      setAddress(Modeldata?.address || "");

      // ✅ Convert boolean → string so Select can match
      setStatus(
        Modeldata?.status === true
          ? "true"
          : Modeldata?.status === false
          ? "false"
          : Modeldata?.status || ""
      );

      setId(Modeldata?._id || "");
    } else {
      // ✅ Reset all fields when adding a new supplier
      setName("");
      setContact("");
      setEmail("");
      setAddress("");
      setStatus("");
      setId("");
    }
  }, [Modeldata]);

  const handleClose = () => setOpen(false);

  // ✅ Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const supplierData = {
      name,
      contact,
      email,
      address,
      // Convert string → boolean before sending
      status: status === "true",
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createSupplier(supplierData);
      } else {
        response = await updateSupplier(id, supplierData);
      }

      if (response?.status === 201 || response?.status === 200) {
        onResponse({ messageType: "success", message: response.message });
        setErrors({});
        setOpen(false);

        // ✅ Clear form fields after successful add/update
        setName("");
        setContact("");
        setEmail("");
        setAddress("");
        setStatus("");
        setId("");
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
          {Modeltype} Supplier
        </Typography>

        {/* Name + Contact */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Contact"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            error={!!errors.contact}
            helperText={errors.contact}
          />
        </Box>

        {/* Email + Address */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            error={!!errors.address}
            helperText={errors.address}
          />
        </Box>

        {/* Status Dropdown */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <FormControl fullWidth variant="outlined" error={!!errors.status}>
            <InputLabel id="status-select-label">Status</InputLabel>
            <Select
              labelId="status-select-label"
              id="status-select"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Status"
            >
              <MenuItem value="true">Active</MenuItem>
              <MenuItem value="false">Inactive</MenuItem>
            </Select>
            {errors.status && (
              <FormHelperText>{errors.status}</FormHelperText>
            )}
          </FormControl>
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
