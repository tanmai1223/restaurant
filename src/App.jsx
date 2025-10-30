import React from "react";
import { Route, Routes } from "react-router-dom";
import Analystics from './Pages/Analystics';
import Order from "./Pages/Order";
import Product from "./Pages/Product";
import Table from "./Pages/Table";
import "./Style/main.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Analystics />} />
        <Route path="/order" element={<Order />} />
        <Route path="/product" element={<Product />} />
        <Route path="/table" element={<Table />} />
      </Routes>
    </div>
  );
}

export default App;
