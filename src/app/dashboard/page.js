"use client";

import { useState, useEffect } from "react";
import { LuChartPie } from "react-icons/lu";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";
import Nav from "../components/navbar";

function format_currency(amount) {
  return `₦${parseFloat(amount).toLocaleString()}`;
}

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [isSettingIncome, setIsSettingIncome] = useState(false);
  const [isSettingBudget, setIsSettingBudget] = useState(false);
  const [username, setUsername] = useState("");
  const [isSettingName, setIsSettingName] = useState(false);
  const defaultCategories = ["Food", "Transportation", "Entertainment"];
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");
  
  useEffect(() => {
      const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
  
      const allCategories = [
          ...defaultCategories,
          ...savedCategories.map((category) => (category.name ? category.name : category)),
      ];
  
      const uniqueCategories = Array.from(new Set(allCategories));
      setCategories(uniqueCategories);
  }, []);

  useEffect(() => {
    setExpenses(
      localStorage.getItem("expenses")
        ? JSON.parse(localStorage.getItem("expenses"))
        : []
    );
    setIncome(localStorage.getItem("income") || "");
    setBudget(localStorage.getItem("budget") || "");
    setUsername(localStorage.getItem("username") || "");
  }, []);

  const addExpense = () => {
    if (newExpense && newAmount && newCategory) {
      const newExpenseItem = {
        name: newExpense,
        amount: newAmount,
        category: newCategory,
      };

      const existingExpenses =
        JSON.parse(localStorage.getItem("expenses")) || [];

      const updatedExpenses = [...existingExpenses, newExpenseItem];

      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

      if (editingIndex === null) {
        setExpenses([...expenses, newExpenseItem]);
      } else {
        const updatedExpenses = [...expenses];
        updatedExpenses[editingIndex] = newExpenseItem;
        setExpenses(updatedExpenses);
        setEditingIndex(null);

        localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      }
      setShowForm(false);
      setNewExpense("");
      setNewAmount("");
      setNewCategory("");
    }
  };

  const editExpense = (index) => {
    setEditingIndex(index);
    setNewExpense(expenses[index].name);
    setNewAmount(expenses[index].amount);
    setNewCategory(expenses[index].category);
    setShowForm(true);
  };

  const deleteExpense = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  const handleIncomeSubmit = () => {
    if (income) {
      setIsSettingIncome(false);
      localStorage.setItem("income", income);
    }
  };

  const handleBudgetSubmit = () => {
    if (budget) {
      setIsSettingBudget(false);
      localStorage.setItem("budget", budget);
    }
  };

  const handleNameSubmit = () => {
    if (username) {
      setIsSettingName(false);
      localStorage.setItem("username", username);
    }
  };

  
  return (
    <main className="border-l-green-50 h-screen flex flex-col justify-between bg-white">
      <div>
        <div className="flex gap-2 py-3 px-2 bg-green-200  fixed w-full">
          <div className="bg-[#34A853] py-2 px-4 rounded-xl">
            <LuChartPie className="text-3xl text-white" />
          </div>

          <div className="flex items-center justify-between w-full">
            <h3 className="text-black my-auto text-2xl font-times font-normal">
              SpendSmart
            </h3>

            {!username ? (
              <button
                onClick={() => setIsSettingName(true)}
                className="bg-blue-500 text-white py-2 px-4 rounded-xl"
              >
                Add name
              </button>
            ) : (
              <span className="bg-blue-500 text-white py-2 px-4 rounded-xl">
                Hi, {username}!
              </span>
            )}
          </div>
        </div>

        {isSettingName && (
          <div className="mt-4 space-y-4 max-w-md w-full mx-auto">
            <div>
              <label className="block text-xl font-medium text-gray-700">
                Enter Your Name
              </label>
              <input
                className="mt-10 border border-gray-300 rounded-md w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
                type="text"
                placeholder="Your name..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={handleNameSubmit}
                className="w-full bg-blue-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-blue-600 transition"
              >
                Set Name
              </button>
            </div>
          </div>
        )}

        <div className=" mt-[4rem] bg-white
          p-8">
          <div className="flex bg-white justify-between gap-6 text-2xl h-28  w-full ">
            <button
              onClick={() => setIsSettingIncome(true)}
              className="bg-green-500 text-white  max-w-36 rounded-xl"
            >
              {income ? ` Income: 
               ${format_currency(income)}` : "Set Income"}
            </button>
            <button
              onClick={() => setIsSettingBudget(true)}
              className="bg-yellow-500 max-w-36 text-white  rounded-xl"
            >
              {budget ? `Budget: ${format_currency(budget)}` : "Set Budget"}
            </button>
          </div>
        </div>

        {isSettingIncome && (
          <div className="px-2 space-y-4 max-w-md w-full mx-auto">
            <div>
              <label className="block text-xl font-medium text-black">
                Income Amount
              </label>
              <input
                className="border w-full border-gray-300 rounded-md text-black p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
                type="number"
                placeholder="Enter income amount..."
                value={income}
                onChange={(e) => setIncome(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={handleIncomeSubmit}
                className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
              >
                Set Income
              </button>
            </div>
          </div>
        )}

        {isSettingBudget && (
          <div className="px-2 py-5 space-y-4 max-w-md w-full mx-auto">
            <div>
              <label className="block text-xl font-medium text-black">
                Budget Amount
              </label>
              <input
                className="border border-gray-300 rounded-md text-black w-full p-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
                type="number"
                placeholder="Enter budget amount..."
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
            </div>
            
            <div>
              <button
                onClick={handleBudgetSubmit}
                className="w-full bg-yellow-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-yellow-600 transition"
              >
                Set Budget
              </button>
            </div>
          </div>
        )}

        <div className="p-4 py-4">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl text-black font-semibold ">Expenses</h4>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-500 text-white py-2 px-4 rounded-xl"
            >
              Add Expense
            </button>
          </div>

          {showForm && (
            <div className="mt-4 bg-white space-y-4 max-w-md w-full mx-auto">
              <div>
                <label className="block text-black text-xl font-medium text-black-700">
                  Expense Name
                </label>
                <input
                  className="border border-gray-300 rounded-md w-full p-2 text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
                  type="text"
                  placeholder="Enter expense name..."
                  value={newExpense}
                  onChange={(e) => setNewExpense(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xl font-medium  text-black ">
                  Amount
                </label>
                <input
                  className="border border-gray-300 rounded-md w-full p-2  text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
                  type="number"
                  placeholder="Enter amount..."
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-black">
                  Category
                </label>
                <select
                  className="border border-gray-300 rounded-md w-full p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-green-500 text-xl"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <button
                  onClick={addExpense}
                  className="w-full bg-green-500 text-white py-2 rounded-md flex items-center justify-center hover:bg-green-600 transition"
                >
                  <FiPlusCircle className="mr-2 text-xl" />
                  {editingIndex === null ? "Add Expense" : "Update Expense"}
                </button>
              </div>
            </div>
          )}

          {expenses.length > 0 ? (
            <ul className="mt-7 ">
              {expenses.map((expense, index) => (
                <li
                  key={index}
                  className="flex justify-between p-2 items-center text-lg mb-2 text-black border-b pb-2"
                >
                  <span>{expense.name}</span>
                  <span>{format_currency(expense.amount)}</span>
                  <span>{expense.category}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editExpense(index)}
                      className="text-blue-500 "
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteExpense(index)}
                      className="text-red-500 "
                    >
                      <FaRegTrashAlt/>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 mt-28 px-24">No expenses added yet.</p>
          )}
        </div>
      </div>
      <Nav />
    </main>
  );
}
