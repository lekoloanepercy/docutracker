import { api, handleApiError } from "./api";

export async function getAdminDashboard() {
  try {
    const res = await api.get("/dashboard/admin");
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to fetch dashboard");
  }
}

export async function getPersonellDashboard() {
  try {
    const res = await api.get("/dashboard/personell");
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to fetch dashboard");
  }
}
