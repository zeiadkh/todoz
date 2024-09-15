import { Box, Button, Input } from "@mui/material";
import { Task, updateTask } from "../service/tasks";
// import { UPDATE_TASK } from '../store/actions/taskAction';
import { useDispatch } from "react-redux";
import { useState } from "react";
import { updateTask as updateTaskAction } from "../store/actions/taskAction";
interface EditTaskFormProps {
  task: Task;
  open: any;
}

const EditTaskForm = ({ task, open }: EditTaskFormProps) => {
  const [values, setValues] = useState({
    title: task.title,
    description: task.description,
    category: task.category,
    dueDate: task.dueDate,
  });
  const [openState, setOpenState] = useState(true);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const dispatch = useDispatch();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData: Task = {
      title: data.get("title")?.toString() || "",
      description: data.get("description")?.toString() || "",
      category: data.get("category")?.toString() || "",
      dueDate: data.get("dueDate")?.toString() || "",
    };
    const res = await updateTask(formData, task.id as number);
    if (res) setOpenState(false);
    dispatch(updateTaskAction(task.id as number, formData));
  };
  return (
    <>
      {open && openState && (
        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{ mt: 1, display: "flex", flexDirection: "column" }}
        >
          <Input
            type="text"
            className="mt-4 border-b border-solid"
            placeholder="Title"
            name="title"
            value={values.title}
            onChange={handleChange}
          ></Input>
          <Input
            type="text"
            className="mt-4 border-b border-solid"
            placeholder={task.description}
            name="description"
            value={values.description}
            onChange={handleChange}
          ></Input>
          <Input
            type="text"
            className="mt-4 border-b border-solid"
            placeholder="Category"
            name="category"
            value={values.category}
            onChange={handleChange}
          ></Input>
          <Input
            type="date"
            className="my-4 border-b border-solid"
            name="dueDate"
            value={values.dueDate}
            onChange={handleChange}
          ></Input>
          <Button type="submit" variant="contained">
            Update
          </Button>
        </Box>
      )}
    </>
  );
};

export default EditTaskForm;
