import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import AdminSidebar from "./AdminSidebar";
import api from "../../utils/api";
import "./AdminPages.css";

const emptyForm = {
  id: "",
  name: "",
  mainCategory: "",
  price: "",
  stock: "",
  description: "",
  image: "",
};

function AdminInventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await api.get("/products?limit=500");
      setProducts(res.data?.data?.products || []);
      setError("");
    } catch (err) {
      setError("Failed to load products: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openAddForm = () => {
    setEditingId(null);
    setFormData({ ...emptyForm, id: Date.now() });
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setEditingId(product.id);
    setFormData({
      id: product.id,
      name: product.name || "",
      mainCategory: product.mainCategory || "",
      price: product.price || "",
      stock: product.stock ?? 0,
      description: product.description || "",
      image: product.image || "",
    });
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      id: Number(formData.id),
      price: Number(formData.price),
      stock: Number(formData.stock),
    };

    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, payload);
      } else {
        await api.post("/products", payload);
      }
      await fetchProducts();
      closeForm();
    } catch (err) {
      alert("Save failed: " + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      await fetchProducts();
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div>
      <Navbar />

      <main className="admin-page">
        <AdminSidebar />

        <section className="admin-content">
          <h1>Inventory Management</h1>

          <div className="admin-actions">
            <button className="admin-btn admin-btn--primary" onClick={openAddForm}>
              + Add Product
            </button>
            <span className="admin-count">{products.length} products</span>
          </div>

          {error && <p className="admin-error">{error}</p>}

          {showForm && (
            <div className="inventory-form-card">
              <h2>{editingId ? "Edit Product" : "New Product"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <input
                      type="text"
                      name="mainCategory"
                      value={formData.mainCategory}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Price (AED)</label>
                    <input
                      type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Stock</label>
                    <input
                      type="number"
                      name="stock"
                      value={formData.stock}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="form-submit-btn">
                    {editingId ? "Save Changes" : "Create Product"}
                  </button>
                  <button type="button" className="form-cancel-btn" onClick={closeForm}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="admin-table">
            {loading ? (
              <p className="empty-state">Loading products...</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.mainCategory}</td>
                      <td>AED {product.price}</td>
                      <td>
                        <span className={product.stock === 0 ? "stock-low" : "stock-ok"}>
                          {product.stock ?? 0}
                        </span>
                      </td>
                      <td>
                        <button
                          className="admin-btn-small"
                          onClick={() => openEditForm(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="admin-btn-small admin-btn-small--danger"
                          onClick={() => handleDelete(product.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminInventory;