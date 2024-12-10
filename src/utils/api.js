import axios from "axios";

const apiUrl = "https://0htx3za724.execute-api.eu-north-1.amazonaws.com/";

const api_url = axios.create({
  baseURL: `${apiUrl}`,
});

// Get all tasks
export const fetchTasks = async () => {
  const fetchData = await api_url.get("/tasks");
  return fetchData.data;
};

// Create a new task
export const createNewTask = async ({ title, completed, created_at }) => {
  const createdTask = await api_url.post("/tasks", {
    title,
    completed,
    created_at,
  });
  return createdTask.data;
};

// Edit a task
export const editTask = async ({ title, created_at, id }) => {
  const editTodo = await api_url.put(`/tasks/${id}`, {
    title,
    created_at,
  });
  return editTodo.data;
};

// Delete a task

export const deleteTask = async (id) => {
  const deletedTask = await api_url.delete(`/tasks/${id}`);
  return deletedTask.data;
};
