import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import "./styles.css";
import Proyect from "./Proyect";
import { useSelector } from "react-redux";
import { db } from "../../../firebase/firebase";

export const Portfolio = ({ userId }) => {

  const [thisUser, setThisUser] = useState();

  useEffect(() => {
      db.collection("user")
        .where("id", "==", userId)
        .onSnapshot((shot) => {
          shot.forEach((doc) => {
            setThisUser(doc.data());
          });
        });
  }, []);

  return (
    <>
      {thisUser && (
        <div className="container1">
          <div className="portfolio1">
            <h1 className="portfolio_title1">
              <b>Portfolio</b>
            </h1>
            <hr className="line__profile__widget1" />
            {thisUser.portfolio.length ? thisUser.portfolio.map((portfolio) => {
              return (
                <Proyect
                  key={portfolio.title}
                  title={portfolio.title}
                  description={portfolio.description}
                  photo={portfolio.photo}
                  link={portfolio.link}
                  github={portfolio.github}
                  user={thisUser}
                />
              );
            }) : (
              <p className='portfolio_no_info_p'>No info provided</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
