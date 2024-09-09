import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Task, createTask } from "../service/tasks";
import Cookies from "js-cookie";
import {  addTask, fetchTasks } from "../store/actions/taskAction";
import {
  Box,
  Button,
  Modal,
  Typography,
  Input,
} from "@mui/material";
import { useNavigate } from "react-router";
const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  useEffect(() => {
    const userToken = Cookies.get("token") || "";
    dispatch(fetchTasks(userToken));
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const formData: Task = {
        title: data.get("title")?.toString() || "",
        description: data.get("description")?.toString() || "",
        category: data.get("category")?.toString() || "",
        dueDate: data.get("dueDate")?.toString() || "",
      };
      const res = await createTask(formData);
      dispatch(addTask(res))
      set()
      // console.log(open)
      navigate("/", { replace: true });
  }


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const set = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <div className="m-4 p-4 ">
        <button
          type="button"
          onClick={handleOpen}
          className="p-4 rounded-full w-8 h-8 text-center flex justify-center items-center bg-[#90caf9] text-3xl"
        >
          +
        </button>
        <div>
          <Modal
            open={open}
            onClose={set}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Add Task
              </Typography>
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
                ></Input>
                <Input
                  type="text"
                  className="mt-4 border-b border-solid"
                  placeholder="Description"
                  name="description"
                ></Input>
                <Input
                  type="text"
                  className="mt-4 border-b border-solid"
                  placeholder="Category"
                  name="category"
                ></Input>
                <Input
                  type="date"
                  className="my-4 border-b border-solid"
                  name="dueDate"
                ></Input>
                <Button type="submit" variant="contained">
                  Create
                </Button>
              </Box>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
