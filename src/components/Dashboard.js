import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const Dashboard = ({ incomeData, expenseData }) => {
  // Calculate total income, total expense, and current balance
  const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenseData.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpense;

  // Helper function to aggregate expenses by category
  const aggregateExpensesByCategory = (data) => {
    const categoryMap = {};
    data.forEach((entry) => {
      const category = entry.category || "Uncategorized"; // Default to 'Uncategorized' if no category
      if (categoryMap[category]) {
        categoryMap[category] += entry.amount; // Add the amount to the existing category
      } else {
        categoryMap[category] = entry.amount; // Initialize the category with the amount
      }
    });
    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  };

  // Aggregate expenses by category for the pie chart
  const expenseCategoryData = useMemo(() => {
    const result = aggregateExpensesByCategory(expenseData); // Only use expense data for this chart
    console.log(result); // Debugging the pie chart data
    return result;
  }, [expenseData]);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
  ];

  // Helper function to render BarCharts
  const renderBarChart = (data, color, title) => (
    <div className="">
      <h3 className="font-bold py-1">{title}</h3>
      <BarChart width={500} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill={color} />
      </BarChart>
    </div>
  );

  return (
    <div className="py-4">
      {/* Total Income, Total Expense, and Balance Overview */}
      <div className="">
        
        <div className="grid md:grid-cols-3 gap-5 items-center py-6 w-1/2">
          <div className="bg-white shadow-lg w-56 h-24 rounded-lg flex flex-col items-center justify-center sm:w-full">
            <h3 className="">Total Income</h3>
            <p className="text-3xl font-bold">${totalIncome}</p>
          </div>

          <div className="bg-white shadow-lg w-56 h-24 rounded-lg flex flex-col items-center justify-center">
            <h3 className="">Total Expense</h3>
            <p className="text-3xl font-bold">${totalExpense}</p>
          </div>

          <div className="bg-white shadow-lg w-56 h-24 rounded-lg flex flex-col items-center justify-center">
            <h3 className="">Current Balance</h3>
            <p
              className={`text-3xl font-bold ${
                balance >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              ${balance}
            </p>
          </div>
        </div>
      </div>

      {/* Income and Expense Bar Charts */}
      <div className="grid md:grid-cols-2 gap-5 items-center py-6">
        <div className="bg-white shadow-lg p-6 rounded-lg w-full">
          {renderBarChart(incomeData, "#21C55D", "Income Overview")}
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg w-full">
          {renderBarChart(expenseData, "#EF4444", "Expense Overview")}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
