import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../utils/api";
import "./AdminPages.css";

function AdminStats() {
  const { user } = useContext(AuthContext);
  const [revenueData, setRevenueData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for charts as fallback
  const fallbackRevenueData = [
    { month: "Jan", revenue: 2400 },
    { month: "Feb", revenue: 2210 },
    { month: "Mar", revenue: 2290 },
    { month: "Apr", revenue: 2000 },
  ];

  const fallbackOrdersData = [
    { day: "Mon", orders: 8 },
    { day: "Tue", orders: 10 },
    { day: "Wed", orders: 6 },
    { day: "Thu", orders: 12 },
    { day: "Fri", orders: 15 },
    { day: "Sat", orders: 18 },
    { day: "Sun", orders: 9 },
  ];

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/stats");
        const data = response.data.data;

        // Format revenue by month
        if (data.revenueByMonth && data.revenueByMonth.length > 0) {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          const formatted = data.revenueByMonth.map(item => ({
            month: monthNames[item._id.month - 1],
            revenue: item.total,
          }));
          setRevenueData(formatted);
        } else {
          setRevenueData(fallbackRevenueData);
        }

        // Format orders by day
        if (data.ordersByDay && data.ordersByDay.length > 0) {
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          const formatted = data.ordersByDay.map(item => ({
            day: dayNames[new Date(item._id.year, item._id.month - 1, item._id.day).getDay()],
            orders: item.count,
          }));
          setOrdersData(formatted);
        } else {
          setOrdersData(fallbackOrdersData);
        }

        setError(null);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
        setRevenueData(fallbackRevenueData);
        setOrdersData(fallbackOrdersData);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "admin") {
      fetchStatsData();
    }
  }, [user]);

  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Analytics & Statistics</h1>

          {error && (
            <div className="stats-note">
              ⚠️ <strong>Note:</strong> {error}. Displaying sample data.
            </div>
          )}

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>Loading statistics...</p>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                <div className="stat-chart">
                  <h3>Revenue Trend (AED)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => `AED ${value}`} />
                      <Line type="monotone" dataKey="revenue" stroke="#d4a5a5" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="stat-chart">
                  <h3>Orders Per Day (Last 7 Days)</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={ordersData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="orders" fill="#d4a5a5" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="top-products">
                <h3>📊 About the Charts</h3>
                <p style={{ color: '#666', fontSize: '14px' }}>
                  💡 Click "Seed Demo Data" on the dashboard to generate sample data and see real charts.
                  Charts display revenue trends (last 6 months) and order volume (last 7 days).
                </p>
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default AdminStats;
