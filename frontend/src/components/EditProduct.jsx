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
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductById(id);
        setForm(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, form);
      navigate("/");
    } catch (error) {
      console.log(error);
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
                  placeholder="Barcode"
                  value={form.barcode}
                  onChange={handleChange}
                />
              </div>
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
