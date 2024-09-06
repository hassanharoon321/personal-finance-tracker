import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import AddEntryForm from './components/AddEntryForm';  // Importing AddEntryForm
import FilterBar from './components/FilterBar';  // Importing FilterBar
import { db } from './services/firebaseConfig';  // Import Firestore database
import { collection, getDocs, addDoc } from 'firebase/firestore';  // Import Firestore methods
import './App.css';


function App() {
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const [filteredData, setFilteredData] = useState({ income: [], expense: [] });

  // Fetch data from Firestore when the component mounts
  useEffect(() => {
    fetchIncomeData();
    fetchExpenseData();
  }, []);

  // Function to fetch income data from Firestore
  const fetchIncomeData = async () => {
    const incomeSnapshot = await getDocs(collection(db, 'income'));  // Use getDocs to retrieve the collection
    const incomeArray = incomeSnapshot.docs.map(doc => doc.data());  // Map through the documents
    setIncomeData(incomeArray);
    setFilteredData(prev => ({ ...prev, income: incomeArray }));
  };

  // Function to fetch expense data from Firestore
  const fetchExpenseData = async () => {
    const expenseSnapshot = await getDocs(collection(db, 'expense'));  // Use getDocs to retrieve the collection
    const expenseArray = expenseSnapshot.docs.map(doc => doc.data());  // Map through the documents
    setExpenseData(expenseArray);
    setFilteredData(prev => ({ ...prev, expense: expenseArray }));
  };

  // Function to add a new entry to Firestore
  const handleAddEntry = async (entry) => {
    if (entry.type === 'income') {
      const newIncomeEntry = { date: entry.date, amount: parseFloat(entry.amount) };
      await addDoc(collection(db, 'income'), newIncomeEntry);  // Use addDoc to add to Firestore
      setIncomeData(prev => [...prev, newIncomeEntry]);
      setFilteredData(prev => ({ ...prev, income: [...prev.income, newIncomeEntry] }));
    } else {
      const newExpenseEntry = { date: entry.date, amount: parseFloat(entry.amount) };
      await addDoc(collection(db, 'expense'), newExpenseEntry);  // Use addDoc to add to Firestore
      setExpenseData(prev => [...prev, newExpenseEntry]);
      setFilteredData(prev => ({ ...prev, expense: [...prev.expense, newExpenseEntry] }));
    }
  };

  const handleFilter = ({ filterType, startDate, endDate }) => {
    const filterByType = (data, type) => type === 'all' ? data : data.filter(item => item.type === type);

    const filterByDate = (data) => {
      return data.filter((item) => {
        const date = new Date(item.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;
        return (!start || date >= start) && (!end || date <= end);
      });
    };

    setFilteredData({
      income: filterByDate(filterByType(incomeData, filterType === 'income' ? 'income' : 'all')),
      expense: filterByDate(filterByType(expenseData, filterType === 'expense' ? 'expense' : 'all')),
    });
  };

  return (
    <div className="container">
    <h1 className="stylish-heading">Personal Finance Tracker</h1>
      <FilterBar onFilter={handleFilter} />
      <AddEntryForm onAddEntry={handleAddEntry} />
      <Dashboard incomeData={filteredData.income} expenseData={filteredData.expense} />
    </div>
  );
}

export default App;
