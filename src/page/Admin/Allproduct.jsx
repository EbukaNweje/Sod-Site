import React, { useState, useEffect } from 'react';
import '../pagesCss/newArrivals.css';
import ProductC from '../../components/ProductC';
import axios from 'axios';

const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [Btnloading, setBtnLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState(null);

  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get('https://sod-back-end.vercel.app/api/allProduct');
      setProducts(Array.isArray(data?.data) ? data.data : []);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setBtnLoading(true);
      await axios.delete(`https://sod-back-end.vercel.app/api/deleteProduct/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Error deleting product.");
    } finally {
      setBtnLoading(false);
    }
  };

  const openEditModal = (product) => {
    if (!product?._id) {
      alert("Product data is invalid!");
      return;
    }

    setSelectedProduct(product);
    setEditedProduct({
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    });
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const saveChanges = async () => {
    if (!selectedProduct?._id) return;

    setSaveLoading(true);

    try {
      await axios.patch(
        `https://sod-back-end.vercel.app/api/updateproduct/${selectedProduct._id}`,
        editedProduct
      );
      setProducts((prev) =>
        prev.map((product) =>
          product._id === selectedProduct._id ? { ...product, ...editedProduct } : product
        )
      );
      closeEditModal();
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Update failed. Please try again.');
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <main className="new_arrivals_body">
      <section className="new_arrivals_hero_section">
        <h1>Your Products</h1>
        <p>See all that you've uploaded</p>
      </section>

      <section className="new_arrivals_items_container">
        <ProductC
          error={error}
          loading={loading}
          key="all-products"
          product={products}
          onEdit={openEditModal}
          handleDelete={handleDelete}
          Btnloading={Btnloading}
        />
      </section>

      {isEditModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <h3>Edit Product</h3>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={editedProduct.name}
              onChange={handleEditChange}
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={editedProduct.price}
              onChange={handleEditChange}
            />
            <label>Quantity:</label>
            <input
              type="number"
              name="quantity"
              value={editedProduct.quantity}
              onChange={handleEditChange}
            />
            <div className="modalButtons">
              <button onClick={saveChanges} disabled={saveLoading}>
                {saveLoading ? (
                  <span className="loader"></span> // replace with icon if needed
                ) : (
                  'Save Changes'
                )}
              </button>
              <button onClick={closeEditModal} disabled={saveLoading}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSS Loader */}
      <style>{`
        .loader {
          border: 3px solid #f3f3f3;
          border-top: 3px solid #555;
          border-radius: 50%;
          width: 16px;
          height: 16px;
          animation: spin 1s linear infinite;
          display: inline-block;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
};

export default Allproduct;
