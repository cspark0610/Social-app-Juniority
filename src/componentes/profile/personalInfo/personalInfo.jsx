import React, { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import "./style.css";

export const PersonalInfo = ({ user }) => {
  const [localUser, setLocalUser] = useState();

  useEffect(async () => {
    await db
      .collection("user")
      .where("id", "==", user.id)
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          setLocalUser(doc.data());
        });
      });
  }, []);
  return (
    <div className="personal_info_container">
      {localUser && (
        <div className="personal_info_sub_container">
          <div>
            <h3>{`About ${localUser.fullName}`}</h3>
            <p className="personal_info_p personal_info_about_me">
              {localUser.aboutMe}
            </p>
          </div>
          <div>
            <div className="personal_info_experience_container">
              <h3>{`${localUser.fullName} experience`}</h3>
              {localUser.experience.length ? (
                localUser.experience.map((exp) => {
                  return (
                    <div className="personal_info_exp_container">
                      <h6 className="personal_info_h6">{`${exp.startDate} - ${exp.finishDate}`}</h6>
                      <h4 className="personal_info_h4">{`${exp.company} - ${exp.position}`}</h4>
                      <p className="personal_info_p">{exp.description}</p>
                    </div>
                  );
                })
              ) : (
                <p className="personal_info_p_no_info">No info provided</p>
              )}
            </div>
            <div className="personal_info_experience_container">
              <h3>{`${localUser.fullName} education`}</h3>
              {localUser.education.length ? (
                localUser.education.map((edu) => {
                  return (
                    <div>
                      <h6 className="personal_info_h6">{`${edu.startDate} - ${edu.finishDate}`}</h6>
                      <h4 className="personal_info_h4">{`${edu.institute} - ${edu.grade}`}</h4>
                      <p className="personal_info_p">{edu.description}</p>
                    </div>
                  );
                })
              ) : (
                <p className="personal_info_p_no_info">No info provided</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
