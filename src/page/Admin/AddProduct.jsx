import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./AdminCss/Product.css"
// import * as Yup from "yup";


const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState();
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
  });

  // console.log(formData)

  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get("https://sod-back-end.vercel.app/api/getallcartegory");
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getAllCategories();
  }, []);

  // const validateForm = () => {
  //   let newErrors = {};
  //   if (!formData.productName.trim()) newErrors.productName = "Product name is required";
  //   if (sizes.length === 0) newErrors.sizes = "At least one size is required";
  //   if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount must be greater than zero";
  //   if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Quantity must be at least 1";
  //   if (!formData.category) newErrors.category = "Category is required";
  //   if (!formData.description || formData.description.length < 10) newErrors.description = "Description must be at least 10 characters";
  //   if (!formData.productImage) newErrors.productImage = "Product image is required";
  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleAddSize = () => {
    if (formData.size.trim() && !sizes.includes(formData.size.trim())) {
      setSizes([...sizes, formData.size.trim()]);
      setFormData({ ...formData, size: formData.size.trim() });
    }
  };

  const handleRemoveSize = (size) => {
    setSizes(sizes.filter((s) => s !== size));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setPreview(URL.createObjectURL(file));
  //     setFormData({ ...formData, productImage: file.name }); // Save only image name as string
  //   }
  // };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const save = URL.createObjectURL(file);
    setPreview(save);
    setImage(file); // Set the image state to the file object
  };
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;
  
  //   setLoading(true);
  // console.log(formData);
  // const productData = new FormData();
  // productData.append("name", formData.productName);
  // productData.append("price", formData.amount);
  // productData.append("category", formData.category);
  // productData.append("quantity", formData.quantity);
  // productData.append("description", formData.description);
  // productData.append("size", JSON.stringify(sizes));
  
  // // if (formData.productImage) {
  // //   productData.append("image", formData.productImage);
  // // }
  
  // // Log each value
  // for (let pair of productData.entries()) {
  //   console.log(pair[0] + ": " + pair[1]);
  // }
  
  
  //   console.log("formData before appending:", formData);

  //     console.log("productData", productData);
      
  
  //   try {
  //     const Token = localStorage.getItem("authToken");
  //     const url = "https://sod-back-end.vercel.app/api/addProduct";
  //     const response = await axios.post(url, productData, {
  //       headers: {
  //         "Authorization": `header ${Token}`,
  //         // "Content-Type": "multipart/form-data",
  //       },
  //     });
  
  //     if (response.status !== 200) throw new Error("Failed to add product");
  
  //     setLoading(false);
  //     toast.success("Product added successfully!");
  //     setFormData({
  //       productName: "",
  //       sizeInput: "",
  //       amount: "",
  //       quantity: "",
  //       category: "",
  //       description: "",
  //       productImage: null,
  //     });
  //     setSizes([]);
  //     setPreview(null);
  //   } catch (error) {
  //     setLoading(false);
  //     toast.error(error.message);
  //   }
  // };
  

  const addProduct = (async (e) => {
    e.preventDefault();
  
    try {
      const formDatas = new FormData();
      formDatas.append("name", formData.name);
      formDatas.append("description", formData.description);
      formDatas.append("price", formData.price);
      formDatas.append("quantity", formData.quantity);
      formDatas.append("image", image); // Append the file object to the FormData
      formDatas.append("size", formData.size);
      formDatas.append("category", formData.category);
  
      // const config = {
      //   headers: {
      //     "content-type": "multipart/form-data"
      //   }
      // }

      console.log("formDatas", formDatas);
  
      setLoading(true);
  
      const Token = localStorage.getItem("authToken");
      const url = "https://sodbackend.onrender.com/api/addProduct";
      const response = await axios.post(url, formDatas, {
        headers: {
          "Authorization": `header ${Token}`,
        },
      });
  
      // if (response.status !== 200) throw new Error("Failed to add product");
  
      setLoading(false);
      toast.success("Product added successfully!");
      setFormData({
        name: "",
        size: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        image: null,
      });
      setSizes([]);
      setPreview(null);
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  })

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={addProduct}>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.productName && <p className="error">{errors.productName}</p>}
        </div>

        <div className="form-group">
          <label>Available Sizes</label>
          <div className="size-input">
            <input type="text" name="size" value={formData.size} onChange={handleChange} />
            <button type="button" onClick={handleAddSize}>Add</button>
          </div>
          <div className="size-list">
            {sizes.map((size, index) => (
              <span key={index} className="size-tag">
                {size} <button type="button" onClick={() => handleRemoveSize(size)}>×</button>
              </span>
            ))}
          </div>
          {errors.sizes && <p className="error">{errors.sizes}</p>}
        </div>

        <div className="form-group">
          <label>Product Amount (₦)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
          {errors.quantity && <p className="error">{errors.quantity}</p>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.categoryName}
              </option>
            ))}
          </select>
          {errors.category && <p className="error">{errors.category}</p>}
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea name="description" rows="4" value={formData.description} onChange={handleChange}></textarea>
          {errors.description && <p className="error">{errors.description}</p>}
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
          {errors.productImage && <p className="error">{errors.productImage}</p>}
        </div>

        <div className="preview">
          <h3>Preview</h3>
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Sizes:</strong> {sizes.join(", ")}</p>
          <p><strong>Amount:</strong> ₦{formData.price || 0}</p>
          <p><strong>Quantity:</strong> {formData.quantity || 0}</p>
          <p><strong>Category:</strong> {formData.category}</p>
          <p><strong>Description:</strong> {formData.description}</p>
          {/* {preview && <img src={preview} alt="Preview" />} */}
        </div>

        <button type="submit" className="submit-btn">{loading ? "Loading..." : "Add Product"}</button>
      </form>
    </div>
  );
};

export default AddProduct;
