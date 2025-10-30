import React from 'react';
import '../Style/Product.css'; 

function ProductCard({ menu }) {
  return (
    <div className="product-card">
      <div className="image-container">
        {menu.image ? (
          <img src={menu.image} alt={menu.name} />
        ) : (
          <div className="image-placeholder">Image</div>
        )}
      </div>

      <div className="product-info">
        <p><strong>Name:</strong> {menu.name}</p>
        <p><strong>Description:</strong> {menu.description}</p>
        <p><strong>Price:</strong> ₹{menu.price}</p>
        <p><strong>Average Prep Time:</strong> {menu.averageTime} Mins</p>
        <p><strong>Category:</strong> {menu.category}</p>
      </div>
    </div>
  );
}

export default ProductCard;
