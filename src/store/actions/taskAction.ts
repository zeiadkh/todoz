import task, { Task } from "../../service/tasks";

export const ADD_TASK = "ADD_TASK";
export const DELETE_TASK = "DELETE_TASK";
export const TOGGLE_COMPLETE = "TOGGLE_COMPLETE";
export const UPDATE_TASK = "UPDATE_TASK";
export const GET_TASKS = "GET_TASKS";


interface Tasks extends Array<Task> {}
export const getTasks = (tasks: Tasks) => ({
  type: GET_TASKS,
  payload: tasks,
});
export const addTask = (task: Task) => ({
  type: ADD_TASK,
  payload: task,
});

export const deleteTask = (taskId: number) => ({
  type: DELETE_TASK,
  payload: taskId,
});

export const toggleComplete = (taskId: number) => ({
  type: TOGGLE_COMPLETE,
  payload: taskId,
});

export const updateTask = (taskId: number, updatedTask: any) => ({
  type: UPDATE_TASK,
  payload: { taskId, updatedTask },
});

export const fetchTasks = () => async (dispatch: any) => {
  try {
    const response = await task.getTasks();
    // console.log(response)
    dispatch(getTasks(response));
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message);
  }
};

export const toggleTask = (taskData: Task, id: number) => async (dispatch: any) =>{
  try {
    // console.log(taskData)
    const response = task.updateTask(taskData, id)
    dispatch({type: TOGGLE_COMPLETE, payload: id})
    const data = await response
    // console.log(data, "from toggle action")
  } catch (error) {
    console.log(error)
  }
}

export const removeTask = (id: number) => async (dispatch:any )=>{
  try {
    const response = task.deleteTask(id)
    dispatch({type: DELETE_TASK, payload: id})
    
  } catch (error) {
    console.log(error , "remove task err")
    throw new Error(error)
  }
}

