import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ProductList from "./components/ProductList";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="container pt-5">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add" element={<AddProduct />} />
          <Route path="/edit/:id" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
