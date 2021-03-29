import { createMuiTheme } from "@material-ui/core";
import { orange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3cb4e5",
      light: "#deeff9",
      dark: "65baaf",
      contrastText: "#fff",
    },
  },
});
export default theme;
