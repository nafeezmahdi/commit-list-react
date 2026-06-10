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

const parseTagsInput = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  return tags
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};

const normalizeTags = (tags) => {
  if (!tags?.length) return [];
  return tags.map((t, i) =>
    typeof t === "string" ? { tag_id: i + 1, name: t } : t,
  );
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
        title: todo.title || "Untitled Task",
        description: todo.description || "",
        todo_id: todo._id,
        due_date: todo.dueDate || todo.due_date || "",
        assignee: todo.assignee || "",
        category: todo.category || "",
        tags: normalizeTags(todo.tags),
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
        assignee: todoData.assignee?.trim() || "Unassigned",
        category: todoData.category?.trim() || "None",
        tags: parseTagsInput(todoData.tags),
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
        assignee: updatedData.assignee?.trim() || "Unassigned",
        category: updatedData.category?.trim() || "None",
        tags: parseTagsInput(updatedData.tags),
        status: findWord(statusesById, "status", updatedData.status_id),
        priority: findWord(prioritiesById, "level", updatedData.priority_id),
      };
      await axios.put(`${API_URL}/update-todo/${todoId}`, backendData);
      fetchTodos();
    } catch (err) {
      console.error("Error updating todo:", err.message);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${API_URL}/delete-todo/${todoId}`);
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
