import { NavLink } from "react-router-dom";
import "./AdminPages.css";

function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h2>Admin Menu</h2>
      <nav className="admin-nav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
          }
        >
          Messages
        </NavLink>
        <NavLink
          to="/admin/stats"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
          }
        >
          Statistics
        </NavLink>
        <NavLink
          to="/admin/notifications"
          className={({ isActive }) =>
            `admin-sidebar-link ${isActive ? "admin-sidebar-link--active" : ""}`
          }
        >
          Notifications
        </NavLink>
      </nav>
    </aside>
  );
}

export default AdminSidebar;
