import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import API from "../../API";
import { Heading } from "../../GlobalForm.styles";
import ProfileHeader from "../Profile/ProfileHeader";
import TeacherOffersModal from "../TeacherOffersModal/TeacherOffersModal";
import "./Waiting.css";

type Props = {
  userData: any;
  getData: any;
  roomId: any;
  setRoomId: any;
};

type AcceptedBy = {
  teacherName: string;
  teacher: string;
  date: string;
  teacherAvatar: string;
  points: number;
};

type Offer = {
  subject: string;
  title: string;
  points: number;
  acceptedBy: AcceptedBy[];
  _id: string;
};

const Waiting: React.FC<Props> = ({ userData, getData, roomId, setRoomId }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [curAcceptedBy, setCurAcceptedBy] = useState<AcceptedBy[]>([]);
  const [curOfferId, setCurOfferId] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (!userData) return;

    getUserOffers(userData.mail);
  }, [userData]);

  const getUserOffers = async (mail: string) => {
    const data = await API.getUserOffers(mail);
    console.log(data);
    setOffers(data.data);
  };

  useEffect(() => {
    console.log(curAcceptedBy);
  }, [curAcceptedBy]);

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

  return (
    <div className={`Waiting`}>
      <ProfileHeader userData={userData}></ProfileHeader>
      <>
        <div className="offers-grid">
          <button
            className="refresh"
            onClick={() => {
              getUserOffers(userData.mail);
            }}
          >
            <FontAwesomeIcon icon={faRefresh} />
          </button>
          <div className="offers-content">
            {offers.length > 0 ? (
              offers.map((el) => {
                return (
                  <div key={el.title} className="single-offer">
                    <Heading className="offer-subject">{el.subject}</Heading>
                    <span className="offer-title">{el.title}</span>
                    <button
                      onClick={() => {
                        setOpenModal(true);
                        setCurAcceptedBy(el.acceptedBy);
                        setCurOfferId(el._id);
                      }}
                    >
                      Oferty ({el.acceptedBy.length})
                    </button>
                  </div>
                );
              })
            ) : (
              <Heading>Brak oczekujących lekcji</Heading>
            )}
          </div>
        </div>

        {openModal && (
          <TeacherOffersModal
            userData={userData}
            getData={getData}
            offerId={curOfferId}
            acceptedBy={curAcceptedBy}
            setOpenModal={setOpenModal}
            setRoomId={setRoomId}
          />
        )}
      </>
    </div>
  );
};

export default Waiting;
