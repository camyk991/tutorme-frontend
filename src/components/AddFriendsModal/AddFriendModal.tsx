import React, { useEffect, useState } from "react";
import API from "../../API";

import {
  ModalOverlay,
  ModalContent,
  Modal,
  ModalContainer,
} from "../TeacherModal/TeacherModal.styles";
import {
  FormInfo,
  FormHeading,
  Input,
  Loader,
  Label,
  Submit,
} from "../../GlobalStyles";

import { Form, Link } from "react-router-dom";
import "./AddFriendModal.css";

interface ModalProps {
  userData: any;
  setFriendModal: any;
  getData: any;
}

const AddFriendModal: React.FC<ModalProps> = ({ userData, setFriendModal, getData }) => {
  const [modalInfo, setModalInfo] = useState("");
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit: any = async (e: any) => {
    e.preventDefault();

    if (id == "" || !userData || !userData.id) return;

    const data = await API.addFriend(userData.id, id);

    if (data.ok) {
      setModalInfo("Dodano znajomego!");
      getData();
    } else {
      setModalInfo("Nie znaleziono");
    }
  };

  return (
    <Modal
      className={`TeacherModal ${userData?.theme || "light"}`}
      style={{ height: "100%" }}
    >
      <ModalContainer>
        <ModalContent>
          <div className="scroll-container">
            <div className="modal-header ">
              <form
                className="add-friend-form"
                method="POST"
                onSubmit={handleSubmit}
              >
                <FormHeading> Dodaj znajomego!</FormHeading>
                <p>
                  <Input
                    onChange={(e) => setId(e.target.value)}
                    onClick={handleSubmit}
                    value={id}
                    type="text"
                    placeholder="Podaj id znajomego"
                    required
                    autoComplete="off"
                  />
                </p>

                {loading ? <Loader /> : null}
                <FormInfo>{modalInfo}</FormInfo>

                <p className="add-friend-submit-row">
                  <Submit style={{ margin: "auto" }} type="submit">
                    Dodaj
                  </Submit>
                </p>
              </form>
            </div>
          </div>
        </ModalContent>
        <ModalOverlay
          className="modal-overlay"
          onClick={() => {
            setFriendModal(false);
          }}
        ></ModalOverlay>
      </ModalContainer>
    </Modal>
  );
};

export default AddFriendModal;
