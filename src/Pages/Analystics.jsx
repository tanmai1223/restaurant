import React, { useEffect, useState } from "react";
import Siderbar from "../Components/Siderbar";
import "../Style/analytics.css";
import { PiBowlFoodBold } from "react-icons/pi";
import { FaRupeeSign } from "react-icons/fa";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { IoMdContacts } from "react-icons/io";
import TableCard from "../Components/TableCard";
import Tables from "../Components/Tables";
const API_URL = import.meta.env.VITE_API_URL;
console.log(API_URL)
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

function Analytics() {
  const [info, setInfo] = useState({});
  const [summary, setSummary] = useState({});
  const [range, setRange] = useState("daily");
  const [revenueData, setRevenueData] = useState([]);
  const [search, setSearch] = useState("");

  // ===== Fetch Totals =====
  useEffect(() => {
    const fetchTotals = async () => {
      try {
        const res = await fetch(`${API_URL}/api/order/total`);
        const data = await res.json();
        setInfo(data.data || {});
      } catch (err) {
        console.log("Error fetching totals:", err);
      }
    };
    fetchTotals();
  }, []);

  // ===== Fetch Summary =====
  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/order/summary?range=${range}`
        );
        const data = await res.json();
        setSummary(data.data || {});
      } catch (err) {
        console.log("Error fetching summary:", err);
      }
    };
    fetchSummary();
  }, [range]);

  // ===== Fetch Revenue =====
  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const res = await fetch(`${API_URL}/api/order/revenue`);
        const data = await res.json();
        setRevenueData(data.data || []);
      } catch (err) {
        console.log("Error fetching revenue:", err);
      }
    };
    fetchRevenue();
  }, []);

  // ===== Format Revenue =====
  const formatRevenue = (num) => {
    if (!num) return "0";
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
    if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";
    return num.toString();
  };

  const COLORS = ["#5B5B5B", "#828282", "#2C2C2C"];
  const pieData = [
    { name: "Served", value: summary.served || 0 },
    { name: "Dine In", value: summary.dineIn || 0 },
    { name: "Take Away", value: summary.takeaway || 0 },
  ];
  const total =
    (summary.served || 0) + (summary.dineIn || 0) + (summary.takeaway || 0);
  const getPercentage = (val) => (total ? Math.round((val / total) * 100) : 0);

  // ===== Keyword Setup =====
  const sectionKeywords = {
    totalChefs: ["chef", "chefs", "total chefs"],
    totalRevenue: [" revenue", "total revenue"],
    totalOrders: ["orders", "total orders"],
    totalClients: ["client", "clients", "total clients"],
    orderSummary: ["order summary", "summary"],
    revenueChart: ["revenue chart", "weekly","revenue weekly"],
    tables: ["table", "tables"],
  };

  // ===== Matching Logic =====
  const match = (keywords) => {
    if (!search.trim()) return true;
    const term = search.toLowerCase();
    return keywords.some(
      (word) =>
        word.toLowerCase().includes(term) || term.includes(word.toLowerCase())
    );
  };

  // ===== Helper for each section visibility =====
  const visible = {
    chefs: match(sectionKeywords.totalChefs),
    revenue: match(sectionKeywords.totalRevenue),
    orders: match(sectionKeywords.totalOrders),
    clients: match(sectionKeywords.totalClients),
    orderSummary: match(sectionKeywords.orderSummary),
    revenueChart: match(sectionKeywords.revenueChart),
    tables: match(sectionKeywords.tables),
  };

  // ===== If nothing matches, blur all =====
  const somethingMatched = Object.values(visible).some(Boolean);

  return (
    <div className="app-container">
      <Siderbar />
      <div className="main-content">
        {/* 🔍 Search Bar */}
        <div className="fliter">
          <form>
            <input
              type="text"
              placeholder="Search..."
              className="inputfliter"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>

        <div className="container">
          <div className="heading">Analytics</div>

          {/* ===== Stats Section ===== */}
          <div className="stats">
            {/* 👨‍🍳 Total Chefs */}
            <div
              className={`statvalue ${
                visible.chefs ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="staticon">
                <PiBowlFoodBold className="iconvalue" />
              </div>
              <div className="statinfo">
                <h1>{info.chefs || 0}</h1>
                <h4>Total Chefs</h4>
              </div>
            </div>

            {/* 💰 Total Revenue */}
            <div
              className={`statvalue ${
                visible.revenue ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="staticon">
                <FaRupeeSign className="iconvalue" />
              </div>
              <div className="statinfo">
                <h1>{formatRevenue(info.revenue || 0)}</h1>
                <h4>Total Revenue</h4>
              </div>
            </div>

            {/* 📦 Total Orders */}
            <div
              className={`statvalue ${
                visible.orders ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="staticon">
                <BsFillPersonBadgeFill className="iconvalue" />
              </div>
              <div className="statinfo">
                <h1>{info.orders || 0}</h1>
                <h4>Total Orders</h4>
              </div>
            </div>

            {/* 👥 Total Clients */}
            <div
              className={`statvalue ${
                visible.clients ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="staticon">
                <IoMdContacts className="iconvalue" />
              </div>
              <div className="statinfo">
                <h1>{info.clients || 0}</h1>
                <h4>Total Clients</h4>
              </div>
            </div>
          </div>

          {/* ===== Charts Section ===== */}
          <div className="charts">
            {/* 🟢 Order Summary */}
            <div
              className={`chartValue ${
                visible.orderSummary ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="chartTitle">
                <h4>Order Summary</h4>
                <select value={range} onChange={(e) => setRange(e.target.value)}>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              <hr className="divider" />
              <div className="chartstat">
                <div className="statcval">
                  <h3>{summary.served || 0}</h3>
                  <h4>Served</h4>
                </div>
                <div className="statcval">
                  <h3>{summary.dineIn || 0}</h3>
                  <h4>Dine In</h4>
                </div>
                <div className="statcval">
                  <h3>{summary.takeaway || 0}</h3>
                  <h4>Take Away</h4>
                </div>
              </div>

              <div className="donut-container">
                <div className="donut-chart">
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="donut-bars">
                  {pieData.map((item, index) => (
                    <div key={item.name} className="bar-item">
                      <div className="bar-label">
                        {item.name} ({getPercentage(item.value)}%)
                      </div>
                      <div className="bar-bg">
                        <div
                          className="bar-fill"
                          style={{
                            width: `${getPercentage(item.value)}%`,
                            backgroundColor: COLORS[index],
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 💹 Revenue Chart */}
            <div
              className={`chartValue ${
                visible.revenueChart ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="chartTitle">
                <h4>Revenue (Weekly)</h4>
              </div>
              <hr className="divider" />
              <div style={{ width: "100%", height: 270 }}>
                <ResponsiveContainer>
                  <LineChart
                    data={revenueData}
                    margin={{ top: 50, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis tickFormatter={formatRevenue} />
                    <Tooltip formatter={(value) => `₹${formatRevenue(value)}`} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#5B5B5B"
                      strokeWidth={3}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* 🍽 Tables */}
            <div
              className={`chartValue ${
                visible.tables ? "clear-section" : "blur-section"
              } ${!somethingMatched && "clear-section"}`}
            >
              <div className="tableoption">
                <h4>Tables</h4>
                <div className="optionclass">
                  <div className="colorg"></div>Reserved
                  <div className="colorw"></div>Available
                </div>
              </div>
              <hr className="divider" />
              <TableCard />
            </div>
          </div>

           {/* 🪑 Final Chefs Table (ALWAYS VISIBLE) */}
          <div className="clear-section">
            <Tables />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
