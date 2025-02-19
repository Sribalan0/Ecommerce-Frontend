import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    name: "",
    description: "",
    brand: "",
    price: "",
    category: "",
    releaseDate: "",
    productAvailable: false,
    stockQuantity: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/product/${id}`);
        setProduct(response.data);

        // Fetch the image separately
        const responseImage = await axios.get(`http://localhost:8080/api/product/${id}/image`, {
          responseType: "blob",
        });

        const imageFile = await convertUrlToFile(responseImage.data, response.data.imageName);
        setImage(imageFile);

        // Populate updateProduct state
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  useEffect(() => {
    console.log("Image Updated:", image);
  }, [image]);

  // Convert Blob URL to File
  const convertUrlToFile = async (blobData, fileName) => {
    return new File([blobData], fileName, { type: blobData.type });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setUpdateProduct((prev) => ({
      ...prev,
      [name]: name === "stockQuantity" ? Math.max(0, parseInt(value, 10) || 0) : value,
    }));
  };

  // Handle image change
  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Images:", image);
    console.log("Product:", updateProduct);

    const formattedReleaseDate = new Date(updateProduct.releaseDate).toISOString().split("T")[0];

    const updatedProduct = new FormData();
    updatedProduct.append("imageFile", image || new Blob());
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify({ ...updateProduct, releaseDate: formattedReleaseDate })], {
        type: "application/json",
      })
    );

    try {
      await axios.put(`http://localhost:8080/api/product/${id}`, updatedProduct, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Product updated successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product. Please try again.");
    }
  };

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "1rem" }}>
        <form className="row g-2 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label"><h6>Name</h6></label>
            <input
              type="text"
              className="form-control"
              value={updateProduct.name}
              onChange={handleChange}
              name="name"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label"><h6>Brand</h6></label>
            <input
              type="text"
              name="brand"
              className="form-control"
              value={updateProduct.brand}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label"><h6>Description</h6></label>
            <input
              type="text"
              className="form-control"
              name="description"
              onChange={handleChange}
              value={updateProduct.description}
            />
          </div>

          <div className="col-5">
            <label className="form-label"><h6>Price</h6></label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.price}
              name="price"
            />
          </div>

          <div className="col-md-6">
            <label className="form-label"><h6>Category</h6></label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
            >
              <option value="">Select category</option>
              <option value="laptop">Laptop</option>
              <option value="headphone">Headphone</option>
              <option value="mobile">Mobile</option>
              <option value="electronics">Electronics</option>
              <option value="toys">Toys</option>
              <option value="fashion">Fashion</option>
              <option value="stationary">Stationary</option>
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label"><h6>Stock Quantity</h6></label>
            <input
              type="number"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.stockQuantity}
              name="stockQuantity"
            />
          </div>

          <div className="col-md-8">
            <label className="form-label"><h6>Image</h6></label>
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt={product.imageName}
              style={{ width: "160px", height: "100px", padding: "5px", margin: "2" }}
            />
            <input
              className="form-control"
              type="file"
              onChange={handleImageChange}
              name="imageUrl"
            />
          </div>

          <div className="col-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="productAvailable"
                checked={updateProduct.productAvailable}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, productAvailable: e.target.checked })
                }
              />
              <label className="form-check-label">Product Available</label>
            </div>
          </div>

          <div className="col-5">
            <button type="submit" className="btn btn-primary">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;
