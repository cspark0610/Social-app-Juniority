import React from "react";
import useStyles from "./styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Button, TextField } from "@material-ui/core";

const PasswordRecovery = () => {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Grid container justify="center">
        <Grid item className={classes.card}>
          <Typography variant="h6">Recuperar tu cuenta</Typography>
          <hr style={{ margin: 10 }} />
          <Typography variant="body1">
            Ingrese su correo electronico para poder buscar su cuenta:
          </Typography>
          <TextField
            id="outlined-search"
            label="Search... "
            type="search"
            variant="outlined"
            placeholder="example@gmail.com"
            margin="dense"
          />
          <hr style={{ margin: 10 }} />
          <div style={{ textAlign: "end", marginTop: 20 }}>
            <Button variant="outlined" color="primary">
              Buscar
            </Button>{" "}
            <Button variant="outlined" color="secondary">
              Cancelar
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
export default PasswordRecovery;
