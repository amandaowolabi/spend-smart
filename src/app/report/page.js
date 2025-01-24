"use client";

import { useState, useEffect } from "react";
import { FaChartBar } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend
} from "chart.js";

import Nav from "../components/navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function format_currency(amount) {
  return `₦${parseFloat(amount).toLocaleString()}`;
}

export default function Report() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState("");
  const [budget, setBudget] = useState("");
  const [totalExpense, setTotalExpense] = useState(0);
  const [categoryExpense, setCategoryExpense] = useState({});
  const [remainingBudget, setRemainingBudget] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    const storedExpenses = localStorage.getItem("expenses");
    const storedIncome = localStorage.getItem("income");
    const storedBudget = localStorage.getItem("budget");

    setExpenses(storedExpenses ? JSON.parse(storedExpenses) : []);
    setIncome(storedIncome || "");
    setBudget(storedBudget || "");
  }, []);

  useEffect(() => {
    let total = 0;
    let categoryData = {};

    expenses.forEach((expense) => {
      total += parseFloat(expense.amount);

      if (categoryData[expense.category]) {
        categoryData[expense.category] += parseFloat(expense.amount);
      } else {
        categoryData[expense.category] = parseFloat(expense.amount);
      }
    });

    setTotalExpense(total);
    setCategoryExpense(categoryData);

    const remaining = budget ? parseFloat(budget) - total : 0;
    setRemainingBudget(remaining);

    const calculatedSavings = income && budget ? parseFloat(income) - parseFloat(budget) : 0;
    setSavings(calculatedSavings);
  }, [expenses, budget, income]);

  const chartData = {
    labels: Object.keys(categoryExpense), 
    datasets: [
      {
        label: "Expense Amount",
        data: Object.values(categoryExpense), 
        backgroundColor: "rgba(75, 192, 192, 0.5)", 
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <main className=" text-black flex flex-col bg-gray-50">
      <div className="p-5  bg-white shadow-lg rounded-lg m-4">
        <div className="flex justify-between items-center">
          <h3 className="text-4xl font-bold text-gray-800">Expense Report</h3>
          <FaChartBar className="text-4xl text-green-600" />
        </div>

        <div className="mt-6">
          <div className="flex justify-left text-xl font-semibold text-gray-700">
            <span>Total Income: {format_currency(income)}</span>
          </div>
          <div className="flex justify-left text-xl font-semibold text-gray-700 mt-3">
            <span>Total Expenses: {format_currency(totalExpense)}</span>
          </div>
          <div className="flex justify-left text-xl font-semibold text-gray-700 mt-3">
            <span>Budget: {format_currency(budget)}</span>
          </div>
          <div className="flex justify-left text-xl font-semibold text-gray-700 mt-3">
            <span>Remaining Budget: {format_currency(remainingBudget)}</span>
          </div>
          <div className="flex justify-left text-xl font-semibold text-gray-700 mt-3">
            <span>Savings: {format_currency(savings)}</span>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-3xl font-semibold text-gray-800">Expenses by Category</h4>
          <div className="mt-4" style={{ height: "400px", width: "100%" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: { display: true, text: "Expenses by Category", font: { size: 18, weight: "bold" } },
                  tooltip: {
                    callbacks: {
                      label: function (tooltipItem) {
                        return `${tooltipItem.label}: ${format_currency(tooltipItem.raw)}`;
                      },
                    },
                  },
                },
                maintainAspectRatio: false,
                scales: {
                  y: {
                    ticks: {
                      beginAtZero: true,
                      font: { size: 14, weight: "bold" },
                      color: "gray",
                    },
                  },
                  x: {
                    ticks: {
                      font: { size: 14, weight: "bold" },
                      color: "gray",
                    },
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-3xl font-semibold text-gray-800">All Expenses</h4>
          <ul className="mt-4 bg-white space-y-2">
            {expenses.length > 0 ? (
              expenses.map((expense, index) => (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-5 rounded-md">
                  <div className="flex gap-4">
                    <span className="font-semibold">{expense.name}</span>
                    <span className="font-semibold text-gray-700">({format_currency(expense.amount)})</span>
                    <span className="italic text-gray-500">[{expense.category}]</span>
                  </div>
                </li>
              ))
            ) : (
              <li className="text-gray-500">No expenses recorded.</li>
            )}
          </ul> 
        </div>
      </div>

      <Nav />
    </main>
  );
}
