import React, { useState } from "react";
import { Button, TextField, Box, Typography, Container } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { register } from "../service/auth";
import { Link } from "react-router-dom";
import { Register } from "../store/actions/authAction";
// import { ToastContainer, toast } from "react-toastify";

export default function SignUp() {
  // const [error, setError] = useState(false);
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username")?.toString() || "",
      email: data.get("email")?.toString() || "",
      password: data.get("password")?.toString() || "",
      confirmPassword: data.get("confirmPassword")?.toString() || "",
    };
    const res: any = await register(formData);
    // console.log(res, "register")
    if (!res.error) {
      // toast("Account Created Successfully");
      dispatch(Register())
      navigate("/login", { replace: true });
    } else {
      const errArray = res.error;
      // setError(true);

      setUsernameError("");
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      typeof errArray !== "string" &&
        errArray?.forEach((err: any) => {
          if (err.includes("username")) setUsernameError(err);
          if (err.includes("email")) setEmailError(err);
          if (err.includes("password") && !err.includes("confirmed"))
            setPasswordError(err);
          if (err.includes("confirmed")) setConfirmPasswordError(err);
        });
      if (errArray.includes("username")) setUsernameError(errArray);
      if (errArray.includes("email")) setEmailError(errArray);
      if (errArray.includes("password") && !errArray.includes("confirmed"))
        setPasswordError(errArray);
      if (errArray.includes("confirmed")) setConfirmPasswordError(errArray);
      // toast.error("There were errors in your submission");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      {/* <ToastContainer /> */}
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          SignUp
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!usernameError}
            helperText={usernameError}
            margin="normal"
            required
            fullWidth
            id="username"
            label="UserName"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            error={!!emailError}
            helperText={emailError}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
          />
          <TextField
            error={!!passwordError}
            helperText={passwordError}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <TextField
            error={!!confirmPasswordError}
            helperText={confirmPasswordError}
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            SignUp
          </Button>
        </Box>
        <Link to={"/login"}>Have an account?<Typography component={"span"} sx={{textDecoration: "underLine", color: "Highlight"}}>login</Typography></Link>
      </Box>
    </Container>
  );
}
