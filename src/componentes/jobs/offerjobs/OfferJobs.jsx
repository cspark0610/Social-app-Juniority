import React, { useState, useEffect } from "react";
import "./offerJobsStyle.css";
import { db } from "../../../firebase/firebase.js";
import firebase from "firebase";
import { useSelector } from "react-redux";
import OfferJobsPost from "./OfferJobsPost.jsx";
import TransitionsModal from "../../home/TransitionModal";

const OfferJobs = () => {
  const [title, setTitle] = useState("");
  const [open, setOpen] = useState(false);
  const [openPostModal, setOpenPostModal] = React.useState(false);
  const [userLikes, setUserLikes] = useState([]);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [input, setInput] = useState("");
  const [cvUrl, setCvUrl] = useState("");
  const [jobsOffers, setJobsOffers] = useState([]);
  const keyword = useSelector((state) => state.keyword);

  const handleClosePostModal = () => {
    setOpenPostModal(false);
  };
  const handleOpenPostModal = () => {
    setOpenPostModal(true);
  };

  useEffect(() => {
    db.collection("jobs")
      .orderBy("timestamp", "desc")
      .get()
      .then((shot) => {
        setJobsOffers(
          shot.forEach((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  }, []);

  useEffect(() => {
    db.collection("jobs")
      .orderBy("timestamp", "desc")
      .onSnapshot((shot) => {
        const docs = [];
        shot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        const filtered = docs.filter(
          (doc) =>
            doc.position.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
            doc.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
            doc.availability.toLowerCase().indexOf(keyword.toLowerCase()) >
              -1 ||
            doc.location.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
            doc.salary.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
            doc.skills.toLowerCase().indexOf(keyword.toLowerCase()) > -1
        );
        setJobsOffers(filtered);
      });
  }, [keyword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      db.collection("job-applicants").add({
        aplicantCv: cvUrl,
        aplicantEmail: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    } catch (error) {
      console.error(error);
    }
    setInput("");
    setCvUrl("");
    handleClose();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref("POST-CVS");
    if (file) {
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      setCvUrl(await fileRef.getDownloadURL());
    }
  };

  return (
    <>
      <TransitionsModal
        open={openPostModal}
        handleClose={handleClosePostModal}
        users={userLikes}
        title={title}
      />
      {jobsOffers &&
        jobsOffers.map((jobsOffer) => (
          <OfferJobsPost
            jobsOffer={jobsOffer}
            handleClickOpen={handleClickOpen}
            open={open}
            handleClose={handleClose}
            input={input}
            setInput={setInput}
            onFileChange={onFileChange}
            handleSubmit={handleSubmit}
            handleOpen={handleOpenPostModal}
            setUsers={setUserLikes}
            setTitle={setTitle}
          />
        ))}
    </>
  );
};

export default OfferJobs;
