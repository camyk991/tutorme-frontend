import React, { useEffect, useState } from "react";
import API from "../../API";
import "./TeacherOffersModal.css";

import { v4 as uuidv4 } from "uuid";

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalMain,
  Modal,
  ModalContainer,
} from "../TeacherModal/TeacherModal.styles";
import { FormInfo, Heading } from "../../GlobalForm.styles";

type AcceptedBy = {
  teacherName: string;
  teacher: string;
  date: string;
  teacherAvatar: string;
  points: number;
};

interface ModalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  acceptedBy: AcceptedBy[];
  offerId: string;
  userData: any;
  getData: any;
  setRoomId: any;
}

const TeacherOffersModal: React.FC<ModalProps> = ({
  setOpenModal,
  acceptedBy,
  offerId,
  userData,
  getData,
  setRoomId,
}) => {
  const [modalInfo, setModalInfo] = useState("");

  useEffect(() => {
    console.log(acceptedBy);
  });

  const handleSubmit: any = async (
    mail: string,
    date: string,
    points: number
  ) => {
    const inviteCode = uuidv4();
    setRoomId(inviteCode);
    const data = await API.planLesson(
      mail,
      date,
      userData.mail,
      offerId,
      inviteCode,
      points
    );

    if (data.ok) {
      setModalInfo("Zaplanowano lekcje!");
      getData();
      setTimeout(() => {
        setOpenModal(false);
      }, 3000);
    }
  };

  return (
    <Modal className={`TeacherModal`}>
      <ModalContainer>
        <ModalContent>
          <div className="scroll-container">
            <div className="modal-header modal-offers-col">
              {acceptedBy.length > 0 ? (
                acceptedBy.map((el, i) => {
                  return (
                    <div className="single-modal-offer" key={i}>
                      <div
                        className="modal-image"
                        onClick={() => {
                          console.log(el.teacher);
                          console.log(userData.mail);
                          console.log(offerId);
                          console.log(el.points);
                        }}
                      >
                        <img
                          src={`/assets/${el.teacherAvatar}`}
                          alt={el.teacherAvatar}
                        />
                      </div>
                      <div className="modal-header-info">
                        <b>{el.teacherName}</b>
                      </div>
                      <div className="modal-header-info">
                        {el.date.slice(6)} {el.date.slice(0, 5)}
                      </div>
                      <button
                        onClick={() => {
                          handleSubmit(el.teacher, el.date, el.points);
                        }}
                      >
                        Akceptuj ofertę
                      </button>
                    </div>
                  );
                })
              ) : (
                <Heading>Brak ofert</Heading>
              )}
              <FormInfo>{modalInfo}</FormInfo>
            </div>
          </div>
        </ModalContent>
        <ModalOverlay
          className="modal-overlay"
          onClick={() => {
            setOpenModal(false);
          }}
        ></ModalOverlay>
      </ModalContainer>
    </Modal>
  );
};

export default TeacherOffersModal;
