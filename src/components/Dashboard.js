import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend } from 'recharts';

const Dashboard = ({ incomeData, expenseData }) => {
  // Calculate total income, total expense, and current balance
  const totalIncome = incomeData.reduce((acc, item) => acc + item.amount, 0);
  const totalExpense = expenseData.reduce((acc, item) => acc + item.amount, 0);
  const balance = totalIncome - totalExpense;

  // Helper function to aggregate expenses by category
  const aggregateExpensesByCategory = (data) => {
    const categoryMap = {};
    data.forEach((entry) => {
      const category = entry.category || 'Uncategorized';  // Default to 'Uncategorized' if no category
      if (categoryMap[category]) {
        categoryMap[category] += entry.amount;  // Add the amount to the existing category
      } else {
        categoryMap[category] = entry.amount;   // Initialize the category with the amount
      }
    });
    return Object.keys(categoryMap).map((key) => ({
      name: key,
      value: categoryMap[key],
    }));
  };

  // Aggregate expenses by category for the pie chart
  const expenseCategoryData = useMemo(() => {
    const result = aggregateExpensesByCategory(expenseData);  // Only use expense data for this chart
    console.log(result);  // Debugging the pie chart data
    return result;
  }, [expenseData]);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6384', '#36A2EB', '#FFCE56'];

  // Helper function to render BarCharts
  const renderBarChart = (data, color, title) => (
    <div className="chart-wrapper">
      <h3>{title}</h3>
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
    <div className="dashboard-container">
      {/* Total Income, Total Expense, and Balance Overview */}
      <div className="overview-section stylish-card">
        <h2>Total Overview</h2>
        <div className="totals">
          <h3>Total Income: <span className="positive">${totalIncome}</span></h3>
          <h3>Total Expense: <span className="negative">${totalExpense}</span></h3>
          <h3 className={`balance ${balance >= 0 ? 'positive' : 'negative'}`}>
            Current Balance: ${balance}
          </h3>
        </div>
      </div>
  
      {/* Income and Expense Bar Charts */}
      <div className="charts-section stylish-card">
        {renderBarChart(incomeData, '#82ca9d', 'Income Overview')}
        {renderBarChart(expenseData, '#8884d8', 'Expense Overview')}
      </div>
    </div>
  );
  
};

export default Dashboard;
