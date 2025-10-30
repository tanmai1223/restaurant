import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

function Tables() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_URL}/api/chef`);
        const data = await res.json();
        setInfo(data.data || []); // ✅ Safe handling
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="tables">
      <table>
        <thead>
          <tr>
            <th>Chef's Name</th>
            <th>Orders Taken</th>
          </tr>
        </thead>
        <tbody>
          {info.length > 0 ? (
            info.map((i) => (
              <tr key={i._id}>
                <td>{i.name}</td>
                <td>{i.activeOrders}</td> 
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tables;
