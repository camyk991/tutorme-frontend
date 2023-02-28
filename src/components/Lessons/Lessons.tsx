import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API, { UserInfoType } from "../../API";
import { Heading } from "../../GlobalStyles";
import ProfileHeader from "../Profile/ProfileHeader";
import "./Lessons.css";

const { DateTime } = require("luxon");

type Props = {
  userData: UserInfoType | undefined;
  currLesson: any;
  setCurrLesson: any;
};

const Lessons: React.FC<Props> = ({ userData, currLesson, setCurrLesson }) => {
  const [lessons, setLessons] = useState([
    {
      date: "",
      teacherMail: "",
      studentMail: "",
      lessonUrl: "",
      points: 0,
      completed: false,
      userName: "",
      userProfile: "",
      title: ""
    },
  ]);

  const navigate = useNavigate();

  const getDateDiff = (el: any) => {
    const givenDate = DateTime.fromISO(
      `${el.date.slice(6)}T${el.date.slice(0, 5)}:00`
    );

    const now = DateTime.local();
    const diffInSeconds = now.diff(givenDate, "seconds").toObject().seconds;

    return diffInSeconds;
  };

  useEffect(() => {
    if (!userData) return;

    getUserLessons(userData.mail);
  }, [userData]);

  useEffect(() => {
    console.log(lessons);
  }, [lessons])

  const startLesson = async (
    url: any,
    emailT: any,
    emailS: any,
    lessonPoints: any
  ) => {
    setCurrLesson({
      teacherEmail: emailT,
      studentEmail: emailS,
      points: lessonPoints,
      url: url,
    });
    navigate("/room/" + url);
  };

  const getUserLessons = async (mail: string) => {
    const uData = await API.getLessons(mail);
    console.log(uData);

    setLessons(uData.data);
  };

  return (
    <div className={`Lessons`}>
      <ProfileHeader userData={userData}></ProfileHeader>
      <>
        <div className="offers-grid">
        <button
            className="refresh"
            onClick={() => {
              if (!userData)
                return;

              getUserLessons(userData.mail);
            }}
          ><FontAwesomeIcon icon={faRefresh} />
          </button>
          <div className="offers-content">
            {lessons.length > 0 && lessons[0].date != "" ? (
              lessons.map((el, key) => {
                return el.completed ? (
                  <div key={key} className="single-lesson">
                    <div>
                      <div className="lesson-header">
                        <div className="lesson-header-img">
                          <img
                          src={`/assets/${el.userProfile}`}
                          alt={el.userProfile} />
                        </div>
                        <div className="lesson-header-info">
                          <h2>{el.userName}</h2>
                          <p>
                            {el.date.slice(6)}, {el.date.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                      <div className="lesson-info">
                        <p>{el.title}</p>
                      </div>
                    </div>

                    <button type="button" disabled>
                      Zakończona
                    </button>
                  </div>
                ) : (
                  <div key={key} className="single-lesson">
                    <div>
                      <div className="lesson-header">
                        <div className="lesson-header-img">
                          <img
                          src={`/assets/${el.userProfile}`}
                          alt={el.userProfile} />
                        </div>
                        <div className="lesson-header-info">
                          <h2>{el.userName}</h2>
                          <p>
                            {el.date.slice(6)}, {el.date.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                      <div className="lesson-info">
                        <p>{el.title}</p>
                      </div>
                    </div>

                    {/* enable the button with the url from db when it time for the lesson */}
                    {/* and if user doesn't answer within 10min the lesson is canceled */}
                    {getDateDiff(el) > 0 && getDateDiff(el) < 600 ? (
                      <button
                        type="button"
                        onClick={() => {
                          startLesson(
                            el.lessonUrl,
                            el.teacherMail,
                            el.studentMail,
                            el.points
                          );
                        }}
                      >
                        Dołącz
                      </button>
                    ) : getDateDiff(el) > 600 ? (
                      <button type="button" disabled>
                        Odwołana
                      </button>
                    ) : (
                      <button type="button" disabled>
                        Dołącz
                      </button>
                    )}
                  </div>
                );
              })
            ) : (
              <Heading>Brak zaplanowanych lekcji</Heading>
            )}
          </div>
        </div>
      </>
    </div>
  );
};

export default Lessons;