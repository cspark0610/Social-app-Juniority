import { makeStyles } from '@material-ui/core/styles';

 

export default makeStyles((theme) => ({
    grow: {
      flexGrow: 1,
      background: "linear-gradient(180deg, #162D27 30%, #263D37 90%)",
      // background: "linear-gradient(45deg, #B4DCD6 30%, #3CB4E5 90%)",
      color: "#B4DCD6",
      // boxShadow: '0 3px 5px 2px #3CB4E5',
   
    },   
   
    
    sectionDesktop: {
      display: "none",
      [theme.breakpoints.up("md")]: {
        display: "flex",
      },
    },
    sectionMobile: {
      display: "flex",
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
  }));

