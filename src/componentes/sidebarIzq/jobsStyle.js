import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  body: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    marginTop: "15px",
  },
  top: {
    overflow: "hidden",
    borderRadius: 10,
  },
  heading: {
    width: "100%",
    height: 30,
    display: "flex",
    justifyContent: "row",
    alignItems: "center",
    padding: "20px 15px",
  },
  people: {
    display: "flex",
    justifyContent: "row",
    padding: "8px",
    cursor: "pointer",
  },
  logoJob: {
    width: 60,
    height:60,
    marginTop:20
  },
  postu: {
    color: "#3CB4E5",
   },
   logoUserJob:{
    width: 30,
    height:30,
    borderRadius:50,
   },
   connections:{
       display:'flex',
       margin:8
   },
   textConnections:{
       fontSize:12,
       margin:5
   }

});