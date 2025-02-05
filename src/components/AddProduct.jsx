import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setProduct({
      ...product,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!product.name || !product.price || !product.category) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:8080/api/product",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert("Product added successfully");
      setProduct({
        name: "",
        brand: "",
        description: "",
        price: "",
        category: "",
        stockQuantity: "",
        releaseDate: "",
        productAvailable: false,
      });
      setImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="center-container">
        <form className="row g-3 pt-5" onSubmit={submitHandler}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Name</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              onChange={handleInputChange}
              value={product.name}
              name="name"
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Brand</h6>
            </label>
            <input
              type="text"
              name="brand"
              className="form-control"
              placeholder="Enter your Brand"
              value={product.brand}
              onChange={handleInputChange}
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Description</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Add product description"
              value={product.description}
              name="description"
              onChange={handleInputChange}
            />
          </div>
          <div className="col-5">
            <label className="form-label">
              <h6>Price</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Eg: 1000"
              onChange={handleInputChange}
              value={product.price}
              name="price"
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={product.category}
              onChange={handleInputChange}
              name="category"
              required
            >
              <option value="">Select category</option>
              <option value="Laptop">Laptop</option>
              <option value="Headphone">Headphone</option>
              <option value="Mobile">Mobile</option>
              <option value="Electronics">Electronics</option>
              <option value="Toys">Toys</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Stock Quantity</h6>
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Stock Remaining"
              onChange={handleInputChange}
              value={product.stockQuantity}
              name="stockQuantity"
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              value={product.releaseDate}
              name="releaseDate"
              onChange={handleInputChange}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <input className="form-control" type="file" onChange={handleImageChange} />
          </div>
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                id="gridCheck"
                checked={product.productAvailable}
                onChange={(e) =>
                  setProduct({ ...product, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
