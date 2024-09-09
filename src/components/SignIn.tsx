import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import {Link} from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { login } from "../service/auth";
import { useDispatch } from "react-redux";
import { Login } from "../store/actions/authAction";
import { useNavigate } from "react-router";
import Cookies from "js-cookie"

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      username: data.get("username")?.toString() || "",
      password: data.get("password")?.toString() || "",
    };
    // console.log(formData);
    const res = await login(formData);
    // console.log("submitted");
    dispatch(Login(res.token));
    res.token && Cookies.set('token', res.token, {expires: 3})
    // console.log(useSelector(state => state.auth))
    // document.cookie = `token = ${res.token}`;

    navigate("/", { replace: true });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
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
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="text"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container sx={{justifyContent: "center"}}>
            <Grid item >
              <Link to="/register" >
                Don't have an account? <Typography component="span" color="Highlight" sx={{textDecoration: "underline"}}>Sign Up"</Typography>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
