# 📊 Stablewatch Holder Type Proportion Chart

A **Next.js + Recharts** project that displays the **change in holder concentration over a 24-hour period**, comparing **EOA (Externally Owned Accounts)** vs **SC (Smart Contracts)** holdings.

---

## 🚀 Features

- **Stacked Area Chart** of EOA vs SC proportions
- **X-axis:** Time (stamp from each data entry)
- **Y-axis:** Proportion of asset held (0 to 100%)
- **Small Balance Filter:**  
  Toggle to exclude EOA balances **< 3 × 10²⁴** per timestamp
- **Total Balance Display:**  
  Shows raw sum of included balances (most recent timestamp)  
  No formatting or scientific notation

---

## 🛠 Technologies

- **Next.js (App Router)**
- **React**
- **Recharts**
- **TypeScript**

---

## 📦 Setup & Run

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Run the project

```bash
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## ⚙️ Project Structure

| File / Folder                        | Purpose                         |
| ------------------------------------ | ------------------------------- |
| `/app/holder-chart/HoldersChart.tsx` | Main chart component            |
| `/utils/processChartData.ts`         | Data processing & filtering     |
| `/types/chart.ts`                    | Type definitions                |
| `/constants/chart.ts`                | Constants (API URL, thresholds) |

---
