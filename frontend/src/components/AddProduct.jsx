import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { saveProduct } from "../api";

const AddProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    barcode: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Special handler for barcode - only allows numbers
  const handleBarcodeChange = (e) => {
    const value = e.target.value;
    // Only allow digits (0-9)
    if (value === "" || /^\d+$/.test(value)) {
      setForm({ ...form, barcode: value });
    }
  };

  const saveProductHandler = async (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", form);
    
    // Validate barcode has at least one number
    if (!form.barcode || form.barcode.trim() === "") {
      alert("Barcode is required and must contain numbers");
      return;
    }
    
    // Prepare data - convert price to number
    const productData = {
      ...form,
      price: parseFloat(form.price),
      barcode: form.barcode.trim()
    };
    
    console.log("Sending product data:", productData);
    
    try {
      const response = await saveProduct(productData);
      console.log("Product saved successfully:", response);
      alert("Product saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error saving product:", error);
      console.error("Error response:", error.response?.data);
      alert(`Failed to save product: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title is-3 has-text-centered">Add Product</h1>
          <form onSubmit={saveProductHandler} className="box">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  type="text"
                  name="name"
                  className="input"
                  placeholder="Product Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Description</label>
              <div className="control">
                <textarea
                  name="description"
                  className="textarea"
                  placeholder="Product Description"
                  value={form.description}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Price</label>
              <div className="control">
                <input
                  type="number"
                  name="price"
                  className="input"
                  placeholder="Price"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Barcode</label>
              <div className="control">
                <input
                  type="text"
                  name="barcode"
                  className="input"
                  placeholder="Barcode (numbers only)"
                  value={form.barcode}
                  onChange={handleBarcodeChange}
                  pattern="\d+"
                  inputMode="numeric"
                  required
                />
              </div>
              <p className="help">Only numbers are allowed (required)</p>
            </div>
            <div className="field">
              <label className="label">Category</label>
              <div className="control">
                <input
                  type="text"
                  name="category"
                  className="input"
                  placeholder="Category"
                  value={form.category}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="field">
              <div className="control">
                <button className="button is-primary is-fullwidth" type="submit">
                  Save Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;