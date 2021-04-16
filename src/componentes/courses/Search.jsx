import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";

import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    background: "lightgrey !important",
    border: "1px solid #3cb4e5 !important",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Search({ setCoursesOffers, allCourses }) {
  const classes = useStyles();
  const [query, setQuery] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    setCoursesOffers(allCourses);
    setQuery("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = allCourses.filter(
      (doc) =>
        doc.name.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        doc.description.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        doc.technologies.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
        doc.link.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
    setCoursesOffers(filtered);
  };

  return (
    <Paper component="form" className={classes.root} onSubmit={handleSearch}>
      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={classes.input}
        placeholder="Search keywords..."
        inputProps={{ "aria-label": "search keywords" }}
      />
      <IconButton
        type="submit"
        className={classes.iconButton}
        aria-label="search"
      >
        {query.length > 0 ? <HighlightOffIcon onClick={handleClick} /> : null}
      </IconButton>
      <Divider className={classes.divider} orientation="vertical" />
      <Button className="button__profile__follow">Search</Button>
    </Paper>
  );
}
