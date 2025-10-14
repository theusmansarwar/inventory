import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
  Checkbox,
  Button,
  IconButton,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import {  fetchallAssetLocationlist, fetchallAssetMlist, fetchallcategorylist, fetchallDeadProductlist, fetchallLicenseMlist, fetchallMaintenancelist, fetchallProductlist, fetchallroleslist, fetchallStocklist, fetchallSupplierlist, fetchalluserlist } from "../../DAL/fetch";
import { formatDate } from "../../Utils/Formatedate";
import truncateText from "../../truncateText";
import { useNavigate } from "react-router-dom";
import { deleteAllAssetLocation, deleteAllAssetM, deleteAllCategories, deleteAllDeadProduct, deleteAllDeadProducts, deleteAllLicenseM, deleteAllMaintenance, deleteAllProduct, deleteAllRoles, deleteAllStock, deleteAllSuppliers, deleteAllUsers } from "../../DAL/delete";
import { useAlert } from "../Alert/AlertContext";
import DeleteModal from "./confirmDeleteModel";
import AddUsers from "./addUsers";
import AddSupplier from "./addSupplier";
import AddProduct from "./addProduct";
import AddStockM from "./addStockM";
import AddAsset from "./AddAssetM";
import AddLicense from "./AddLicense";
import AddMaintenance from "./AddMaintenance";
import AddRoles from "./AddRoles";
import AddDeadProduct from "./AddDeadProduct";
import AddAssetLocation from "./AddAssetLocation";





export function useTable({ attributes,pageData, tableType, limitPerPage = 10 }) {
  const { showAlert } = useAlert(); // Since you created a custom hook
  const savedState =
    JSON.parse(localStorage.getItem(`${tableType}-tableState`)) || {};
  const [page, setPage] = useState(savedState.page || 1);
  const [rowsPerPage, setRowsPerPage] = useState(
    savedState.rowsPerPage || limitPerPage
  );
  const [searchQuery, setSearchQuery] = useState(savedState.searchQuery || "");
  const [selected, setSelected] = useState([]);

  const [data, setData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const navigate = useNavigate();
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openRolesModal, setOpenRolesModal] = useState(false);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [openSupplierModal, setOpenSuppplierModal] = useState(false);
    const [openProductModal, setOpenProductModal] = useState(false);
    const [openStockModal, setOpenStockModal] = useState(false);
    const [openAssetModal, setOpenAssetModal] = useState(false);
    const [openLicenseModal, setOpenLicenseModal] = useState(false);
    const [openMaintenanceModal, setOpenMaintenanceModal] = useState(false);
  const [modeltype, setModeltype] = useState("Add");
  const [modelData, setModelData] = useState({});
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
   const [openDeadProductModal, setOpenDeadProductModal] = useState(false);
   const [openAssetLocationModal, setOpenAssetLocationModal] = useState(false);
  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage]);
  useEffect(() => {
    localStorage.setItem(
      `${tableType}-tableState`,
      JSON.stringify({ page, rowsPerPage, searchQuery })
    );
  }, [page, rowsPerPage, searchQuery, tableType]);

  const fetchData = async () => {
    let response;
    // if (tableType === "Categories") {
    //   response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

    //   if (response.status == 400) {
    //     localStorage.removeItem("Token");
    //     navigate("/login");
    //   } else {
    //     setData(response.categories);
    //     setTotalRecords(response.categories.length);
    //   }
    // } else if (tableType === "CategoriesNames") {
    //   response = await fetchallcategorylist(page, rowsPerPage, searchQuery);

    //   if (response.status == 400) {
    //     localStorage.removeItem("Token");
    //     navigate("/login");
    //   } else {
    //     setData(response.categories);
    //     setTotalRecords(response.categories.length);
    //   }
    // }
     if(tableType === "Roles"){
      // setData(pageData);
        response = await fetchallroleslist(page, rowsPerPage, searchQuery);

      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.data);
        setTotalRecords(response.totalRoles);
      }
    }

    else if(tableType === "Users"){
     // setData(pageData);
           response = await fetchalluserlist(page, rowsPerPage, searchQuery);

      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.users);
        setTotalRecords(response.totalUsers);
      }
    }

    else if(tableType === "Suppliers"){
      // setData(pageData);
           response = await fetchallSupplierlist(page, rowsPerPage, searchQuery);

      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.suppliers);
        setTotalRecords(response.totalSuppliers);
      }
    }
    

    else if(tableType === "Products"){
      // setData(pageData);
         response = await fetchallProductlist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.products);
        setTotalRecords(response.totalProducts);
      }
    }

    else if(tableType === "StockM"){
    // setData(pageData);
      response = await fetchallStocklist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.data);
        setTotalRecords(response.totalRecords);
      }
    }

     else if(tableType === "AssetM"){
    // setData(pageData);
      response = await fetchallAssetMlist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.data);
        setTotalRecords(response.totalPages);
      }
    }
     else if(tableType === "LicenseM"){
    // setData(pageData);
      response = await fetchallLicenseMlist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.data);
        setTotalRecords(response.totalRecords);
      }
    }
      else if(tableType === "Maintenance"){
    // setData(pageData);
      response = await fetchallMaintenancelist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.data);
        setTotalRecords(response.totalRecords);
      }
    }
      else if(tableType === "DeadProduct"){
    // setData(pageData);
      response = await fetchallDeadProductlist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.deadProducts);
        setTotalRecords(response.totalPages);
      }
    }
    else if(tableType === "AssetLocation"){
    // setData(pageData);
      response = await fetchallAssetLocationlist(page, rowsPerPage, searchQuery);
      if (response.status == 400) {
        localStorage.removeItem("Token");
        navigate("/login");
      } else {
        setData(response.assets);
        setTotalRecords(response.totalPages);
      }
    }
   
  };

  const handleSelectAllClick = (event) => {
    setSelected(event.target.checked ? data.map((row) => row._id) : []);
  };

  const isSelected = (id) => selected.includes(id);

  const handleChangePage = (_, newPage) => {
    setPage(newPage + 1); // ✅ Adjust for API's 1-based pagination
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleviewClick = (category) => {
     if (tableType === "Roles") {
      setOpenRolesModal(true);
       setModelData(category);
      setModeltype("Update");
    }
      else if (tableType === "Users") {
      setOpenUserModal(true);
       setModelData(category);
      setModeltype("Update");
    }
     else if (tableType === "Suppliers") {
      setOpenSuppplierModal(true);
      setModelData(category);
      setModeltype("Update");
    }

    
      else if (tableType === "Products") {
      setOpenProductModal(true);
       setModelData(category);
      setModeltype("Update");
    }

    else if(tableType === "StockM"){
      setOpenStockModal(true);
     setModelData(category);
      setModeltype("Update");
    }

     else if(tableType === "AssetM"){
      setOpenAssetModal(true);
      setModelData(category);
      setModeltype("Update");
    }

     else if(tableType === "LicenseM"){
      setOpenLicenseModal(true);
      setModelData(category);
      setModeltype("Update");
    }

    else if(tableType === "Maintenance"){
      setOpenMaintenanceModal(true);
      setModelData(category);
      setModeltype("Update");
    }
      else if (tableType === "DeadProduct") {
      setOpenDeadProductModal(true);
       setModelData(category);
      setModeltype("Update");
    }
      else if (tableType === "AssetLocation") {
      setOpenAssetLocationModal(true);
       setModelData(category);
      setModeltype("Update");
    }

  
  };
const handleSearch = () => {
    fetchData();
  };

  const handleDelete = async () => {
    if (selected.length === 0) {
      showAlert("warning", "No items selected for deletion");
      return;
    }

    console.log("Attempting to delete IDs:", selected);

    try {
      let response;
      if (tableType === "Categories") {
        response = await deleteAllCategories({ ids: selected });
      }
        if (tableType === "Roles") {
        response = await deleteAllRoles({ ids: selected });
      }
       else if (tableType === "Users") {
        response = await deleteAllUsers({ ids: selected });
      }
        else if (tableType === "Suppliers") {
        response = await deleteAllSuppliers({ ids: selected });
      }
       else if (tableType === "Products") {
        response = await deleteAllProduct({ ids: selected });
      }
       else if (tableType === "StockM") {
        response = await deleteAllStock({ ids: selected });
      }
       else if (tableType === "AssetM") {
        response = await deleteAllAssetM({ ids: selected });
      }
      else if (tableType === "LicenseM") {
        response = await deleteAllLicenseM({ ids: selected });
      }
       else if (tableType === "Maintenance") {
        response = await deleteAllMaintenance({ ids: selected });
      }
       else if (tableType === "DeadProduct") {
        response = await deleteAllDeadProduct({ ids: selected });
      }
       else if (tableType === "AssetLocation") {
        response = await deleteAllAssetLocation({ ids: selected });
      }
      if (response.status === 200) {
        showAlert("success", response.message || "Deleted successfully");
        fetchData();
        setSelected([]);
      } else {
        showAlert("error", response.message || "Failed to delete items");
      }
    } catch (error) {
      console.error("Error in delete request:", error);
      showAlert("error", "Something went wrong. Try again later.");
    }
  };

  const handleAddButton = () => {
    if (tableType === "Roles") {
      setOpenRolesModal(true);
      setModeltype("Add");
      setModelData();
    }
    else if (tableType === "Users") {
      setOpenUserModal(true);
      setModeltype("Add");
      setModelData();
    }

      else if (tableType === "Suppliers") {
      setOpenSuppplierModal(true);
      setModeltype("Add");
      setModelData();
    }

    
      else if (tableType === "Products") {
      setOpenProductModal(true);
      setModeltype("Add");
      setModelData();
    }

    else if(tableType === "StockM"){
      setOpenStockModal(true);
      setModeltype("Add");
      setModelData();
    }
     else if(tableType === "AssetM"){
      setOpenAssetModal(true);
      setModeltype("Add");
      setModelData();
    }

     else if(tableType === "LicenseM"){
      setOpenLicenseModal(true);
      setModeltype("Add");
      setModelData();
    }

    else if(tableType === "Maintenance"){
      setOpenMaintenanceModal(true);
      setModeltype("Add");
      setModelData();
    }
     else if(tableType === "DeadProduct"){
      setOpenDeadProductModal(true);
      setModeltype("Add");
      setModelData();
    }
     else if(tableType === "AssetLocation"){
      setOpenAssetLocationModal(true);
      setModeltype("Add");
      setModelData();
    }
  };

  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce(
        (acc, key) => (acc && acc[key] !== undefined ? acc[key] : "N/A"),
        obj
      );
  };

  const handleResponse = (response) => {
    showAlert(response.messageType, response.message);
    fetchData();
  };
  const handleDeleteClick = () => {
    setOpenDeleteModal(true);
  };

  return {
    tableUI: (
      <>
      <AddRoles
          open={openRolesModal}
          setOpen={setOpenRolesModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
          <AddUsers
          open={openUserModal}
          setOpen={setOpenUserModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
         <AddSupplier
          open={openSupplierModal}
          setOpen={setOpenSuppplierModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
         <AddProduct
          open={openProductModal}
          setOpen={setOpenProductModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
         <AddStockM
          open={openStockModal}
          setOpen={setOpenStockModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
          <AddAsset
          open={openAssetModal}
          setOpen={setOpenAssetModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
         <AddLicense
          open={openLicenseModal}
          setOpen={setOpenLicenseModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
          <AddMaintenance
          open={openMaintenanceModal}
          setOpen={setOpenMaintenanceModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />

          <AddDeadProduct
          open={openDeadProductModal}
          setOpen={setOpenDeadProductModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />

        <AddAssetLocation
          open={openAssetLocationModal}
          setOpen={setOpenAssetLocationModal}
          Modeltype={modeltype}
          Modeldata={modelData}
          onResponse={handleResponse}
        />
        <DeleteModal
          open={openDeleteModal}
          setOpen={setOpenDeleteModal}
          onConfirm={handleDelete}
        />

        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", maxHeight: "95vh", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h5" sx={{ color: "var(--primary-color)" }}>
                {tableType} List
              </Typography>
 
                  <TextField
                    size="small"
                    placeholder="Search..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    sx={{
                      minWidth: 200,
                      backgroundColor: "white",
                      borderRadius: 1,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "var(--background-color)",
                        },
                        "&:hover fieldset": {
                          borderColor: "var(--background-color)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "var(--background-color)",
                        },
                      },
                    }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon
                            onClick={handleSearch}
                            sx={{
                              cursor: "pointer",
                              color: "var(--background-color)",
                            }}
                          />
                        </InputAdornment>
                      ),
                    }}
                  />
                
              {selected.length > 0 ? (
                <IconButton onClick={handleDeleteClick} sx={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              ) : (
                tableType !== "CategoriesNames" && (
                  <Button
                    sx={{
                      background: "var(--horizontal-gradient)",
                      color: "var(--white-color)",
                      borderRadius: "var(--border-radius-secondary)",
                      "&:hover": { background: "var(--vertical-gradient)" },
                    }}
                    onClick={handleAddButton}
                  >
                    Add {tableType}
                  </Button>
                )
              )}
            </Toolbar>
            <TableContainer>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        sx={{ color: "var(--primary-color)" }}
                        indeterminate={
                          selected.length > 0 && selected.length < data.length
                        }
                        checked={
                          data.length > 0 && selected.length === data.length
                        }
                        onChange={handleSelectAllClick}
                      />
                    </TableCell>
                    {attributes.map((attr) => (
                      <TableCell
                        key={attr._id}
                        sx={{ color: "var(--secondary-color)" }}
                      >
                        {attr.label}
                      </TableCell>
                    ))}
                    <TableCell sx={{ color: "var(--secondary-color)" }}>
                      Action
                    </TableCell>
                  </TableRow>
                </TableHead>
<TableBody>
  {data.map((row) => {
    const isItemSelected = isSelected(row._id);
    return (
      <TableRow key={row._id} selected={isItemSelected}>
        {/* Checkbox column */}
        <TableCell padding="checkbox">
          <Checkbox
            sx={{ color: "var(--primary-color)" }}
            checked={isItemSelected}
            onChange={() => {
              setSelected((prev) =>
                isItemSelected
                  ? prev.filter((id) => id !== row._id)
                  : [...prev, row._id]
              );
            }}
          />
        </TableCell>

        {/* Dynamic columns */}
        {attributes.map((attr) => (
          <TableCell
            key={attr.id}
            sx={{ color: "var(--black-color)", minWidth: "110px" }}
          >
            {attr.id === "createdAt" || attr.id === "publishedDate"  || attr.id === "assignDate"  || attr.id === "resolvedDate"   || attr.id === "reportedDate"  || attr.id === "expiryDate"  || attr.id === "currentDate"  || attr.id === "warrantyDate"?  (
              formatDate(row[attr.id])
            ) : attr.id === "published" ? (
              <span
                style={{
                  color: row[attr.id]
                    ? "var(--success-color)"
                    : "var(--warning-color)",
                  background: row[attr.id]
                    ? "var(--success-bgcolor)"
                    : "var(--warning-bgcolor)",
                  padding: "5px 10px",
                  borderRadius: "var(--border-radius-secondary)",
                }}
              >
                {row[attr.id] ? "Public" : "Private"}
              </span>
            ) : attr.id === "status" ? (
              (() => {
  let bgColor = "#ffffff"; // default background
  let textColor = "#000000"; // default text

  // normalize the value
  let value = row[attr.id];
  if (value === true) value = "Active";
  if (value === false) value = "Inactive";

  switch (value) {
    case "Pending":
    case "Assigned":
      bgColor = "#cce5ff"; // light blue
      textColor = "#004085"; // dark blue
      break;
    case "In Progress":
    case "Delay":
      bgColor = "#fff3cd"; // light yellow
      textColor = "#856404"; // dark yellow
      break;
    case "Returned":
    case "Resolved":
    case "Active":   // covers both string "Active" and true→Active
      bgColor = "#d4edda"; // light green
      textColor = "#155724"; // dark green
      break;
    case "Damaged":
    case "Expired":
    case "Inactive": // covers both string "Inactive" and false→Inactive
      bgColor = "#f8d7da"; // light red
      textColor = "#721c24"; // dark red
      break;
    default:
      bgColor = "#e2e3e5"; // fallback light grey
      textColor = "#383d41"; // fallback dark grey
  }

  return (
    <span
      style={{
        color: textColor,
        background: bgColor,
        padding: "5px 10px",
        borderRadius: "var(--border-radius-secondary)",
        fontWeight: "bold",
      }}
    >
      {value}
    </span>
  );
})()

            ) : row[attr.id] === 0 ? (
              0
            ) : typeof getNestedValue(row, attr.id) === "string" ? (
              truncateText(getNestedValue(row, attr.id), 30)
            ) : (
              getNestedValue(row, attr.id)
            )}
          </TableCell>
        ))}

        {/* View button column */}
        <TableCell>
          <span
            onClick={() => handleviewClick(row)}
            style={{
              color: "var(--primary-color)",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            view
          </span>
        </TableCell>
      </TableRow>
    );
  })}
</TableBody>


              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalRecords} // ✅ Correct count from API
              rowsPerPage={rowsPerPage}
              page={page - 1} // ✅ Convert to 0-based index for Material-UI
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </>
    ),
  };
}
