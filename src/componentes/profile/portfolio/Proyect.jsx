import React from "react";
import "./styles.css";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import Fab from "@material-ui/core/Fab";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: 20,
    dispĺay: "flex",
    alignContent: "center",
  },
  media: {
    height: 120,
  },
});
const Proyect = ({title, description, photo, github, link}) => {
  const classes = useStyles();

  return (
    <div>
          <Card className={classes.root}>
            <a target='_blank' href={link}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={photo}
                  title="Contemplative Reptile"
                />
                <CardContent className="backBody">
                  <Typography gutterBottom variant="h5" component="h2">
                    {title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </a>
            <CardActions>
              <a target='_blank' href={github}>
                <Fab variant="small" className="button">
                  <GitHubIcon />
                </Fab>
              </a>
            </CardActions>
          </Card>{" "}
    </div>
  );
};

export default Proyect;
