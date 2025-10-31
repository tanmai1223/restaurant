import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Siderbar";
import "../Style/order.css";

const API_URL = import.meta.env.VITE_API_URL;

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===========================================
     🟢 FETCH ORDERS ONCE
  ============================================ */
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${API_URL}/api/order`);
        const data = await res.json();

        if (data.status === "success") {
          const now = new Date();
          setOrders(
            data.data.map((order) => {
              const orderTime = new Date(order.time);
              const elapsedSeconds = Math.floor((now - orderTime) / 1000);
              const totalSeconds = order.averageTime * 60;
              const remainingSeconds = Math.max(totalSeconds - elapsedSeconds, 0);

              return {
                ...order,
                isServed: order.status === "served" || remainingSeconds <= 0,
                remainingSeconds,
                isUpdating: false,
              };
            })
          );
        } else {
          console.error("Error fetching orders:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ===========================================
     🟢 UPDATE ORDER STATUS WHEN SERVED
  ============================================ */
  const updateOrderInDB = async (id) => {
    console.log(`⏩ Attempting to update order ${id} → served`);
    try {
      const res = await fetch(`${API_URL}/api/order/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          averageTime: 0,
          status: "served",
        }),
      });

      const data = await res.json();
      if (data.status === "success") {
        console.log(`✅ Order ${id} successfully marked as served`);
        setOrders((current) =>
          current.map((o) =>
            o._id === id
              ? { ...o, isServed: true, status: "served", isUpdating: false }
              : o
          )
        );
        return true;
      } else {
        console.error("❌ Update failed:", data);
        setOrders((current) =>
          current.map((o) => (o._id === id ? { ...o, isUpdating: false } : o))
        );
        return false;
      }
    } catch (err) {
      console.error("🚨 Failed to update order:", err);
      setOrders((current) =>
        current.map((o) => (o._id === id ? { ...o, isUpdating: false } : o))
      );
      return false;
    }
  };

  /* ===========================================
     ⏳ COUNTDOWN TIMER — SAFE VERSION
  ============================================ */
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prevOrders) =>
        prevOrders.map((order) => {
          if (order.isServed || order.status === "served" || order.isUpdating) {
            return order;
          }

          if (order.remainingSeconds <= 0) {
            console.log("⏰ Timer up for order:", order._id);
            updateOrderInDB(order._id); // triggers async update
            return { ...order, isUpdating: true };
          }

          return { ...order, remainingSeconds: order.remainingSeconds - 1 };
        })
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* ===========================================
     🕒 UTIL FUNCTIONS
  ============================================ */
  const formatRemainingTime = (seconds) => {
    const mins = Math.ceil(seconds / 60);
    return `${mins} min left`;
  };

  const formatTime = (isoTime) => {
    const date = new Date(isoTime);
    return date.toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  /* ===========================================
     🎨 UI RENDERING
  ============================================ */
  if (loading) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <div className="ocontainer">
            <h2 className="page-title">Orders</h2>
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <div className="ocontainer">
          <h2 className="page-title">Orders</h2>

          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="order-grid">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className={`order-card 
                    ${order.isServed ? "served-card" : "processing-card"} 
                    ${order.dineIn ? "dinein" : "takeaway"}`}
                >
                  <div className="order-upper">
                    <div className="order-header">
                      <p>#{order._id.slice(-4).toUpperCase()}</p>
                      <span
                        className={`order-type 
                           ${order.isServed ? "served-card" : "processing-card"} 
                          ${order.dineIn ? "dinein" : "takeaway"}`}
                      >
                        {order.dineIn ? "Dine In" : "Take Away"}
                        <br />
                        <span className="avg-time">
                          {order.isServed
                            ? order.dineIn
                              ? "Served ✓"
                              : "Picked Up ✓"
                            : formatRemainingTime(order.remainingSeconds)}
                        </span>
                      </span>
                    </div>

                    <p className="order-table">
                      {order.dineIn
                        ? `Table: ${order.table?.number || "N/A"}`
                        : "No Table"}
                    </p>

                    <p className="order-time">{formatTime(order.time)}</p>

                    <p className="order-items">
                      {order.orderItem.length} Item
                      {order.orderItem.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="order-body">
                    <ul>
                      {order.orderItem.map((item, i) => (
                        <li key={i}>
                          {item.quantity}x {item.name} ({item.category})
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="order-footer">
                    <button
                      className={`processing-btn ${
                        order.isServed
                          ? order.dineIn
                            ? "done-btn dinein"
                            : "done-btn takeaway"
                          : ""
                      }`}
                    >
                      {order.isServed
                        ? "Order Done 👍"
                        : order.isUpdating
                        ? "Updating..."
                        : "Processing ⏳"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
