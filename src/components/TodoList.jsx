import { fetchTasks, editTask, deleteTask } from "../utils/api";
import { useQuery, QueryClient, useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

const queryClient = new QueryClient();

const TodoList = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const [completionTime, setCompletionTime] = useState({}); // Stores completion time per task
  const [date, setDate] = useState("");
  const [isDone, setIsDone] = useState([]); // Tracks completed tasks

  const [editingTaskId, setEditingTaskId] = useState(""); // To track which task is being edited

  const [editedTaskTitle, setEditedTaskTitle] = useState(""); // To store the new title for the task
  const [todo, setTodo] = useState([]); // Track local tasks

  // All of the task

  const {
    data: tasks = [],
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery({
    queryKey: ["taskList"],
    queryFn: fetchTasks,
    onSuccess: (data) => {
      console.log("Fetch tasks:", data);
    },
  });

  // Edit a task
  const editMutation = useMutation({
    mutationFn: editTask,
    onSuccess: (updatedTodo) => {
      const updatedTodos = todo.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
      setTodo(updatedTodo);
      queryClient.invalidateQueries({
        queryKey: ["taskList"],
      });
      refetch();
      setEditedTaskTitle(null); // Reset editing task ID
      setEditedTaskTitle(""); // Clear edited title
    },
  });

  const handleEdit = (id, title, taskDate) => {
    // Set the editing task ID and title
    setEditingTaskId(id);
    setEditedTaskTitle(title || "");
    setDate(taskDate);
  };

  const handleEditSubmit = (e, id) => {
    e.preventDefault();

    //  Find the current task to retain its created_at if not modified
    const currentTask = tasks.find((task) => task.id === id);

    // Use the existing created_at date if it's not changed (if date input is empty)
    const updatedDate = date || currentTask.created_at;

    editMutation.mutate({
      title: editedTaskTitle,
      created_at: updatedDate,
      id,
    });
    setEditingTaskId(null); // Reset after submission
    setEditedTaskTitle(""); // Clear the title
    setDate("");
  };

  // Delete a task

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: (id) => {
      const updatedTasks = tasks.filter((tasks) => tasks.id !== id);
      setTodo(updatedTasks);
      queryClient.invalidateQueries({
        queryKey: ["taskList"],
      });
      refetch();
    },
  });

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (error) {
    return <p>Error could not fetch data: {error.message}</p>;
  }

  if (isFetching) {
    console.log("Fetching updated tasks...");
  }

  const handleIsDone = (id) => {
    const now = new Date();
    const day = now.toLocaleDateString();
    const hour = now.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isDone.includes(id)) {
      // Remove task from done list and clear completion time
      setIsDone(isDone.filter((taskId) => taskId !== id));
      setCompletionTime((prev) => {
        const newCompletionTime = { ...prev };
        delete newCompletionTime[id];
        return newCompletionTime;
      });
    } else {
      // Mark task as done and record completion time
      setIsDone([...isDone, id]);
      setCompletionTime((prev) => ({
        ...prev,
        [id]: `You completed the task in - ${hour}, ${day}`,
      }));
    }
  };

  return (
    <section className="max-w-screen-lg mt-2 mb-2 pt-10 pb-10 mx-auto p-6  flex flex-col justify-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">
        My Tasks for <span className="text-gray-400">{formattedDate}</span>
      </h2>

      <ul className=" overflow-y-auto max-h-[400px]  space-y-4 md:grid md-cols-2 lg:grid-cols-3 gap-6">
        {tasks.map((task) => (
          <li
            className="mb-18 p-4 sm:p-6  bg-gray-100 rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-transform duration-200"
            key={task.id}
          >
            {editingTaskId === task.id ? (
              <form onSubmit={(e) => handleEditSubmit(e, task.id)}>
                <input
                  type="text"
                  value={editedTaskTitle}
                  onChange={(e) => setEditedTaskTitle(e.target.value)}
                  className="border border-gray-300 rounded-lg p-2 w-full"
                  required
                />
                <div className="mt-4">
                  <button
                    type="submit"
                    className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingTaskId(null)}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p
                  className={`text-lg font-medium ${
                    isDone.includes(task.id) ? "line-through text-gray-500" : ""
                  }`}
                  style={{
                    textDecoration: isDone.includes(task.id)
                      ? "line-through"
                      : "none",
                  }}
                >
                  Task: {task.title}
                </p>

                <div className="flex space-x-2 mt-2">
                  <button
                    className="text-white bg-blue-700 py-1 px-3 rounded-lg hover:bg-blue-800"
                    onClick={() => handleIsDone(task.id)}
                  >
                    {isDone.includes(task.id) ? "Not complete" : "Done"}
                  </button>
                  <button
                    className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-600"
                    onClick={() => handleEdit(task.id, task.title)}
                  >
                    Edit Task
                  </button>
                  <button
                    className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-600"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </button>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-inner border border-gray-200">
                  <p className="text-sm text-gray-700">
                    <strong className="mr-1">Created on:</strong>
                    {task.created_at}
                  </p>
                  {isDone.includes(task.id) && (
                    <p className="text-sm text-green-700 mt-2">
                      <strong className="mr-1">Completed:</strong>
                      {completionTime[task.id]}
                    </p>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TodoList;
