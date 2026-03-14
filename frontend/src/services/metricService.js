import { api, handleApiError } from "./api";

export async function getSystemMetrics() {
  try {
    const res = await api.get("/");
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to fetch system metrics");
  } 
}


