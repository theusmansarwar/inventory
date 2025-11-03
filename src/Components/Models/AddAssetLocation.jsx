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
import { createAssetLocation } from "../../DAL/create";
import { updateAssetLocation } from "../../DAL/edit";
import { fetchallProductlist } from "../../DAL/fetch"; // ✅ added

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

export default function AddAssetLocation({
  open,
  setOpen,
  Modeltype,
  Modeldata,
  onResponse,
}) {
  const [assetName, setAssetName] = React.useState(Modeldata?.assetName || "");
  const [branch, setBranch] = React.useState(Modeldata?.branch || "");
  const [floor, setFloor] = React.useState(Modeldata?.floor || "");
  const [room, setRoom] = React.useState(Modeldata?.room || "");
  const [assignedTo, setAssignedTo] = React.useState(Modeldata?.assignedTo || "");
  const [status, setStatus] = React.useState(Modeldata?.status || "Active");
  const [id, setId] = React.useState(Modeldata?._id || "");
  const [errors, setErrors] = React.useState({});
  const [products, setProducts] = React.useState([]); // ✅ added

  // ✅ Reset data when Modeldata changes
  React.useEffect(() => {
    setAssetName(Modeldata?.assetName || "");
    setBranch(Modeldata?.branch || "");
    setFloor(Modeldata?.floor || "");
    setRoom(Modeldata?.room || "");
    setAssignedTo(Modeldata?.assignedTo || "");
    setStatus(Modeldata?.status || "Active");
    setId(Modeldata?._id || "");
    setErrors({});
  }, [Modeldata]);

  // ✅ Fetch product list for dropdown
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const productRes = await fetchallProductlist(1, 1000, "");
        console.log("🟢 Products:", productRes);
        setProducts(productRes?.products || productRes?.data || []);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    getProducts();
  }, []);

  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const locationData = {
      assetName,
      branch,
      floor,
      room,
      assignedTo,
      status,
    };

    try {
      let response;
      if (Modeltype === "Add") {
        response = await createAssetLocation(locationData);
      } else {
        response = await updateAssetLocation(id, locationData);
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
          {Modeltype} Asset Location
        </Typography>

        {/* Row 1: Asset Name (Dropdown) + Branch */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          {/* ✅ Product Dropdown for Asset Name */}
          <FormControl fullWidth error={!!errors.assetName}>
            <InputLabel>Select Asset Name</InputLabel>
            <Select
              value={assetName}
              onChange={(e) => setAssetName(e.target.value)}
              label="Select Asset Name"
            >
              {products.map((prod) => (
                <MenuItem key={prod._id} value={prod.productName}>
                  {prod.productName}
                </MenuItem>
              ))}
            </Select>
            {errors.assetName && (
              <FormHelperText>{errors.assetName}</FormHelperText>
            )}
          </FormControl>

          <TextField
            fullWidth
            required
            label="Branch"
            variant="outlined"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            error={!!errors.branch}
            helperText={errors.branch}
          />
        </Box>

        {/* Row 2: Floor + Room */}
        <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
          <TextField
            fullWidth
            required
            label="Floor"
            variant="outlined"
            value={floor}
            onChange={(e) => setFloor(e.target.value)}
            error={!!errors.floor}
            helperText={errors.floor}
          />
          <TextField
            fullWidth
            required
            label="Room"
            variant="outlined"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            error={!!errors.room}
            helperText={errors.room}
          />
        </Box>

        {/* Row 3: Assigned To */}
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          required
          label="Assigned To"
          variant="outlined"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          error={!!errors.assignedTo}
          helperText={errors.assignedTo}
        />

        {/* Row 4: Status Dropdown */}
        <FormControl fullWidth sx={{ mt: 2 }} error={!!errors.status}>
          <InputLabel id="status-label">Status</InputLabel>
          <Select
            labelId="status-label"
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Status"
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
            <MenuItem value="Returned">Returned</MenuItem>
          </Select>
          {errors.status && <FormHelperText>{errors.status}</FormHelperText>}
        </FormControl>

        {/* Buttons */}
        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
          <Button
            type="button"
            variant="contained"
            sx={{ backgroundColor: "#B1B1B1",   textTransform: "none", }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              background: "var(--horizontal-gradient, #1976d2)",
              color: "var(--white-color, #fff)",
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
