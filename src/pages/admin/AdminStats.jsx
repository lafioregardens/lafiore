import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminPages.css";

function AdminStats() {
  // Sample data for charts while backend is offline
  const revenueData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 2210 },
    { month: "Mar", revenue: 2290 },
    { month: "Apr", revenue: 2000 },
  ];

  const ordersData = [
    { day: "Mon", orders: 8 },
    { day: "Tue", orders: 10 },
    { day: "Wed", orders: 6 },
    { day: "Thu", orders: 12 },
    { day: "Fri", orders: 15 },
    { day: "Sat", orders: 18 },
    { day: "Sun", orders: 9 },
  ];

  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Analytics & Statistics</h1>

          <div className="stats-note">
            📌 <strong>Sample data displayed below</strong> - Real data will load from backend
          </div>

          <div className="stats-grid">
            <div className="stat-chart">
              <h3>Revenue Trend (AED)</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="revenue" stroke="#667a4f" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="stat-chart">
              <h3>Orders Per Day</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={ordersData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#8fa878" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="top-products">
            <h3>Top 5 Selling Products</h3>
            <p className="empty-state">Data will appear once backend is connected</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminStats;
