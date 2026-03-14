const dotenv = require("dotenv");
dotenv.config();
const dashboard = require("../models/Dashboard");

//personell dashboard
exports.getPersonellDashboard = async (req, res) => {
  try {
    const { persal_number: persal, role } = req.user;

    if (!role || !persal) {
      return res.status(400).json({
        success: false,
        message: "Role and Persal number are required",
      });
    }

    if (role === "MANAGER" || role == "RUNNER") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Worker Stats
    const workerStats = await dashboard.getWorkerStats(persal);
    const workerReports = await dashboard.getWorkerReportCount(persal);

    workerStats.avgCompletionTime = workerStats.avgCompletionTime
      ? `${Math.floor(workerStats.avgCompletionTime / 60)}m ${(
          workerStats.avgCompletionTime % 60
        ).toFixed(3)}s`
      : "N/A";

    workerStats.totalReports = workerReports.totalReports;
    workerStats.efficiencyScore =
      workerStats.totalTasks > 0
        ? Math.round(
            (workerStats.completedTasks / workerStats.totalTasks) * 100,
          )
        : 0;

    res.status(200).json({
      success: true,
      personellDashboard: workerStats,
      message: "Successfully fetched personell dashboard",
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

//admin dashboard

exports.getAdminDashboard = async (req, res) => {
  try {
    const { persal_number: persal, role } = req.user;

    if (!role || !persal) {
      return res
        .status(400)
        .json({ statsuccess: false, message: "Role and persal are required" });
    }

    if (role !== "MANAGER" && role !== "RUNNER") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized access" });
    }

    // Admin Stats
    const managerStats = await dashboard.getManagerStats();
    const activeMembers = await dashboard.getActiveMembers();
    const reportSummary = await dashboard.getReportsSummary();

    managerStats.activeMembers = activeMembers.activeMembers;
    managerStats.reportsSummary = reportSummary;

    managerStats.avgCompletionTime = managerStats.avgCompletionTime
      ? `${Math.floor(managerStats.avgCompletionTime / 60)}m ${
         ( managerStats.avgCompletionTime % 60).toFixed(3)
        }s`
      : "N/A";

    res.status(200).json({
      success: true,
      message: "Successfully fetched admin dashboard",
      adminDashboard: managerStats,
    });
  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
