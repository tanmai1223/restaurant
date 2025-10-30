import Sidebar from '../Components/Siderbar'
import React, { useEffect, useState } from 'react'
import '../Style/Product.css'
import ProductCard from '../Components/ProductCard';
const API_URL = import.meta.env.VITE_API_URL;

function Product() {
  const [item, setItem] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // search input value

  const fetchData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/menu`);
      const data = await res.json();
      setItem(data.data);
    } catch (err) {
      console.log("Error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // show all items if searchTerm is empty
  const filteredItems = searchTerm
    ? item.filter(menu =>
        menu.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : item;

  return (
    <div className='app-container'>
      <Sidebar />
      <div className='main-content'>
        <div className="fliter">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Search..."
              className="inputfliter"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </form>
        </div>

        <div className='pcontainer'>
          {filteredItems.length > 0 ? (
            filteredItems.map((menu) => (
              <ProductCard key={menu._id} menu={menu} />
            ))
          ) : (
            <p className="no-results">No items found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
