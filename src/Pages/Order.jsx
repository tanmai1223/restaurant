import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Siderbar";
import "../Style/order.css";

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  /* ===================================================
     🟢 Fetch Orders Once on Mount
  =================================================== */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/order`);
        const data = await res.json();

        if (data.status === "success") {
          const enrichedOrders = data.data.map((order) => {
            const remainingSeconds =
              order.status === "served" ? 0 : order.averageTime * 60;

            return {
              ...order,
              remainingSeconds,
              isServed: order.status === "served",
              isUpdating: false,
            };
          });
          setOrders(enrichedOrders);
        }
      } catch (err) {
        console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_URL]);

  /* ===================================================
     ⏱️ Timer - Decrease Remaining Seconds
  =================================================== */
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (
            order.remainingSeconds > 0 &&
            !order.isServed &&
            !order.isUpdating
          ) {
            return { ...order, remainingSeconds: order.remainingSeconds - 1 };
          }

          // When timer hits 0, mark as updating (only once)
          if (
            order.remainingSeconds <= 0 &&
            !order.isServed &&
            !order.isUpdating
          ) {
            console.log("⏰ Timer up for order:", order._id);
            updateOrderInDB(order._id);
            return { ...order, isUpdating: true };
          }

          return order;
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ===================================================
     ⚙️ Function to Update Order in DB
  =================================================== */
  const updateOrderInDB = async (id) => {
    try {
      const res = await fetch(`${API_URL}/api/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ averageTime: 0, status: "served" }),
      });

      const data = await res.json();

      if (data.status === "success") {
        console.log(`✅ Order ${id} marked as served`);

        // Update the frontend immediately
        setOrders((current) =>
          current.map((o) =>
            o._id === id
              ? {
                  ...o,
                  remainingSeconds: 0,
                  isServed: true,
                  isUpdating: false,
                  status: "served",
                }
              : o
          )
        );
        return true;
      } else {
        console.error("Update failed:", data);
        return false;
      }
    } catch (err) {
      console.error("Failed to update order:", err);
      return false;
    }
  };

  /* ===================================================
     ⌛ Format Time Utility
  =================================================== */
  const formatTime = (seconds) => {
    if (seconds <= 0) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  /* ===================================================
     🖥️ Render UI
  =================================================== */
  if (loading) {
    return (
      <div className="order-page">
        <Sidebar />
        <div className="order-container">
          <h2>Loading orders...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="order-page">
      <Sidebar />
      <div className="order-container">
        <h2>Orders Overview</h2>

        {orders.length === 0 ? (
          <p>No orders yet.</p>
        ) : (
          <div className="order-list">
            {orders.map((order) => (
              <div
                key={order._id}
                className={`order-card ${
                  order.isServed ? "served" : "active"
                }`}
              >
                <h3>{order.name}</h3>
                <p>
                  <strong>Phone:</strong> {order.phoneNumber}
                </p>
                <p>
                  <strong>Items:</strong>{" "}
                  {order.orderItem?.join(", ") || "No items"}
                </p>
                <p>
                  <strong>Assigned Chef:</strong>{" "}
                  {order.chef?.name || "Unassigned"}
                </p>
                <p>
                  <strong>Table:</strong>{" "}
                  {order.table?.tableNo || "N/A"}
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  {order.status || "Processing"}
                </p>
                <p>
                  <strong>Time Left:</strong>{" "}
                  {formatTime(order.remainingSeconds)}
                </p>

                <button
                  disabled={order.isServed || order.isUpdating}
                  className={`serve-btn ${
                    order.isServed ? "served" : ""
                  }`}
                >
                  {order.isUpdating
                    ? "Updating..."
                    : order.isServed
                    ? "Order Done 👍"
                    : "Processing ⏳"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Order;
