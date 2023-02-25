import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API, { UserInfoType } from "../../API";
import { Heading } from "../../GlobalForm.styles";
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
    },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.add(userData?.theme || "light");

    console.log(userData?.theme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add(userData?.theme || "light");

    if (userData?.theme == "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else if (userData?.theme == "dark") {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }

    console.log(userData?.theme);
  }, [userData]);

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

    uData.data.map((el: any, idx: any) => {
      if (idx == 0) {
        setLessons([...el.plannedLessons]);
      } else {
        setLessons([...lessons, ...el.plannedLessons]);
      }
    });
  };

  return (
    <div className={`Lessons`}>
      <ProfileHeader userData={userData}></ProfileHeader>
      <>
        <div className="offers-grid">
          <div className="offers-content">
            {lessons.length > 0 && lessons[0].date != "" ? (
              lessons.map((el, key) => {
                return el.completed ? (
                  <div key={key} className="single-lesson">
                    <div>
                      <div className="lesson-header">
                        <div className="lesson-header-img"></div>
                        <div className="lesson-header-info">
                          <h2>Daisy</h2>
                          <p>
                            {el.date.slice(6)}, {el.date.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                      <div className="lesson-info">
                        <p>Matura podstawowa z matematyki, trygonometria</p>
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
                        <div className="lesson-header-img"></div>
                        <div className="lesson-header-info">
                          <h2>Daisy</h2>
                          <p>
                            {el.date.slice(6)}, {el.date.slice(0, 5)}
                          </p>
                        </div>
                      </div>
                      <div className="lesson-info">
                        <p>Matura podstawowa z matematyki, trygonometria</p>
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
