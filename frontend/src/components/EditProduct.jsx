import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../api";


const EditProduct = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    barcode: "",
    category: "",
    stock: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch product data on mount
  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const res = await getProductById(id);
        setForm(res.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        alert("Error fetching product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Number-only input handler
  const handleNumberChange = (e, field) => {
    const value = e.target.value;
    if (value === "" || /^\d+$/.test(value)) {
      setForm({ ...form, [field]: value });
    }
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...form,
        price: parseFloat(form.price),
        stock: parseInt(form.stock) || 0,
      };
      await updateProduct(id, productData);
      alert("Product updated successfully!");
      navigate("/");
    } catch (error) {
      console.error("Update failed:", error);
      alert(
        `Failed to update product: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="container">
      <div className="columns is-centered">
        <div className="column is-half">
          <h1 className="title is-3 has-text-centered">Edit Product</h1>
          <form onSubmit={updateProductHandler} className="box">
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
                  onChange={(e) => handleNumberChange(e, "barcode")}
                  pattern="\d+"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Stock</label>
              <div className="control">
                <input
                  type="text"
                  name="stock"
                  className="input"
                  placeholder="Stock Quantity"
                  value={form.stock}
                  onChange={(e) => handleNumberChange(e, "stock")}
                  pattern="\d+"
                  inputMode="numeric"
                  required
                />
              </div>
              <p className="help">
                {form.stock < 5 && form.stock !== "" ? (
                  <span style={{ color: "#d32f2f", fontWeight: "bold" }}>
                    ⚠️ Low stock alert!
                  </span>
                ) : (
                  "Enter stock quantity (numbers only)"
                )}
              </p>
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
                <button
                  className="button is-primary is-fullwidth"
                  type="submit"
                >
                  Update Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
