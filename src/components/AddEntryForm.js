import React, { useState } from 'react';

const AddEntryForm = ({ onAddEntry }) => {
  const [type, setType] = useState('income');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');  // New category field
  const [error, setError] = useState(''); // State for handling error messages

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation: Check if amount and date are provided
    if (!amount || !date) {
      setError('Please provide a valid date.');
      return; // Exit the function without submitting the form
    }

    // Reset error and submit the entry
    setError('');
    onAddEntry({ type, amount: parseFloat(amount), date, category });
    
    // Clear the form fields after submission
    setAmount('');
    setDate('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Transportation">Transportation</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Insurance">Insurance</option>
          <option value="Dining Out">Dining Out</option>
          <option value="Debt Repayment">Debt Repayment</option>
          <option value="Education">Education</option>
          <option value="Clothing">Clothing</option>
          <option value="Gifts/Donations">Gifts/Donations</option>
          <option value="Miscellaneous">Miscellaneous</option>
        </select>
      </label>
      
      {/* Display error message if the form validation fails */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
    <button type="submit" className="add-entry">Add Entry</button>
  
    </form>
  );
};

export default AddEntryForm;
