import {
  Alert,
  Badge,
  Box,
  Card,
  Container,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Task, updateTask } from "../service/tasks";
import CheckBox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, toggleComplete } from "../store/actions/taskAction";
import { Delete, Edit } from "@mui/icons-material";
import Dashboard from "./Dashboard";
import { removeTask } from "../store/actions/taskAction";
import EditTaskForm from "./EditTaskForm";
import { makeStyles } from '@mui/styles';
const useStyles = makeStyles(() => ({
  myBadge: {
    minWidth: "max-content"
  },
}));



const TaskComponent = (task: Task) => {
  const classes = useStyles()
  const dispatch = useDispatch();
  // const [state, setState] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  const updateTaskHandler = async () => {
    setOpenForm(true);
  };
  const toggle = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const taskData = { completed: !task.completed };
    const resp = await updateTask(taskData, task.id || -1);
    // console.log(resp);
    // setState(resp);
    dispatch(toggleComplete(resp.id));
  };

  return (
    <Card
      variant="outlined"
      sx={{
        padding: "1rem",
        marginBottom: "1rem",
        boxShadow: "0px 5px 9px -6px rgba(255, 255, 255, 0.57)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <CheckBox checked={task.completed} onChange={toggle} />

        <Typography
          variant="h5"
          color="primary"
          sx={{
            textDecorationLine: task?.completed ? "line-through" : "none",
            textTransform: "capitalize",
          }}
        >
          {task.title}
        </Typography>
      </Box>
      <Typography
        variant="body1"
        color="whitesmoke"
        sx={{
          textDecorationLine: task?.completed ? "line-through" : "none",
          textTransform: "capitalize",
        }}
      >
        {task.description}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem"
        }}
      >
        <Typography variant="h6" color="seagreen" sx={{ marginRight: "3rem" }}>
          {task.dueDate || new Date().toDateString()}
        </Typography>
        <Badge color="primary" classes={{badge: classes.myBadge}} badgeContent={task.category}></Badge>
      </Box>
      <Box sx={{ display: "flex", alignSelf: "end", gap: "1rem" }}>
        <Button
          sx={{ alignSelf: "end", padding: "4px", minWidth: "max-content" }}
          variant="contained"
          color="secondary"
          onClick={updateTaskHandler}
        >
          <Edit titleAccess="edit-task"></Edit>
        </Button>
        {openForm && <EditTaskForm task={task} open={openForm} />}
        <Button
          sx={{ alignSelf: "end", padding: "4px", minWidth: "max-content" }}
          variant="contained"
          color="error"
          onClick={async () => dispatch(removeTask(task.id as number))}
        >
          <Delete titleAccess="remove-task"></Delete>
        </Button>
      </Box>
    </Card>
  );
};

const Tasks = () => {
  const dispatch = useDispatch();
  let { tasks } = useSelector((state: any) => state.tasks);
  tasks = tasks[0] || [];
  const unCompletedTasks: Task[] = [];
  const completedTasks: Task[] = [];
  tasks?.filter((task: Task) =>
    task.completed ? completedTasks.push(task) : unCompletedTasks.push(task)
  );
  // console.log(state)
  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        marginTop: "1rem",
      }}
    >
      {tasks.length < 1 || !tasks ? (
        <Alert severity="error">No Tasks till Now.</Alert>
      ) : (
        unCompletedTasks && (
          <Container>
            <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
              To Do
            </Typography>
            {unCompletedTasks.map((task: Task, index: number) => (
              <TaskComponent
                id={task.id}
                key={index}
                title={task.title}
                description={task.description}
                dueDate={task.dueDate}
                category={task.category}
                completed={task.completed}
              />
            ))}
            <Dashboard />
          </Container>
        )
      )}{" "}
      <Container>
        {completedTasks.length > 0 && (
          <Typography variant="h4" sx={{ marginBottom: "0.5rem" }}>
            Done
          </Typography>
        )}
        {completedTasks.map((task: Task, index: number) => (
          <TaskComponent
            id={task.id}
            key={index}
            title={task.title}
            description={task.description}
            dueDate={task.dueDate}
            category={task.category}
            completed={task.completed}
          />
        ))}
      </Container>
    </Box>
  );
};

export default Tasks;
