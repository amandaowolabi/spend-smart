"use client"; 
import { useState, useEffect } from "react";
import { FaRegTrashAlt, FaEdit, FaPlus } from "react-icons/fa";
import Nav from "../components/navbar";

export default function Reminder() {
  const [reminderName, setReminderName] = useState("");
  const [reminderDeadline, setReminderDeadline] = useState("");
  const [reminders, setReminders] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedReminders = localStorage.getItem("reminders");
    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }
  }, []);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("reminders", JSON.stringify(data));
  };

  const addOrUpdateReminder = () => {
    if (reminderName && reminderDeadline) {
      if (editIndex !== null) {
        const updatedReminders = reminders.map((reminder, index) =>
          index === editIndex ? { name: reminderName, deadline: reminderDeadline } : reminder
        );
        setReminders(updatedReminders);
        saveToLocalStorage(updatedReminders);
        setEditIndex(null);
      } else {
        
        const newReminder = { name: reminderName, deadline: reminderDeadline };
        const updatedReminders = [...reminders, newReminder];
        setReminders(updatedReminders);
        saveToLocalStorage(updatedReminders);
      }
      setReminderName("");
      setReminderDeadline("");
    }
  };

  const deleteReminder = (index) => {
    const updatedReminders = reminders.filter((_, i) => i !== index);
    setReminders(updatedReminders);
    saveToLocalStorage(updatedReminders);
  };

  const editReminder = (index) => {
    setReminderName(reminders[index].name);
    setReminderDeadline(reminders[index].deadline);
    setEditIndex(index);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow p-8 bg-gray-100">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-gray-800">Keep Reminders</h1>
          <p className="mt-2 text-xl text-gray-600">
            Anything you want to remember on your expense tracking journey?
          </p>
        </header>

        <section className="mt-8 bg-white p-6 rounded-xl shadow-md max-w-md mx-auto">
          <h2 className="text-2xl text-black font-semibold mb-4">{editIndex !== null ? "Edit Reminder" : "Add a Reminder"}</h2>
          <div className="space-y-4">
            <div>
              <label className=" text-black text-xl font-medium">Title</label>
              <input
                type="text"
                className="w-full p-3 text-black border border-gray-300 rounded-md"
                placeholder="e.g., Bills coming up"
                value={reminderName}
                onChange={(e) => setReminderName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-black text-xl font-medium">Remind me on</label>
              <input
                type="date"
                className="w-full bg-white text-black p-3 border border-gray-300 rounded-md"
                value={reminderDeadline}
                onChange={(e) => setReminderDeadline(e.target.value)}
              />
            </div>
            <button
              onClick={addOrUpdateReminder}
              className="w-full flex items-center justify-center bg-green-500 text-white py-3 rounded-md mt-4"
            >
              <FaPlus className="mr-2" />
              {editIndex !== null ? "Update Reminder" : "Add Reminder"}
            </button>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl text-black font-semibold mb-4">Your Reminders</h2>
          {reminders.length === 0 ? (
            <p className="text-xl text-gray-500">No reminders yet.</p>
          ) : (
            <ul className="space-y-4">
              {reminders.map((reminder, index) => (
                <li key={index} className="bg-white text-black p-4 rounded-xl shadow-md flex justify-between items-center">
                  <div className="space-y-1">
                    <h3 className="text-xl font-semibold">{reminder.name}</h3>
                    <p className="text-sm text-gray-500">Reminder for {reminder.deadline}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => editReminder(index)}
                      className="text-blue-500 hover:text-blue-700 text-xl"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => deleteReminder(index)}
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
      </main>

      <Nav />
    </div>
  );
}
