



import React, { useState, useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  useNavigate,
  Navigate,
} from "react-router-dom";
import "./App.css";
import { AiFillProduct } from "react-icons/ai";
import { IoMdContacts } from "react-icons/io";
import {
  MdReviews,
  MdSpaceDashboard,
  MdOutlineDoubleArrow,
} from "react-icons/md";
import { IoLogOut } from "react-icons/io5";
import "./App.css";
import zemaltlogo from "./Assets/zemalt-logo.png";
import personimg from "./Assets/person.png";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Users from "./Pages/Users/Users";
import Supplier from "./Pages/Suppliers/Supplier";
import Products from "./Pages/Product M/Products";
import StockM from "./Pages/Stock M/StockM";
import AssetM from "./Pages/Asset Assignment/AssetM";
import Maintenance from "./Pages/Maintenance/Maintenance";
import LicenseM from "./Pages/License M/LicenseM";
import Roles from "./Pages/Roles/Roles";
import DeadProduct from "./Pages/Dead Products/DeadProducts";
import AssetLocation from "./Pages/AssetLocation/AssetLocation";
import { FaTachometerAlt, FaUsers, FaBoxes, FaWarehouse, FaCogs, FaMapMarkerAlt, FaTools, FaUserShield, FaBuilding, FaRecycle } from "react-icons/fa";
import { MdInventory, MdCategory } from "react-icons/md";
import { GiCardboardBox } from "react-icons/gi";
import logo from './Assets/imslogo.png'

const App = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeitems, setActiveitems] = useState(null);
  const [isOpen, setIsOpen] = useState(true); // ✅ state for sidebar open/close

  const allItems = [ 

  { id: 1, name: "Dashboard", route: "/dashboard", icon: <FaTachometerAlt /> },
  { id: 3, name: "Users", route: "/usersData", icon: <FaUsers /> },
  { id: 4, name: "Roles", route: "/rolesData", icon: <FaUserShield /> },
  { id: 5, name: "Suppliers", route: "/supplierData", icon: <FaBuilding /> },
  { id: 6, name: "Products", route: "/productData", icon: <GiCardboardBox /> },
  { id: 7, name: "Stock Management", route: "/stockData", icon: <FaWarehouse /> },
  { id: 9, name: "Asset Assignment", route: "/AssetData", icon: <FaBoxes /> },
  { id: 10, name: "License Management", route: "/licenseData", icon: <FaCogs /> },
  { id: 11, name: "Maintenance", route: "/maintenanceData", icon: <FaTools /> },
  { id: 12, name: "Dead Products", route: "/deadProduct", icon: <FaRecycle /> },
  { id: 13, name: "Asset Location", route: "/AssetLocation", icon: <FaMapMarkerAlt /> },
  
];


  useEffect(() => {
    const currentItem = allItems.find(
      (item) => item.route === location.pathname
    );
    setActiveitems(currentItem?.id || null);
  }, [location.pathname]);

  const handleitemsClick = (item) => {
    setActiveitems(item.id);
    navigate(item.route);
  };

  // ✅ Toggle function
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="App">
      <div className={`app-side-bar ${isOpen ? "open" : "closed"}`}>
        <div className="opencloseicon" onClick={toggleMenu}>
          <MdOutlineDoubleArrow className={isOpen ? "rotated" : ""} />
        </div>

        <img src={logo} className="logo" alt="ims Logo" />

        <ul>
          {allItems.map((item) => (
            <li
              key={item.id}
              className={
                activeitems === item.id ? "selected-item" : "unselected"
              }
              onClick={() => handleitemsClick(item)}
            >
              {item.icon}
              {isOpen && <span>{item.name}</span>}
            </li>
          ))}
          <li className="unselected" onClick={onLogout}>
            <IoLogOut />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </div>

      <div className="app-right">
            <Routes>
          <Route path='/rolesData' element={<Roles/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* <Route path="/categories" element={<Categories />} /> */}
          <Route path="/usersData" element={<Users />}/>
          <Route path="/supplierData" element={<Supplier />}/>
          <Route path="/productData" element={<Products />}/>
          <Route path="/stockData" element={<StockM />}/>
          <Route path="/AssetData" element={<AssetM/>}/>
          <Route path="/licenseData" element={<LicenseM/>}/>
          <Route path="/maintenanceData" element={<Maintenance/>}/>
          <Route path="/DeadProduct" element={<DeadProduct/>}/>
          <Route path="/AssetLocation" element={<AssetLocation/>}/>
            </Routes>
      </div>
    </div>
  );
};

export default App;
