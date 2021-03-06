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
import Chip from "@material-ui/core/Chip";

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

function getStyles(name, itemName, theme) {
  return {
    fontWeight:
      itemName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function PayRate({/*  jobsOffers,  */setJobsOffers }) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [itemName, setItemName] = useState([]);
  const [names, setNames] = useState([]);
  const filter = useSelector((state) => state.filter);

  const handleChange = (event) => {
    setItemName(event.target.value);
  };

  useEffect(() => {
    dispatch(setFilter({ ...filter, position: itemName }));
  }, [itemName]);

  useEffect(() => {
    db.collection("PayRate")
      .orderBy("payRate", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        const filterPayRate = docs.map((doc) => doc.payRate);
        setNames(filterPayRate);
      });
  }, []);

  const clear = () => {
    db.collection("jobs")
      .orderBy("timestamp", "desc")
      .get()
      .then((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setJobsOffers(docs);
      });
    /*     .then(()=> (console.log(">>><<<",jobsOffers))) */
    setItemName([]);
  };

  return (
    <>
      {names[0] && (
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-mutiple-chip-label">Pay Rate</InputLabel>
            <Select
              labelId="demo-mutiple-chip-label"
              id="demo-mutiple-chip"
              multiple
              value={itemName}
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
                  style={getStyles(name, itemName, theme)}
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
