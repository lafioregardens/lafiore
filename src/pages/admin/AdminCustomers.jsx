import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import "./AdminPages.css";

function AdminCustomers() {
  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Customer Messages</h1>

          <div className="admin-table">
            <table>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Message</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan="5" className="empty-state">
                    No messages yet
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="admin-note">📌 Customer messages will appear here. Replies can be sent via backend</p>
        </section>
      </main>
    </div>
  );
}

export default AdminCustomers;
