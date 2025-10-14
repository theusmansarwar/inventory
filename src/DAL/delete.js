import { invokeApi } from "../Utils/InvokeApi";


export const deleteAllCategories = async (data) => {
  const reqObj = {
    path: ``,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};
export const deleteAllRoles = async (data) => {
  const reqObj = {
    path: `/roles/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllUsers = async (data) => {
  const reqObj = {
    path: `/user/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllSuppliers = async (data) => {
  const reqObj = {
    path: `/supplier/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllProduct = async (data) => {
  const reqObj = {
    path: `/product/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllStock = async (data) => {
  const reqObj = {
    path: `/stock/deleteMultiple`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllAssetM = async (data) => {
  const reqObj = {
    path: `/asset/multipleDelete`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllLicenseM = async (data) => {
  const reqObj = {
    path: `/License/deleteMultiple`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllMaintenance = async (data) => {
  const reqObj = {
    path: `/maintenance/deleteMultiple`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  
  return invokeApi(reqObj);
};

export const deleteAllDeadProduct= async (data) => {
  const reqObj = {
    path: `/dead/deleteMultiple`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
   
  return invokeApi(reqObj);
};

export const deleteAllAssetLocation= async (data) => {
  const reqObj = {
    path: `/assetLocation/deleteMultiple`,
    method: "DELETE", // Ensure correct capitalization
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
   
  return invokeApi(reqObj);
};