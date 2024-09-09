import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useDispatch, useSelector } from "react-redux";
import { light, dark } from "../store/actions/themeAction";

export default function Theme() {
  const currentTheme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  const theme = useTheme();

  const toggleColorMode = () => {
    if (currentTheme === "light") {
      dispatch(dark());
    } else {
      dispatch(light());
    }
  };
  return (
    <IconButton sx={{ ml: 1 }} color="inherit" onClick={toggleColorMode}>
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  );
}
