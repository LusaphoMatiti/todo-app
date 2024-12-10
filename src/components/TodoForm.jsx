import React, { useState } from "react";
import { createNewTask } from "../utils/api";
import { useMutation, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TodoForm = () => {
  const [newTask, setNewTask] = useState(""); // Set a new Task
  const [date, setDate] = useState(""); // Set the date of the task
  const [todo, setTodo] = useState([]); // Track local tasks

  // Create a new task
  const createMutation = useMutation({
    mutationFn: createNewTask,
    onSuccess: (newTask) => {
      const updatedTodo = [...todo, newTask];
      setTodo(updatedTodo);
      queryClient.invalidateQueries({
        queryKey: ["taskList"],
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    createMutation.mutate(
      {
        title: newTask,
        completed: false,
        created_at: date,
      },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
    setNewTask("");
    setDate("");
  };
  return (
    <>
      <div
        className=" h-screen flex flex-col justify-center items-center bg-gray-800  "
        id="newtask"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-gray-200 mb-6 md:mb-10 text-center">
          Set a new task
        </h2>

        <form
          className="space-y-4 md:space-y-6 max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
            <label className="block mb-2 text-base md:text-lg font-semibold text-gray-100">
              Task:
            </label>
            <input
              type="text"
              value={newTask}
              name="newTask"
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter task title"
              className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 md:p-4 transition duration-200 ease-in-out hover:bg-gray-600"
              required
            />
          </div>
          <div className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
            <label className="block mb-2 text-base md:text-lg font-semibold text-gray-100">
              Date:
            </label>
            <input
              type="text"
              value={date}
              name="date"
              onChange={(e) => setDate(e.target.value)}
              placeholder="Enter yyyy-mm-dd"
              className="bg-gray-700 border border-gray-600 text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4 transition duration-200 ease-in-out hover:bg-gray-600"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg px-4 py-2 pb-4 md:px-6 md:py-3 transition duration-200 ease-in-out"
          >
            Add Task
          </button>
        </form>
      </div>
    </>
  );
};
export default TodoForm;
