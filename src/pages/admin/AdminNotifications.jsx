import { useState } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import FormToast from "../../components/FormToast";
import "./AdminPages.css";

function AdminNotifications() {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    recipient: "all",
    email: "",
  });
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.subject.trim() || !formData.message.trim()) {
      setToastType("error");
      setToastMessage("Please fill in all fields");
      return;
    }

    setToastType("success");
    setToastMessage("Notification sent successfully!");
    setFormData({ subject: "", message: "", recipient: "all", email: "" });
  };

  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Send Notifications</h1>

          <FormToast
            message={toastMessage}
            type={toastType}
            onClose={() => setToastMessage("")}
          />

          <div className="notification-form-card">
            <h2>New Notification</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Notification subject"
                  value={formData.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  placeholder="Notification message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Send To</label>
                <select
                  name="recipient"
                  value={formData.recipient}
                  onChange={handleChange}
                >
                  <option value="all">All Customers</option>
                  <option value="specific">Specific Email</option>
                </select>
              </div>

              {formData.recipient === "specific" && (
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="customer@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              )}

              <button type="submit" className="form-submit-btn">
                Send Notification
              </button>
            </form>
          </div>

          <div className="notification-history">
            <h2>Sent Notifications</h2>
            <p className="empty-state">No notifications sent yet</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminNotifications;
