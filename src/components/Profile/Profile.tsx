import "./Profile.css";
import React, { useState, useEffect, useRef } from "react";

import API from "../../API";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRefresh,
  faSun,
  faMoon,
  faUserEdit,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

import { UserInfoType } from "../../API";
import { Link, useNavigate } from "react-router-dom";

import TeacherModal from "../TeacherModal/TeacherModal";
import ProfileHeader from "./ProfileHeader";
import AddFriendModal from "../AddFriendsModal/AddFriendModal";

import badge from "./icons/badge.png";
import AchievementModal from "../AchievementModal/AchievementModal";
import { Heading } from "../../GlobalStyles";

type Profile = {
  isLoggedIn: boolean;
  setLoggedIn: any;
  userData: UserInfoType | undefined;
  setUserData: any;
  setRoomId: any;
  roomId: string;
  getData: any;
};

const Profile: React.FC<Profile> = ({
  isLoggedIn,
  userData,
  setUserData,
  setRoomId,
  setLoggedIn,
  getData,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userPoints, setUserPoints] = useState(userData?.points || 0);

  const ref = useRef(0);

  const [userOffersArr, setUserOffersArr] = useState<any[]>([]);
  const [achievements, setAchievements] = useState<any[]>([]);

  const [isOpen, setIsOpen] = useState(false);
  const [friendModal, setFriendModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState({
    userName: "",
    subject: "",
    title: "",
    info: "",
    hours: [""],
    points: 0,
    id: "",
  });

  const [isAchievementOpen, setIsAchievementOpen] = useState(false);
  const [achievementInfo, setAchievementInfo] = useState({
    src: "",
    title: "",
    info: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) return;

    getUserLessons(userData.mail);
    console.log(userData);
  }, [userData?.mail]);

  useEffect(() => {
    // getCurrentTheme();
    handleGetPoints();
    handleGetOffers();
    getData();
    // document.documentElement.classList.add(userData?.theme || "light");
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/sign-in");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.remove("dark");
    }

    if (ref.current === 0) {
      ref.current = ref.current + 1;
      return;
    }
  }, [isLoggedIn]);

  // async function getCurrentTheme() {
  //   const data = await API.getUserThemeFetch(userData?.mail || "");
  //   setUserData({ ...userData, theme: data.theme });
  // }

  const handleTheme = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = await API.putTheme(
      userData?.theme == "light" ? "dark" : "light",
      userData?.mail || ""
    );

    setUserData({
      ...userData,
      theme: userData?.theme == "light" ? "dark" : "light",
    });

    if (data.ok) {
      console.log("zmiana motywu");
    } else {
      console.log("problem z motywem");
    }
  };

  const handleGetOffers = async () => {
    let offersArray: any = [];

    if (!userData || !userData.subjects) return;

    const promises: any = userData?.subjects.map(async (subject: any) => {
      const data = await API.getChosenOffers(subject, userData?.mail);

      data.offers?.forEach((el: any) => {
        offersArray.push(el);
      });
    });

    await Promise.all(promises);
    setUserOffersArr(offersArray);
  };

  const handleGetPoints = async () => {
    const data = await API.getPoints(userData?.mail || "");
    setUserPoints(data.points);
  };

  const toggleModal = (
    userName: string,
    title: string,
    subject: string,
    info: string,
    hours: [],
    points: number,
    id: string
  ) => {
    setIsModalOpen(!isModalOpen);
    modalInfo.userName = userName;
    modalInfo.title = title;
    modalInfo.subject = subject;
    modalInfo.info = info;
    modalInfo.hours = hours;
    modalInfo.points = points;
    modalInfo.id = id;
  };

  const hideModal = () => {
    if (isModalOpen) {
      setIsModalOpen(false);
    }
    if (isAchievementOpen) {
      setIsAchievementOpen(false);
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const getUserLessons = async (mail: string) => {
    const uData = await API.getLessons(mail);

    uData.data.map((el: any) => {
      setAchievements([
        ...achievements,
        {
          studentMail: el.studentMail,
          teacherMail: el.teacherMail,
          completed: el.completed,
        },
      ]);
    });
  };

  const openAchievement = (imgData: any, title: string, info: string) => {
    setIsAchievementOpen(!isAchievementOpen);
    achievementInfo.src = imgData.src;
    achievementInfo.title = title;
    achievementInfo.info = info;
  };

  if (!isLoggedIn) {
    return <div>Musisz najpierw się zalogować!</div>;
  }

  return (
    <div className={`Profile`}>
      <div className="Dashboard">
        <ProfileHeader userData={userData} />

        <main id="profile-main">
          <div className="main-content">
            {/* COLUMN 1 */}
            {/* user info */}
            <section className="user-info-container">
              <div className="user-info-content">
                <div className="user-info-header">
                  <div
                    className="user-info-id"
                    onClick={() => {
                      if (userData === undefined || userData.id === undefined)
                        return;

                      navigator.clipboard.writeText(userData?.id);
                    }}
                  >
                    ID: {userData?.id}
                  </div>
                  <div className="user-info-pic">
                    <div className="u-pic">
                      <img
                        src={`/assets/${userData?.profileImage}`}
                        alt={userData?.profileImage}
                      />
                    </div>
                  </div>
                </div>

                <div className="user-info-main">
                  <div className="user-info-name">
                    <p>{userData && userData.name}</p>
                  </div>

                  <div className="user-info-subjects">
                    <p>
                      <b>Przedmioty:</b>
                    </p>
                    <p>
                      {userData?.subjects && userData?.subjects.length
                        ? userData.subjects.map((el: any, idx: any) => {
                            if (idx == userData.subjects.length - 1) {
                              return el;
                            } else {
                              return el + " " + "-" + " ";
                            }
                          })
                        : "brak"}
                    </p>
                  </div>

                  <div className="user-info-teach">
                    <b>Osiągnięcia:</b>
                    <br></br>
                    {achievements &&
                      achievements.some((el: any) => {
                        if (
                          el.completed == true &&
                          el.teacherMail == userData?.mail
                        ) {
                          return true;
                        }
                        return false;
                      }) && (
                        <img
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            openAchievement(
                              e.target,
                              "Pierwsza lekcja",
                              "Zostałeś nauczycielem pierwszy raz!"
                            );
                          }}
                          className="achievement-icon"
                          src={badge}
                          alt="badge"
                        />
                      )}
                  </div>
                </div>
              </div>
              <div className="user-info-edit">
                <button id="user-info-edit-btn" onClick={handleTheme}>
                  {userData?.theme == "light" ? (
                    <FontAwesomeIcon icon={faSun} />
                  ) : (
                    <FontAwesomeIcon icon={faMoon} />
                  )}
                </button>
                <Link to="edit">
                  <button id="user-info-edit-btn">
                    <FontAwesomeIcon icon={faUserEdit} />
                  </button>
                </Link>
                <button
                  id="user-info-edit-btn"
                  onClick={() => {
                    localStorage.removeItem("user");
                    setLoggedIn(false);
                  }}
                >
                  Wyloguj
                </button>
              </div>
            </section>

            {/* hours left */}
            <section className="hours-left-container">
              <div className="hours-left-content">
                <div className="hours-left-number">
                  <p>{userPoints || 0}</p>
                </div>
                <div className="hours-left-text">
                  <p>Liczba dostępnych punktów na naukę</p>
                </div>
              </div>
            </section>

            {/* deal */}
            <section className="deal-container">
              <div className="deal-text">
                <p>Poleć znajomemu i zyskaj 50 punktów!</p>
              </div>
            </section>

            {/* COLUMN 2 */}
            {/* teachers */}
            <section className="teachers-container">
              <div className="teachers-content">
                <div className="teachers-header">
                  <p>Wybrane dla ciebie</p>
                  <button
                    onClick={handleGetOffers}
                    style={{ padding: "10px 20px" }}
                  >
                    <FontAwesomeIcon icon={faRefresh} />
                  </button>
                </div>
                <div className="teachers-list">
                  {userOffersArr.length > 0 ? (
                    userOffersArr.map((el: any, key: any) => {
                      return (
                        <div
                          className="teacher-el"
                          key={key}
                          onClick={() => {
                            toggleModal(
                              el.authorName[0].name,
                              el.subject,
                              el.title,
                              el.info,
                              el.dates,
                              el.price,
                              el._id
                            );
                          }}
                        >
                          <div className="teacher-pic">
                            <div className="t-pic">
                              <img
                                src={`/assets/${el.authorName[0].profileImage}`}
                                alt={el.authorName[0].profileImage}
                              />
                            </div>
                          </div>
                          <div className="teacher-info">
                            <div className="teacher-name">
                              {el.authorName[0].name}
                            </div>
                            <div className="teacher-subject">
                              {el.subject} - {el.title}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <Heading>Brak ofert</Heading>
                  )}
                </div>
              </div>
            </section>

            {/* friends */}
            <section className="friends-container">
              <div className="friends-content">
                <div className="friends-header">
                  <p>Znajomi</p>
                  <button
                    style={{ padding: "10px 15px" }}
                    onClick={() => {
                      setFriendModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                  </button>
                </div>
                <div className="friends-list">
                  <>
                    {userData && userData.friends ? (
                      userData?.friends.map((el) => {
                        return (
                          <div className="friend-el" key={el.id}>
                            <div className="friend-pic">
                              <div className="f-pic">
                                <img
                                  src={`/assets/${el?.avatar}`}
                                  alt={el.avatar}
                                />
                              </div>
                            </div>
                            <div className="friend-name">{el.name}</div>
                          </div>
                        );
                      })
                    ) : (
                      <>Brak</>
                    )}
                  </>
                </div>
              </div>
            </section>
          </div>
        </main>

        <div className="feedback-btn-container">
          <button id="feedback-btn">Feedback</button>
        </div>
      </div>
      {isModalOpen && (
        <TeacherModal
          userName={modalInfo.userName}
          title={modalInfo.title}
          subject={modalInfo.subject}
          info={modalInfo.info}
          hideModal={hideModal}
          timeArr={modalInfo.hours}
          points={modalInfo.points}
          id={modalInfo.id}
          userMail={userData?.mail}
          userData={userData}
        />
      )}
      {friendModal && (
        <AddFriendModal
          getData={getData}
          setFriendModal={setFriendModal}
          userData={userData}
        />
      )}

      {isAchievementOpen && (
        <AchievementModal
          src={achievementInfo.src}
          title={achievementInfo.title}
          info={achievementInfo.info}
          hideModal={hideModal}
        />
      )}
    </div>
  );
};

export default Profile;
