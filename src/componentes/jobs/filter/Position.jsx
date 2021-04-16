import React, { useEffect, useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { db } from "../../../firebase/firebase";
import { setFilter } from "../../../store/filter";
import { useSelector, useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  formControl: {
    width: "90%",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 200,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function Position() {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [personName, setPersonName] = useState([]);
  const [names, setNames] = useState([]);
  const filter = useSelector((state) => state.filter);

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  useEffect(() => {
    dispatch(setFilter({ ...filter, position: personName }));
  }, [personName]);

  useEffect(() => {
    db.collection("Position")
      .orderBy("position", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        const filterPosition = docs.map((doc) => doc.position);
        setNames(filterPosition);
      });
  }, []);

/*   const clear = () => {
    setPersonName([]);
    window.location.reload();
  }; */

  const clear = () => {
    setPersonName([]);
  };


  return (
    <>
      {names[0] && (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Position</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={personName}
              onChange={handleChange}
              className="select__multiple"
              input={<Input id="select-multiple-chip" />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip key={value} label={value} className={classes.chip} />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}
            >
              {names[0].map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, personName, theme)}
                >
                  <p>{name}</p>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button className="button__jobs" onClick={clear}>
            Clear
          </Button>
        </div>
      )}
    </>
  );
}
