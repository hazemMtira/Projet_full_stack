import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "../api";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
      setAllProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() === "") {
      setProducts(allProducts);
      return;
    }

    const filtered = allProducts
      .filter((product) => {
        const searchLower = query.toLowerCase();
        const nameLower = product.name.toLowerCase();
        const barcode = product.barcode || "";
        const id = product._id || "";

        return (
          nameLower.includes(searchLower) ||
          barcode.includes(query) ||
          id.includes(query)
        );
      })
      .sort((a, b) => {
        const searchLower = query.toLowerCase();
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();

        const aIndex = aName.indexOf(searchLower);
        const bIndex = bName.indexOf(searchLower);

        const aPosition = aIndex === -1 ? 999 : aIndex;
        const bPosition = bIndex === -1 ? 999 : bIndex;

        if (aPosition !== bPosition) {
          return aPosition - bPosition;
        }

        return aName.localeCompare(bName);
      });

    setProducts(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="level">
        <div className="level-left">
          <h1 className="title is-3">Product Management</h1>
        </div>
        <div className="level-right">
          <Link to="/add" className="button is-primary">
            Add Product
          </Link>
        </div>
      </div>

      <div className="field mb-5">
        <div className="control is-expanded">
          <input
            className="input"
            type="text"
            placeholder="Search by name, ID, or barcode"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        {searchQuery && (
          <p className="help">
            Found {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      <div className="table-container">
        <table className="table is-striped is-hoverable is-fullwidth">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Barcode</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center" }}>
                  {searchQuery
                    ? "No products found matching your search"
                    : "No products available"}
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>${product.price}</td>
                  <td>{product.barcode}</td>
                  <td>{product.category}</td>
                  <td>
                    <Link
                      to={`/edit/${product._id}`}
                      className="button is-info is-small mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="button is-danger is-small"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
