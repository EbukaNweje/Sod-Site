import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "./AdminCss/Product.css";
import { toast } from "react-toastify";

const productSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters"),
  sizes: z.array(z.string().min(1)).nonempty("At least one size is required"),
  amount: z.number().min(1, "Amount must be greater than zero"),
  productImage: z.instanceof(FileList),
});

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
        sizes: []  
      }
    
  });

  const [sizes, setSizes] = useState([]);
  const sizeInput = watch("sizeInput");

  const handleAddSize = () => {
    if (sizeInput && !sizes.includes(sizeInput)) {
      const updatedSizes = [...sizes, sizeInput];
      setSizes(updatedSizes);
      setValue("sizes", updatedSizes); 
      setValue("sizeInput", ""); 
    }
  };

  const handleRemoveSize = (size) => {
    const newSizes = sizes.filter((s) => s !== size);
    setSizes(newSizes);
    setValue("sizes", newSizes); 
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("productImage", e.target.files);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("amount", data.amount);
    sizes.forEach((size) => formData.append("sizes[]", size));
    if (data.productImage?.length) {
      formData.append("productImage", data.productImage[0]);
    }

    try {
      const response = await fetch("https://api.example.com/products", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product");
      }

      toast.success("Product added successfully!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Product Name</label>
          <input type="text" {...register("productName")} />
          {errors.productName && <p className="error">{errors.productName.message}</p>}
        </div>

        <div className="form-group">
          <label>Available Sizes</label>
          <div className="size-input">
            <input type="text" {...register("sizeInput")} />
            <button type="button" onClick={handleAddSize}>Add</button>
          </div>
          <div className="size-list">
            {sizes.map((size, index) => (
              <span key={index} className="size-tag">
                {size} <button type="button" onClick={() => handleRemoveSize(size)}>×</button>
              </span>
            ))}
          </div>
          {errors.sizes && <p className="error">{errors.sizes.message}</p>}
        </div>

        <div className="form-group">
          <label>Product Amount (₦)</label>
          <input type="number" {...register("amount", { valueAsNumber: true })} />
          {errors.amount && <p className="error">{errors.amount.message}</p>}
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <div className="preview">
          <h3>Preview</h3>
          <p><strong>Name:</strong> {watch("productName")}</p>
          <p><strong>Sizes:</strong> {sizes.join(", ")}</p>
          <p><strong>Amount:</strong> ₦{watch("amount") || 0}</p>
          {preview && <img src={preview} alt="Preview" />}
        </div>

        <button type="submit" className="submit-btn">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
