import React from "react";
import useStyles from "./jobsStyle";
import { Paper } from "@material-ui/core"; 
import logoJob from "../assets/juniority.svg";

export default function Jobs() {
  const classes = useStyles();

  return (
    <div className={classes.body}>
      <Paper className={classes.top}>
        <div className={classes.heading}>
          <h4 className={classes.heading}>
            <b>Jobs</b>
          </h4>
        </div>
        <hr />
        <div className={classes.people}>
          <div>
            <h5>
              <b>Productor director</b>
            </h5>
            <h7 className={classes.postu}>Juniority</h7>
            <br />
            <h9>
              <spam>Buenos Aires, Argentina</spam>
            </h9>
          </div>
          <div>
            <img src={logoJob} className={classes.logoJob} />
          </div>
        </div>
        <hr />
        <div className={classes.people}>
           
          <div className={classes.connections}>
            <img
              src="https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG"
              className={classes.logoUserJob}
            />

            <img
              src="https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG"
              className={classes.logoUserJob}
            />
            <img
              src="https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG"
              className={classes.logoUserJob}
            />
            <img
              src="https://www.mundodeportivo.com/r/GODO/MD/p5/MasQueDeporte/Imagenes/2018/10/24/Recortada/img_femartinez_20181010-125104_imagenes_md_otras_fuentes_captura-kcOG-U452531892714hYG-980x554@MundoDeportivo-Web.JPG"
              className={classes.logoUserJob}
            />

<div>
             
               <spam className={classes.textConnections}>18 connections</spam>
           </div>
          </div>
        </div>
      </Paper>
    </div>
  );
}