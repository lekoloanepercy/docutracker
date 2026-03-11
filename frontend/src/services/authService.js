import api from "./api";

//handle api errors
function handleApiError(error, fallbackMessage) {
  if (error.response) {
    return {
      success: false,
      message: error.response.data?.message || fallbackMessage,
      status: error.response.status,
      data: null,
    };
  }

  if (error.request) {
    return {
      success: false,
      message: "No response from server. Please check your connection.",
      status: null,
      data: null,
    };
  }

  return {
    success: false,
    message: error.message || fallbackMessage,
    status: null,
    data: null,
  };
}

//login user
export async function loginUser(credentials) {
  try {
    const res = await api.post("/auth/login", credentials);

    return {
      success: true,
      message: res.data?.message || "Login successful",
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return handleApiError(error, "Failed to login");
  }
}

export async function addUser(userData) {
  try {
    const res = await api.post("/user", userData);

    return {
      success: true,
      message: res.data?.message || "User added successfully",
      data: res.data,
      status: res.status,
    };
  } catch (error) {
    return handleApiError(error, "Failed to add user");
  }
}