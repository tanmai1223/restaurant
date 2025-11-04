# 🍴 Restaurant Dashboard — Full Stack Restaurant Management System

A comprehensive **Restaurant Admin Dashboard** built using **React.js**, where restaurant owners and managers can monitor orders, manage tables, and track performance with real-time analytics.

---

## 🚀 Live Demo  
👉 [Restaurant Dashboard (Netlify)](https://your-restaurant-app-link.netlify.app)  

---

## 🧠 Overview  
This dashboard helps restaurants efficiently manage daily operations — from tracking revenue to managing chefs, orders, and table availability — all in one place.

---

## 🧩 Pages and Features  

### 🧾 1️⃣ Analytics Page  
📊 Overview of all key stats:
- Total **Chefs**, **Revenue**, **Clients**, and **Orders**  
- Donut charts showing **Daily / Weekly / Monthly** status of served, taken, and dine-in orders  
- Line chart for **Daily Revenue Trends**  
- Live **Table Availability Grid**:
  - 🟩 **Green** — Occupied table  
  - ⚪ **White** — Available table  
- **Chef Table View** displaying all chefs and their assigned orders

📸 **Screenshot:**  
<img width="1899" height="879" alt="image" src="https://github.com/user-attachments/assets/367c7524-530b-4daf-91c2-36702c15a4c8" />


---

### 🪑 2️⃣ Tables Page  
🧱 Manage your restaurant tables directly:
- Add new tables with a specified **number of chairs**
- All added tables are fetched from the **MongoDB database**
- Real-time sync with backend  

📸 **Screenshot:**  
<img width="1906" height="858" alt="image" src="https://github.com/user-attachments/assets/83592deb-f73a-45c9-b044-97d281904a40" />


---

### 🧾 3️⃣ Orders Page  
🍽️ Real-time **order management interface**:
- Displays all active and completed orders as **cards**
- Each order card includes:
  - Live **timer** tracking order preparation time  
  - Dynamic **color indicator**
- Fully synced with backend orders API  

📸 **Screenshot:**  
<img width="1901" height="872" alt="image" src="https://github.com/user-attachments/assets/87b95ff0-1955-4d8b-9f83-fc9fab159015" />


---

### 🍕 4️⃣ Items Page  
📦 Displays all items from the database:
- Fetched from backend via REST API  
- Includes item name, category, and availability  
- CRUD-ready for future scalability  

📸 **Screenshot:**  
<img width="1898" height="883" alt="image" src="https://github.com/user-attachments/assets/17c0786a-5b7f-4fbb-b701-92071622de8b" />

---

## 🧰 Tech Stack  

| Layer | Technology |
|-------|-------------|
| Frontend | React.js |
| Styling | CSS3 |
| Charts | Recharts / Chart.js |
| Backend API | Node.js, Express, MongoDB |
| Deployment | Netlify |

---

## ⚙️ Setup Instructions  

```bash
# Clone the repository
git clone https://github.com/htanmai/restaurant.git

# Navigate into folder
cd restaurant

# Install dependencies
npm install

# Run locally
npm run dev
```
## 🔗 Related Repositories

- 👤 User App: [https://github.com/htanmai/user](https://github.com/tanmai1223/user)

- ⚙️ Backend API: [https://github.com/htanmai/backend](https://github.com/tanmai1223/hotelbackend)
  
- 🍽️ Main Full Stack Repo: [https://github.com/htanmai/fullstack](https://github.com/tanmai1223/fullstack)

## 👩‍💻 Author

Hekkadka Tanmai
📧 htanmai.23@gmail.com

