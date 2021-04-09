import React from 'react';
import { Grid } from '@material-ui/core';
import "./styles.css";

export const Portfolio = () => {
    return (
        <div className="portfolio">
            <h1 className="portfolio_title">Portfolio</h1>
            <hr className="line__profile__widget"/>
        <Grid container >
        <Grid item md={6} className="text__aling__left text__aling">
        <img className="porfolio__img" src="https://bunkerdb.com/blog/wp-content/uploads/2020/07/Low-code-No-code.jpg"alt=''/>
        </Grid>
        <Grid item md={6} className="text__aling__right">
        <img className="porfolio__img" src="https://bunkerdb.com/blog/wp-content/uploads/2020/07/Low-code-No-code.jpg"alt=''/>
        </Grid>
      </Grid>
      <div>
      <Grid container >
        <Grid item md={6} className="text__aling__left text__aling">
        <img className="porfolio__img" src="https://bunkerdb.com/blog/wp-content/uploads/2020/07/Low-code-No-code.jpg"alt=''/>
        </Grid>
        <Grid item md={6} className="text__aling__right">
        <img className="porfolio__img" src="https://bunkerdb.com/blog/wp-content/uploads/2020/07/Low-code-No-code.jpg" alt=''/>
        </Grid>
      </Grid>

      </div>
        </div>
    )
}
