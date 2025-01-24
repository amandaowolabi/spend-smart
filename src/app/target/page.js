"use client";

import { useState, useEffect } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import Nav from "../components/navbar";

function format_currency(goalAmount) {
  return `₦${parseFloat(goalAmount).toLocaleString()}`;
}

export default function Targets() {
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [goalDeadline, setGoalDeadline] = useState("");
  const [goals, setGoals] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedGoals = localStorage.getItem("goals");
    if (storedGoals) {
      try {
        setGoals(JSON.parse(storedGoals));
      } catch (error) {
        console.error("Error parsing stored goals:", error);
        setGoals([]);
      }
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem("goals", JSON.stringify(goals));
    }, 200);

    return () => clearTimeout(timer);
  }, [goals]);

  const handleSaveGoal = () => {
    if (goalName && goalAmount && goalDeadline) {
      if (editIndex !== null) {
        const updatedGoals = goals.map((goal, index) =>
          index === editIndex
            ? { name: goalName, amount: goalAmount, deadline: goalDeadline }
            : goal
        );
        setGoals(updatedGoals);
        setEditIndex(null);
      } else {
        const newGoal = { name: goalName, amount: goalAmount, deadline: goalDeadline };
        setGoals([...goals, newGoal]);
      }
      setGoalName("");
      setGoalAmount("");
      setGoalDeadline("");
    }
  };

  const handleEditGoal = (index) => {
    const goal = goals[index];
    setGoalName(goal.name);
    setGoalAmount(goal.amount);
    setGoalDeadline(goal.deadline);
    setEditIndex(index);
  };

  const handleDeleteGoal = (index) => {
    const updatedGoals = goals.filter((_, i) => i !== index);
    setGoals(updatedGoals);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-8 bg-gray-100">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Set Your Targets</h1>
          <p className="mt-2 text-xl text-gray-600">
            Achieve your financial goals by setting targets for savings and spending.
          </p>
        </header>

        <section className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
          <h2 className="text-2xl text-black font-semibold mb-4">
            {editIndex !== null ? "Edit Goal" : "Add a New Goal"}
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-black text-xl font-medium">Goal Name</label>
              <input
                type="text"
                className="w-full p-3 text-black border border-gray-300 rounded-md"
                placeholder="e.g., Save for a vacation"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-black text-xl font-medium">Goal Amount (₦)</label>
              <input
                type="number"
                className="w-full p-3 border border-gray-300 text-black rounded-md"
                placeholder="e.g., 10000"
                value={goalAmount}
                onChange={(e) => setGoalAmount(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-black text-xl font-medium">Deadline</label>
              <input
                type="date"
                className="w-full p-3 border border-gray-300 bg-white text-black rounded-md"
                
                value={goalDeadline}
                onChange={(e) => setGoalDeadline(e.target.value)}
              />
            </div>
            <button
              onClick={handleSaveGoal}
              className="w-full bg-green-500 text-white py-3 rounded-md mt-4 flex items-center justify-center"
            >
              {editIndex !== null ? (
                <>
                  <FaEdit className="mr-2" />
                  Update Goal
                </>
              ) : (
                "Add Goal"
              )}
            </button>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl text-black font-semibold mb-4">Your Goals</h2>
          {goals.length === 0 ? (
            <p className="text-xl text-gray-500">No goals set yet.</p>
          ) : (
            <ul className="space-y-4">
              {goals.map((goal, index) => (
                <li key={index} className="bg-white p-4 rounded-xl shadow-md flex text-black justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{goal.name}</h3>
                    <p className="text-lg text-gray-700">{format_currency(goal.amount)}</p>
                    <p className="text-sm text-gray-500">Deadline: {goal.deadline}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditGoal(index)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(index)}
                      className="text-red-500 hover:text-red-700 text-xl"
                    >
                      <FaRegTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="mt-8 text-center">
          <div className="text-lg text-gray-700">
            <p>Total Goals Set: {goals.length}</p>
          </div>
        </section>
      </main>

      <Nav />
    </div>
  );
}
