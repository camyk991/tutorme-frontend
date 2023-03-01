import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import API, { UserInfoType } from "../../API";

import { v4 as uuidv4 } from "uuid";

import {
  FormInfo,
  FormWrapper,
  Input,
  Loader,
  SignAside,
  SignForm,
  SignHeading,
  Submit,
} from "../../GlobalStyles";
import ProfileHeader from "../Profile/ProfileHeader";

type Props = {
  userData: UserInfoType | undefined;
};

const GroupChat: React.FC<Props> = ({ userData }) => {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  return (
    <div className="GroupChat">
      <ProfileHeader userData={userData}></ProfileHeader>
      <div className="edit-container">
        <FormWrapper>
          <SignForm method="POST">
            <SignHeading>Dołącz do pokoju</SignHeading>
            <p>
              <Input
                onChange={(e) => setRoomId(e.target.value)}
                value={roomId}
                type="roomId"
                name="roomId"
                placeholder="Kod pokoju"
                required
                autoComplete="off"
              />
            </p>

            <p className="additional-info">
              Chcesz utworzyć pokój?
              <span
                style={{
                  color: "#000",
                  cursor: "pointer",
                  padding: "0 10px 5px 5px",
                }}
                onClick={() => {
                  const inviteCode = uuidv4();
                  setRoomId(inviteCode);
                }}
              >
                <b>&nbsp;Generuj kod!</b>
              </span>
            </p>

            <FormInfo>
              {info}
              {loading ? <Loader /> : null}
            </FormInfo>

            <p>
              <Submit
                style={{ margin: "auto" }}
                onClick={() => {
                  if (roomId != "") {
                    navigate("/room/" + roomId);
                  }
                }}
              >
                Dołącz
              </Submit>
            </p>
          </SignForm>

          <SignAside>
            <SignHeading>Chcesz utworzyć pokój?</SignHeading>
            <button
              className="negative"
              onClick={() => {
                const inviteCode = uuidv4();
                setRoomId(inviteCode);
              }}
            >
              Generuj kod
            </button>
          </SignAside>
        </FormWrapper>
      </div>
    </div>
  );
};

export default GroupChat;
