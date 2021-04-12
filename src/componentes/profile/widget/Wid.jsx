import React from "react";
import "./style.css";
import BadgeAvatars from "./BadgeAvatars";

import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';


const Wid = () => {
  const Articulos = (title, subtitle) => {
    return (
      <div className="widgets__article">
        <div className="widgets__left">
          <BadgeAvatars/>
        </div>
        <div className="widgets__right">
          <h4>{title} </h4>
          <p>{subtitle} <GroupAddOutlinedIcon className="wid__add"/></p>
        </div>
      </div>
    );
  };
  return (
    <div className="widgets">
      <div className="widgets__header">
        <h2>People you might know</h2>
        <hr className="line__profile__widget"/>
        
      </div>
      {Articulos("Sophie Doe", "Full Stack Developer")}
      {Articulos("John Doe", "Full Stack Developer")}
      {Articulos("Sophie Doe", "Full Stack Developer")}
      {Articulos("John Doe", "Full Stack Developer")}
      {Articulos("Sophie Doe", "Full Stack Developer")}
    </div>
  );
};

export default Wid;