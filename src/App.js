import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { MdOutlineDoubleArrow } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import {
  FaTachometerAlt,
  FaUsers,
  FaBoxes,
  FaWarehouse,
  FaCogs,
  FaMapMarkerAlt,
  FaTools,
  FaUserShield,
  FaBuilding,
  FaRecycle,
} from "react-icons/fa";
import { GiCardboardBox } from "react-icons/gi";
import "./App.css";

import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Supplier from "./Pages/Suppliers/Supplier";
import Products from "./Pages/Product M/Products";
import StockM from "./Pages/Stock M/StockM";
import AssetM from "./Pages/Asset Assignment/AssetM";
import Maintenance from "./Pages/Maintenance/Maintenance";
import Roles from "./Pages/Roles/Roles";
import DeadProduct from "./Pages/Dead Products/DeadProducts";
import AssetLocation from "./Pages/AssetLocation/AssetLocation";
import logo from "./Assets/imslogo.png";
import { Tooltip } from "@mui/material";

const App = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);
  const [isOpen, setIsOpen] = useState(true);
  const [userModules, setUserModules] = useState([]);

  // ✅ All possible sidebar items
  const allItems = [
    { id: 1, name: "Dashboard", route: "/dashboard", icon: <FaTachometerAlt /> },
    { id: 2, name: "Roles", route: "/rolesData", icon: <FaUserShield /> },
    { id: 3, name: "Users", route: "/usersData", icon: <FaUsers /> },
    { id: 4, name: "Suppliers", route: "/supplierData", icon: <FaBuilding /> },
    { id: 5, name: "Products", route: "/productData", icon: <GiCardboardBox /> },
    { id: 6, name: "Stock Management", route: "/stockData", icon: <FaWarehouse /> },
    { id: 7, name: "Asset Assignment", route: "/AssetData", icon: <FaBoxes /> },
    // { id: 8, name: "License Management", route: "/licenseData", icon: <FaCogs /> },
    { id: 9, name: "Maintenance", route: "/maintenanceData", icon: <FaTools /> },
    { id: 10, name: "Dead Products", route: "/deadProduct", icon: <FaRecycle /> },
    { id: 11, name: "Asset Location", route: "/AssetLocation", icon: <FaMapMarkerAlt /> },
  ];

  // ✅ Load user data from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.role?.Modules) {
      setUserModules(storedUser.role.Modules);
    } else {
      navigate("/login"); // redirect to login if no user
    }
  }, [navigate]);

  // ✅ Filter allowed sidebar items
  const filteredItems = allItems.filter((item) =>
    userModules.includes(item.name)
  );

  // ✅ Redirect automatically to first allowed route if dashboard isn’t in list
 // ✅ Remove this old redirect logic
useEffect(() => {
  if (filteredItems.length > 0) {
    const onDashboard =
      location.pathname === "/" || location.pathname === "/dashboard";
    // don't automatically navigate on reload
    // if (onDashboard && !userModules.includes("Dashboard")) {
    //   navigate(filteredItems[0].route, { replace: true });
    // }
  }
}, [filteredItems, userModules, location.pathname, navigate]);


  // ✅ Update active item when route changes
  useEffect(() => {
    const currentItem = filteredItems.find(
      (item) => item.route === location.pathname
    );
    setActiveitems(currentItem?.id || null);
  }, [location.pathname, filteredItems]);

  const handleitemsClick = (item) => {
    setActiveitems(item.id);
    navigate(item.route);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };
useEffect(() => {
  localStorage.setItem("lastRoute", location.pathname);
}, [location.pathname]);
 
  const ProtectedElement = ({ element, moduleName }) => {
  if (!userModules.includes(moduleName)) {
    // only redirect if current path is invalid for user
    const firstAllowed = filteredItems[0]?.route || "/login";
    return <Navigate to={firstAllowed} replace />;
  }
  return element;
};


  return (
    <div className="App">
      {/* Sidebar */}
      <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
        <div className="opencloseicon" onClick={toggleMenu}>
          <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
        </div>

        <img src={logo} className="logo" alt="ims Logo" />

       <ul>
  {filteredItems.map((item) => {
    const listItem = (
      <li
        key={item.id}
        className={activeitems === item.id ? "selected-item" : "unselected"}
        onClick={() => handleitemsClick(item)}
      >
        {item.icon}
        {isOpen && <span>{item.name}</span>}
      </li>
    );

    // 👇 Tooltip only when sidebar is closed
    return !isOpen ? (
      <Tooltip title={item.name} placement="right" key={item.id} arrow>
        {listItem}
      </Tooltip>
    ) : (
      listItem
    );
  })}

  {/* Logout item */}
  {!isOpen ? (
    <Tooltip title="Logout" placement="right" arrow>
      <li className="unselected" onClick={onLogout}>
        <IoLogOut />
        {isOpen && <span>Logout</span>}
      </li>
    </Tooltip>
  ) : (
    <li className="unselected" onClick={onLogout}>
      <IoLogOut />
      {isOpen && <span>Logout</span>}
    </li>
  )}
</ul>

      </div>

      {/* Right Side Content / Routes */}
      <div className="app-right">
        <Routes>
          <Route
            path="/dashboard"
            element={<ProtectedElement element={<Dashboard />} moduleName="Dashboard" />}
          />
          <Route
            path="/rolesData"
            element={<ProtectedElement element={<Roles />} moduleName="Roles" />}
          />
          <Route
            path="/usersData"
            element={<ProtectedElement element={<Users />} moduleName="Users" />}
          />
          <Route
            path="/supplierData"
            element={<ProtectedElement element={<Supplier />} moduleName="Suppliers" />}
          />
          <Route
            path="/productData"
            element={<ProtectedElement element={<Products />} moduleName="Products" />}
          />
          <Route
            path="/stockData"
            element={<ProtectedElement element={<StockM />} moduleName="Stock Management" />}
          />
          <Route
            path="/AssetData"
            element={<ProtectedElement element={<AssetM />} moduleName="Asset Assignment" />}
          />
          <Route
            path="/maintenanceData"
            element={<ProtectedElement element={<Maintenance />} moduleName="Maintenance" />}
          />
          <Route
            path="/deadProduct"
            element={<ProtectedElement element={<DeadProduct />} moduleName="Dead Products" />}
          />
          <Route
            path="/AssetLocation"
            element={<ProtectedElement element={<AssetLocation />} moduleName="Asset Location" />}
          />

          {/* Default redirect */}
          <Route
            path="*"
            element={<Navigate to={filteredItems[0]?.route || "/login"} replace />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
