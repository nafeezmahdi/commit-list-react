import axios from "axios";
import { useState, useEffect } from "react";

import {
  categoriesById,
  prioritiesById,
  statusesById,
  usersById,
} from "../constants/lookupData";

// const API_URL = "http://localhost:5000/api";
const API_URL = "https://commit-list-backend-mongo.vercel.app/api";

const findId = (dict, searchKey, searchValue) => {
  if (!searchValue) return "";
  const foundId = Object.keys(dict).find(
    (key) => dict[key][searchKey] === searchValue,
  );
  return foundId || "";
};

// Helper 2: Find Word from ID
const findWord = (dict, searchKey, id) => {
  if (!id || !dict[id]) return "";
  return dict[id][searchKey];
};

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/todos`);
      // console.log("Fetched todos:", response.data);
      const rawData = response.data.data || response.data;
      const adaptedTodos = rawData.map((todo) => ({
        ...todo,
        title: todo.title || "Untitled Task", // <--- ADD THIS SAFETY NET
        description: todo.description || "",
        todo_id: todo._id,
        due_date: todo.dueDate || "",
        user_id: findId(usersById, "name", todo.assignee),
        category_id: findId(categoriesById, "name", todo.category),
        status_id: findId(statusesById, "status", todo.status),
        priority_id: findId(prioritiesById, "level", todo.priority),
      }));
      setTodos(adaptedTodos);
    } catch (err) {
      console.error("Error fetching todos:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (todoData) => {
    try {
      const backendData = {
        title: todoData.title,
        description: todoData.description,
        dueDate: todoData.due_date,
        assignee: findWord(usersById, "name", todoData.user_id) || "Unassigned",
        category:
          findWord(categoriesById, "name", todoData.category_id) || "None",
        status:
          findWord(statusesById, "status", todoData.status_id) || "Pending",
        priority:
          findWord(prioritiesById, "level", todoData.priority_id) || "Medium",
      };
      await axios.post(`${API_URL}/add-todo`, backendData);
      fetchTodos();
    } catch (err) {
      console.error("Error creating todo:", err.message);
    }
  };

  const updateTodo = async (todoId, updatedData) => {
    try {
      const backendData = {
        title: updatedData.title,
        description: updatedData.description,
        dueDate: updatedData.due_date,
        assignee: findWord(usersById, "name", updatedData.user_id),
        category: findWord(categoriesById, "name", updatedData.category_id),
        status: findWord(statusesById, "status", updatedData.status_id),
        priority: findWord(prioritiesById, "level", updatedData.priority_id),
      };
      await axios.put(`${API_URL}/todos/${todoId}`, backendData);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_URL}/todos/${todoId}`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  const deleteAllTodos = async () => {
    try {
      await axios.delete(`${API_URL}/delete-all-todos`);
      fetchTodos();
    } catch (err) {
      console.error("Error deleting all todos:", err.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    loading,
    fetchTodos,
    addTodo,
    updateTodo,
    deleteTodo,
    deleteAllTodos,
  };
}
