import React, { useEffect, useState, useRef } from "react";
import Sidebar from "../Components/Siderbar";
import { FaPlus } from "react-icons/fa6";
import "../Style/table.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;


function Table() {
  const [formsVisible, setFormsVisible] = useState(false);
  const [tables, setTables] = useState([]);
  const [tableName, setTableName] = useState("");
  const [chairCount, setChairCount] = useState(2);

  const popupRef = useRef(null);

  // Fetch existing tables
  const fetchTables = async () => {
    try {
      const res = await fetch(`${API_URL}/api/table`);
      const data = await res.json();
      setTables(data.data || []);
    } catch (err) {
      console.log("Error fetching tables:", err);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  // Handle click outside popup to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setFormsVisible(false);
      }
    }

    if (formsVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [formsVisible]);

  // Add new table
  const handleAddTable = async (e) => {
    e.preventDefault();

    if (tables.length >= 30) {
      toast.error("Cannot add more than 30 tables!");
      return;
    }

    const newTableNumber = tables.length + 1;
    const newTable = {
      name: tableName.trim() || `Table ${newTableNumber}`,
      number: newTableNumber,
      tableSize: chairCount,
    };

    try {
      const res = await fetch(`${API_URL}/api/table`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTable),
      });

      const result = await res.json();

      if (res.ok) {
        setTables([...tables, result.data]);
        setTableName("");
        setChairCount(2);
        setFormsVisible(false);
        toast.success("Table created successfully!");
      } else {
        toast.error(result.message || "Error adding table");
      }
    } catch (err) {
      toast.error("Error submitting table!");
      console.log("Error submitting:", err);
    }
  };

  return (
    <>
    <ToastContainer
  position="top-right"
  autoClose={3000}
  
/>
 
    <div className="app-container">
       <Sidebar />
        
      <div className="main-content">
        <div className="tcontainer">
          <h2 className="title">Tables</h2>

          {/* Tables Grid */}
          <div className="tables-grid">
            {tables.map((table, index) => (
              <div key={index} className="table-box">
                <div className="table-header">{table.name}</div>
                <h3 className="table-number">
                  {table.number.toString().padStart(2, "0")}
                </h3>
                <div className="chair-count">🪑 0{table.tableSize}</div>
              </div>
            ))}

            {/* Add Button */}
            <div
              className="add-table"
              onClick={() => setFormsVisible(!formsVisible)}
            >
              <FaPlus className="plusIcon" />
            </div>
          </div>

          {/* Popup Form */}
          {formsVisible && (
            <div className="table-form-popup">
              <form ref={popupRef} onSubmit={handleAddTable} className="popup-form">
                <input
                  type="text"
                  className="table-name-input"
                  placeholder="Table Name (Optional)"
                  value={tableName}
                  onChange={(e) => setTableName(e.target.value)}
                />

                <div className="table-number-display">
                  {tables.length + 1}
                </div>

                <label className="form-label">Chair</label>
                <select
                  value={chairCount}
                  onChange={(e) => setChairCount(Number(e.target.value))}
                  className="chair-select"
                >
                  <option value={2}>02</option>
                  <option value={4}>04</option>
                  <option value={6}>06</option>
                  <option value={8}>08</option>
                </select>

                <button type="submit" className="create-btn">
                  Create
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      
    
    </div>
    </>
  );
}

export default Table;
