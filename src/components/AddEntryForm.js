import React, { useState } from "react";

const AddEntryForm = ({ onAddEntry, setOpen }) => {
  const [type, setType] = useState("income");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState(""); // New category field
  const [error, setError] = useState(""); // State for handling error messages

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check if amount and date are provided
    if (!amount || !date) {
      setError("Please provide a valid date.");
      return; // Exit the function without submitting the form
    }

    // Reset error and submit the entry
    setError("");
    onAddEntry({ type, amount: parseFloat(amount), date, category });

    // Clear the form fields after submission
    setAmount("");
    setDate("");
    setCategory("");
    setOpen(false)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mt-4">
      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Type:</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2">Category:</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
        >
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
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-md transition-all duration-200"
      >
        Add Entry
      </button>
    </form>
  );
};

export default AddEntryForm;
