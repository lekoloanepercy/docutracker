import { api, handleApiError } from "./api";

export async function getUserMetrics() {
  try {
    const res = await api.get("/metric");
    return res;
  } catch (error) {
    return handleApiError(error, "Failed to fetch system metrics");
  }
}
