import React, { useState, useEffect } from 'react';
import '../pagesCss/newArrivals.css';
import ProductC from '../../components/ProductC';
import axios from 'axios';

const Allproduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading]= useState(false)
  const [error, setError] = useState(null);
  const [Btnloading, setBtnLoading] = useState(false);

  const [editedProduct, setEditedProduct] = useState({
    name: '',
    price: '',
    quantity: '',
  });

  const handleDelete = (id) => {
    setBtnLoading(true);
    fetch(`https://sod-back-end.vercel.app/api/deleteProduct/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        console.log("Product deleted successfully");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
       const { data } = await axios.get('https://sod-back-end.vercel.app/api/allProduct');
       setProducts(Array.isArray(data?.data) ? data.data : []); 
      } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (product) => {
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
    try {
      await axios.put(`https://sod-back-end.vercel.app/api/products/${selectedProduct._id}`, editedProduct);
      setProducts((prev) =>
        prev.map((product) => (product._id === selectedProduct._id ? { ...product, ...editedProduct } : product))
      );
      closeEditModal();
    } catch (error) {
      console.error('Error updating product:', error);
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
  // limit={60} 
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
            <input type="text" name="name" value={editedProduct.name} onChange={handleEditChange} />
            <label>Price:</label>
            <input type="number" name="price" value={editedProduct.price} onChange={handleEditChange} />
            <label>Quantity:</label>
            <input type="number" name="quantity" value={editedProduct.quantity} onChange={handleEditChange} />
            <button onClick={saveChanges}>Save Changes</button>
            <button onClick={closeEditModal}>Cancel</button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Allproduct;
