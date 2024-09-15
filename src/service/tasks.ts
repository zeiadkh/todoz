import axios from "axios";
import { API_URL } from "./auth";
import Cookies from "js-cookie";
// useRoutes
const token = Cookies.get("token");
export type Task = {
  id?: number;
  title?: string;
  description?: string;
  category?: string;
  dueDate?: string;
  completed?: boolean;
};
// const dispsatch = useDispatch()
export const getTasks = async () => {
  try {
    const response = await axios.get(`${API_URL}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("getTasks response:", response.data);

    return response.data;
  } catch (error) {
    console.error("Error in getTasks:", error);
    throw error;
  }
};

export const createTask = async (taskData: Task) => {
// const navigate = useNavigate()
  
  try {
    // console.log(token, "from service");
    const response = await axios.post(`${API_URL}/tasks/`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("createTask response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in createTask:", error);
    throw error;
  }
};

export const updateTask = async (taskData: Task, id: number) => {
  // console.log(id, "from update ");
  try {
    // console.log(taskData, "from update task")
    const response = await axios.put(`${API_URL}/tasks/${id}`, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("updateTask response:", response.data);

    return response.data;
  } catch (error: any) {
    // console.error("Error in updateTask:", error);
    throw new Error (error);
  }
};

export const deleteTask = async (id: number) => {
  try {
    
    const response = await axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log("deleteTask response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error in deleteTask:", error);
    throw error;
  }
};

const task = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};

export default task;
