import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import "./App.css";
import Dashboard from "./components/Dashboard";
import Layout from "./Layout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { useSelector } from "react-redux";
import SignIn from "./components/SignIn";
import ProtectedRoute from "./components/ProtectedRoute";
import Cookies from "js-cookie";
import Tasks from "./components/Tasks";
import Logout from "./components/Logout";
import { PaletteMode } from "@mui/material";
function App() {
  const theme = useSelector(
    (state: { theme: PaletteMode; auth: object }) => state.theme
  );
  const auth = useSelector((state: { auth: {state: string} }) => state.auth.state);
  const darkTheme = createTheme({
    palette: {
      mode: theme,
    },
  });
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/register" Component={Register}></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute
                authenticated={
                  auth === "LOGIN_Success" || Cookies.get("token")
                    ? true
                    : false
                }
              >
                <Layout>
                  <Tasks />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute
                authenticated={
                  auth === "LOGIN_Success" || Cookies.get("token")
                    ? true
                    : false
                }
              >
                <Layout>
                  <Dashboard />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <ProtectedRoute
                authenticated={
                  auth === "LOGIN_Success" || Cookies.get("token")
                    ? true
                    : false
                }
              >
                <Layout>
                  <Logout />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
