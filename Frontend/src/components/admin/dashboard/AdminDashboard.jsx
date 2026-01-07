import React from "react";
import DashboardStats from "./DashboardStats";

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-5">
      {/* Page Heading */}
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to Admin Dashboard!
      </h1>

      {/* Subtitle */}
      <p className="text-gray-600 text-lg">
        Here you can manage all loans, users, and track overall system statistics.
      </p>

      {/* Stats Section */}
      <DashboardStats />

      {/* Quick Info / Announcements */}
      <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
        <h2 className="text-xl font-semibold text-blue-800">
          Quick Overview
        </h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Total loan applications submitted</li>
          <li>Pending approvals</li>
          <li>Approved loans and QR codes generated</li>
          <li>Registered users and their activity</li>
        </ul>
      </div>

      {/* Optional Tip */}
      <div className="text-gray-500 italic text-sm">
        Tip: Click on any menu item from the sidebar to manage details efficiently.
      </div>
    </div>
  );
};

export default AdminDashboard;
