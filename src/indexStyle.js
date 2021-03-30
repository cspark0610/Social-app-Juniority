import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3cb4e5",
      // light: "#deeff9",
      // dark: "#65baaf",
      contrastText: "#fff",
    },
    secondary: {
      main: "#deeff9",
      contrastText: "#3cb4e5",
    },
  },
});
export default theme;
