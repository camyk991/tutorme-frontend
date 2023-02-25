import { Route, Routes } from "react-router-dom";
import EditProfile from "./components/EditProfile/EditProfile";
import { useState } from "react";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import { GlobalStyle } from "./GlobalStyles";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import VideoCall from "./components/Room/VideoCall";
import PostOffer from "./components/PostOffer/PostOffer";
import Waiting from "./components/Waiting/Waiting";
import Lessons from "./components/Lessons/Lessons";

function App() {
  const {
    loggedIn,
    setLoggedIn,
    userData,
    setUserData,
    loading,
    getData,
    currLesson,
    setCurrLesson,
  } = useIsLoggedIn();
  const [inCall, setInCall] = useState(true);
  const [roomId, setRoomId] = useState("1");

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-up" element={<Register isLoggedIn={loggedIn} />} />4
        <Route
          path="/sign-in"
          element={
            <Login
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              setUserData={setUserData}
            />
          }
        />
        <Route
          path="/room/:roomId"
          element={
            <VideoCall
              setInCall={setInCall}
              userName={"John"}
              roomId={roomId}
              setRoomId={setRoomId}
              userData={userData}
              currLesson={currLesson}
              setCurrLesson={setCurrLesson}
            />
          }
        />
        <Route
          path="/edit"
          element={
            <EditProfile
              isLoggedIn={loggedIn}
              userData={userData}
              loading={loading}
              getData={getData}
            />
          }
        />
        <Route path="/post-offer" element={<PostOffer userData={userData} />} />
        <Route
          path="/waiting"
          element={
            <Waiting
              getData={getData}
              userData={userData}
              roomId={roomId}
              setRoomId={setRoomId}
            />
          }
        />
        <Route
          path="/lessons"
          element={
            <Lessons
              userData={userData}
              currLesson={currLesson}
              setCurrLesson={setCurrLesson}
            />
          }
        />
        <Route
          path=""
          element={
            <Profile
              setRoomId={setRoomId}
              roomId={roomId}
              userData={userData}
              setUserData={setUserData}
              isLoggedIn={loggedIn}
              setLoggedIn={setLoggedIn}
              getData={getData}
            />
          }
        />
      </Routes>
      <GlobalStyle />
    </div>
  );
}

export default App;
