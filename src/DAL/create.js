import { invokeApi } from "../Utils/InvokeApi";

export const createnewCategory = async (data) => {

  const reqObj = {
    path: "/",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createnewuser = async (data) => {

  const reqObj = {
    path: "/user/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};


export const createRole = async (data) => {

  const reqObj = {
    path: "/roles/add",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};


export const createUser = async (data) => {

  const reqObj = {
    path: "/user/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const createSupplier = async (data) => {

  const reqObj = {
    path: "/supplier/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const createProduct = async (data) => {

  const reqObj = {
    path: "/product/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const createStockM = async (data) => {

  const reqObj = {
    path: "/stock/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const createAssetM = async (data) => {

  const reqObj = {
    path: "/asset/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const createLicenseM = async (data) => {

  const reqObj = {
    path: "/license/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createMaintenance = async (data) => {

  const reqObj = {
    path: "/maintenance/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};

export const createDeadProduct = async (data) => {

  const reqObj = {
    path: "/dead/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};
export const createAssetLocation = async (data) => {

  const reqObj = {
    path: "/assetLocation/create",
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
    postData: data,
  };
  return invokeApi(reqObj);
};