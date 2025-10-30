import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_API_URL;

function TableCard() {
    const [table, setTable] = useState([]);

    const fetchTable = async () => {
        try {
            const res = await fetch(`${API_URL}/api/table`);
            const data = await res.json();
            setTable(data.data);
        } catch (err) {
            console.log("Error : ", err);
        }
    }

    useEffect(() => {
        fetchTable();
    }, []);

    return (
        <div className="tables-grids">
            {table.map((tableItem, index) => (
                <div
                    key={index}
                    className="table-boxs"
                    style={{ backgroundColor: tableItem.flag ? "greenyellow" : "#F0F5F3" }}
                >
                    <div className="table-headers">{tableItem.name}</div>
                    <h3 className="table-numbers">
                        {tableItem.number.toString().padStart(2, "0")}
                    </h3>
                </div>
            ))}
        </div>
    )
}

export default TableCard;
