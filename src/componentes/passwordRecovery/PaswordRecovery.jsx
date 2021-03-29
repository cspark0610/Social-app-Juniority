import React, { useState } from "react";
import useStyles from "./styles";
import { Button, TextField, Typography, Grid } from "@material-ui/core";
import { auth } from "../../firebase/firebase";
import Alert from "@material-ui/lab/Alert";

const PasswordRecovery = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);

  const handleSearch = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setMessage("success");
      })
      .catch((error) => {
        setMessage("fail");
      });
  };
  return (
    <div className={classes.bg}>
      <Grid container justify="center">
        <Grid item className={classes.card} xs={10} md={8} lg={5}>
          <Typography variant="h6">Recuperar tu cuenta</Typography>
          <hr style={{ margin: 10 }} />
          {message &&
            (message === "success" ? (
              <Alert severity="success">
                Correo enviado exitosamente por favor revise su inbox
              </Alert>
            ) : (
              <Alert severity="error">
                No podemos o encontrar su correo en nuestra base de datos o esta
                mal formateado por favor ingrese el correo nuevamente
              </Alert>
            ))}
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
            onChange={(e) => setEmail(e.target.value)}
            onClick={() => setMessage(false)}
          />
          <hr style={{ margin: 10 }} />
          <div style={{ textAlign: "end", marginTop: 20 }}>
            <Button onClick={handleSearch} variant="outlined" color="primary">
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
