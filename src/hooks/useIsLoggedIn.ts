import { useEffect, useState } from "react";
import jwt from "jwt-decode";
import API, { UserInfoType } from "../API";

export const useIsLoggedIn = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState<UserInfoType>();
  const [loading, setLoading] = useState(false);
  const [currLesson, setCurrLesson] = useState({
    teacherEmail: "",
    studentEmail: "",
    points: 0,
    url: "",
  });

  useEffect(() => {
    setLoading(true);
    const rawStoredData = localStorage.getItem("user");
    const userStoredData = rawStoredData ? JSON.parse(rawStoredData) : null;

    if (userStoredData && userStoredData.token) {
      const user = jwt(userStoredData.token);

      if (!user) {
        localStorage.removeItem("user");
        setLoggedIn(false);
      } else {
        setLoggedIn(true);
        setUserData(userStoredData);
        console.log(userStoredData);
      }
    } else {
      setLoggedIn(false);
    }

    setLoading(false);
  }, []);

  useEffect(() => {}, []);

  const getData = async () => {
    if (!userData || !userData.token) {
      setLoggedIn(false);
      return;
    }

    const user = jwt(userData.token);

    if (!user) {
      localStorage.removeItem("user");
      setLoggedIn(false);
      return;
    }

    const data = await API.getUserDataFetch(userData.mail);
    if (!data.ok) {
      setLoggedIn(false);
      return;
    }

    console.log(data);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUserData(data.user);

    console.log(userData);
  };

  return {
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
    loading,
    getData,
    currLesson,
    setCurrLesson,
  };
};
