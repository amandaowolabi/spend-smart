"use client";

import { useState, useEffect } from "react";
import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";
import Nav from "../components/navbar";

function format_currency(amount) {
  return `₦${parseFloat(amount).toLocaleString()}`;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [newExpense, setNewExpense] = useState("");
  const [newAmount, setNewAmount] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);

  // Initialize categories from localStorage or set default values
  useEffect(() => {
    const savedCategories = JSON.parse(localStorage.getItem("categories"));
    if (savedCategories && savedCategories.length > 0) {
      setCategories(savedCategories);
    } else {
      const defaultCategories = [
        { id: 1, name: "Food" },
        { id: 2, name: "Transportation" },
        { id: 3, name: "Entertainment" },
      ];
      setCategories(defaultCategories);
      localStorage.setItem("categories", JSON.stringify(defaultCategories));
    }
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      localStorage.setItem("categories", JSON.stringify(categories));
    }
  }, [categories]);

  const addCategory = () => {
    if (newCategory.trim()) {
      const newCategoryItem = { id: Date.now(), name: newCategory };
      setCategories((prevCategories) => [...prevCategories, newCategoryItem]);
      setNewCategory("");
    }
  };

  const deleteCategory = (id) => {
    const updatedCategories = categories.filter((cat) => cat.id !== id);
    setCategories(updatedCategories);
  };

  const editCategory = (id, name) => {
    setEditingCategory(id);
    setNewCategory(name);
  };

  const saveCategory = () => {
    if (newCategory.trim()) {
      const updatedCategories = categories.map((cat) =>
        cat.id === editingCategory ? { ...cat, name: newCategory } : cat
      );
      setCategories(updatedCategories);
      setEditingCategory(null);
      setNewCategory("");
    }
  };

  const addExpense = () => {
    if (newExpense && newAmount && newCategory) {
      const newExpenseItem = {
        name: newExpense,
        amount: newAmount,
        category: newCategory,
      };
      const existingExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
      localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newExpenseItem]));
      setNewExpense("");
      setNewAmount("");
      setNewCategory("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-8 flex-grow">
        <h1 className="text-3xl font-bold text-black mb-6">Manage Categories</h1>

        <div className="mb-6 text-lg ">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="New Category"
            className="border text-black border-gray-300 rounded-md p-2 w-full mb-4"
          />
          <button
            onClick={editingCategory ? saveCategory : addCategory}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
          >
            {editingCategory ? "Save Category" : "Add Category"}
          </button>
        </div>

        <h2 className="text-2xl text-black font-semibold mb-4">Categories</h2>
        <ul className="space-y-2 text-xl">
          {categories.length > 0 ? (
            categories.map((category) => {
              const categoryExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
              const expensesForCategory = categoryExpenses.filter(
                (expense) => expense.category === category.name
              );

              return (
                <li key={category.id} className="flex flex-col bg-gray-100 p-3 text-black rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">{category.name}</div>
                    <div className="flex gap-2 ml-auto">
                      <button
                        onClick={() => editCategory(category.id, category.name)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <FaRegEdit />
                      </button>
                      <button
                        onClick={() => deleteCategory(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaRegTrashAlt />
                      </button>
                    </div>
                  </div>

                  <ul className="text-black mt-2 ml-4">
                    {expensesForCategory.length > 0 ? (
                      expensesForCategory.map((expense, index) => (
                        <li key={index} className="text-gray-700">
                          {expense.name} - {format_currency(expense.amount)}
                        </li>
                      ))
                    ) : (
                      <div>No expenses added yet.</div>
                    )}
                  </ul>
                </li>
              );
            })
          ) : (
            <div>No categories added yet.</div>
          )}
        </ul>
      </div>

      <Nav />
    </div>
  );
}
