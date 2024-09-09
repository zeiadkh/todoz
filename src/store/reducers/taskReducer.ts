import { Task } from "../../service/tasks";
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS,
  TOGGLE_COMPLETE,
  UPDATE_TASK,
} from "../actions/taskAction";

const initialState = {
  tasks : [],
};

const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_TASKS:
      return {
        tasks: [action.payload],
      };
    case ADD_TASK:
     { 
      // console.log(action.payload, state, "from add task")
      const old: [] = state.tasks[0]
      const allTasks = [...old, action.payload]
      return {
        ...state,
        tasks:[allTasks]
      };}
    case DELETE_TASK:
      return {
        ...state,
        tasks: [
          state.tasks[0].filter((task: Task) => task.id != action.payload),
        ],
      };
    case TOGGLE_COMPLETE: {
      const toggledTask = state?.tasks[0].map((task: Task) => {
        return task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task;
      });
      return {
        tasks: [[...toggledTask]],
      };
    }
    case UPDATE_TASK: {
      const { taskId, updatedTask } = action.payload;
      
      return {
        ...state,
        tasks: [state.tasks[0].map((task: Task) =>{
          return task?.id === taskId ? {...task, ...updatedTask} : task
        })],
      };
    }
    default:
      return state;
  }
};

export default tasksReducer;
