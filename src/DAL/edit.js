import { invokeApi } from "../Utils/InvokeApi";


export const updateCategory = async (id,data) => {
 
  const reqObj = {
    path: ``,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateRole = async (id,data) => {
 
  const reqObj = {
    path: `/roles/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateUser = async (id,data) => {
 
  const reqObj = {
    path: `/user/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateSupplier = async (id,data) => {
 
  const reqObj = {
    path: `/supplier/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateProduct = async (id,data) => {
 
  const reqObj = {
    path: `/product/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateStock = async (id,data) => {
 
  const reqObj = {
    path: `/stock/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateAssetM = async (id,data) => {
 
  const reqObj = {
    path: `/asset/update/${id}`,
    method: "PUT",
    headers: {      Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateLicenseM = async (id,data) => {
 
  const reqObj = {
    path: `/license/update/${id}`,
    method: "PUT",
    headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateMaintenance = async (id,data) => {
 
  const reqObj = {
    path: `/maintenance/update/${id}`,
    method: "PUT",
    headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};

export const updateDeadProduct = async (id,data) => {
 
  const reqObj = {
    path: `/dead/update/${id}`,
    method: "PUT",
    headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};
export const updateAssetLocation= async (id,data) => {
 
  const reqObj = {
    path: `/assetLocation/update/${id}`,
    method: "PUT",
    headers: {Authorization: `Bearer ${localStorage.getItem("Token")}`,},
    postData: data,
  };
  return invokeApi(reqObj);
};


