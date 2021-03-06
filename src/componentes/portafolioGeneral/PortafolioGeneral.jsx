import React, { useEffect, useState } from "react";
import "./portafolioStyle.css";
import { Grid } from "@material-ui/core";
import Proyect from "../profile/portfolio/Proyect";
import Navbar from "../navbar/Navbar";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebase";
import AddBoxIcon from "@material-ui/icons/AddBox";
import { TextField, Button, Typography } from "@material-ui/core";
import firebase from "firebase";

const PortafolioGeneral = (props) => {
  const userId = props.match.params.id;
  const currentUser = useSelector((state) => state.currentUser);
  const selectedUser = useSelector((state) => state.selectedUser);
  const [imageUrl, setImageUrl] = useState();
  const [actualUser, setActualUser] = useState();
  const [title, setTitle] = useState();
  const [link, setLink] = useState();
  const [github, setGithub] = useState();
  const [description, setDescription] = useState();
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    db.collection("user")
      .where("id", "==", userId)
      .onSnapshot((shot) => {
        shot.forEach((doc) => {
          setActualUser(doc.data());
        });
      });
}, []);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref("USER-PROYECT-PHOTO");
    if (file) {
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setImageUrl(await fileRef.getDownloadURL());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowForm(false);
    const updatedUser = { ...actualUser };
    const proyect = {
      title,
      link,
      github,
      description,
      photo: imageUrl,
    };
    updatedUser.portfolio.push(proyect);
    await db.collection("user").doc(actualUser.id).set(updatedUser);
    setImageUrl();
    setTitle();
    setLink();
    setDescription();
    setGithub();
  };

  const showFormHandler = (e) => {
    e.preventDefault();
    setShowForm(!showForm);
  };

  return (
    <div className="body">
      {actualUser && (
        <div >
          <Navbar />
          <div className="container">
            <div className="portfolio">
              <h1 className="portfolio_title">Portfolio</h1>
              <hr className="line__profile__widget" />
              <Grid container className="card-proyect">
                {actualUser.portfolio.length ? (
                  actualUser.portfolio.map((portfolio) => (
                    <Grid key={portfolio.title} item md={3}>
                      <Proyect
                        title={portfolio.title}
                        description={portfolio.description}
                        photo={portfolio.photo}
                        github={portfolio.github}
                        link={portfolio.link}
                        user={actualUser}
                      />
                    </Grid>
                  ))
                ) : (
                  <>
                    {actualUser.id !== currentUser.id ? (
                      <div className="div_no_info_portfolio">
                        <p className="p_no_info_portfolio">No info provided</p>
                      </div>
                    ) : null}
                  </>
                )}
                {actualUser.id === currentUser.id && (
                  <div className="add_icon_portfolio_div">
                    <button
                      onClick={(e) => showFormHandler(e)}
                      className="add_icon_portfolio"
                    >
                      <AddBoxIcon style={{ fontSize: 100 }} />
                    </button>
                  </div>
                )}
              </Grid>
            </div>
            {showForm && (
              <div className="portfolio">
                <div className="portfolio_title">
                  <h3>
                    <spam>Ingresa los datos de tu nuevo proyecto</spam>
                  </h3>
                </div>
                <div className="div_form_container">
                  <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="form_container"
                  >
                    <TextField
                      id="outlined-basic"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                      label="Title *"
                      className="inputSpace"
                      variant="outlined"
                      fullWidth
                    />
                     <TextField
                      id="outlined-basic"
                      onChange={(e) => setLink(e.target.value)}
                      value={link}
                      label="Link *"
                      className="inputSpace"

                      variant="outlined"
                      fullWidth
                    />
                     <TextField
                      id="outlined-basic"
                      onChange={(e) => setGithub(e.target.value)}
                      value={github}
                      label="Github repository *"
                      className="inputSpace"
                      variant="outlined"
                      fullWidth
                    />
                     <TextField
                      id="outlined-basic"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                      label="Description *"
                      variant="outlined"
                      className="inputSpace"

                      multiline
                      rows={4}
                      fullWidth
                    />
                    <label htmlFor="avatar">Proyect photo </label>
                    <input
                      onChange={(e) => onFileChange(e)}
                      name="avatar"
                      accept="image/*"
                      id="icon-button-file"
                      className="inputSpace"

                      type="file"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      fullWidth
                      className="inputSpace"

                    >
                      Add proyect
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PortafolioGeneral;
