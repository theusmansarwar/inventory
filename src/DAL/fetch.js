import { invokeApi } from "../Utils/InvokeApi";

export const fetchcategorylist = async () => {
  const reqObj = {
    path: "/category/live",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchDashboard = async () => {
  const reqObj = {
    path: "/admin/stats",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchDashboardChart = async () => {
  const reqObj = {
    path: "/views/get/count",
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};  

export const fetchallroleslist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/roles/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallActiveroleslist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/roles/activeList?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};
export const fetchalluserlist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/user/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallSupplierlist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/supplier/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallProductlist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/product/list?limit=${rowsPerPages}&page=${page}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};
export const fetchallStocklist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/stock/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};
export const fetchallAssetMlist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/asset/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallLicenseMlist = async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/license/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallMaintenancelist= async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/maintenance/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallDeadProductlist= async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/dead/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};

export const fetchallAssetLocationlist= async (page, rowsPerPages,searchQuery) => {
  const reqObj = {
    path: `/assetLocation/list?limit=${rowsPerPages}&page=${page}&keyword=${searchQuery}`,
    method: "GET",
    headers: {
       Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },

    postData: {},
  };
  return invokeApi(reqObj);
};
