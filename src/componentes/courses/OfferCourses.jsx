import React, { useState, useEffect } from "react";
import { db } from "../../firebase/firebase";
import firebase from "firebase";
import { useSelector } from "react-redux";
import SingleCourse from "./SingleCourse";

const OfferCourses = ({ setCoursesOffers, coursesOffers, setAllCourses }) => {
  useEffect(() => {
    db.collection("courses")
      .orderBy("timestamp", "desc")
      .onSnapshot((shot) => {
        setCoursesOffers(
          shot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
        setAllCourses(
          shot.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      });
  }, []);

  return (
    <>
      {coursesOffers &&
        coursesOffers.map((courseOffer) => (
          <SingleCourse courseOffer={courseOffer} />
        ))}
    </>
  );
};

export default OfferCourses;
