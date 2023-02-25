import React from "react";

import { AchievementMain } from "./AchievementModal.styles";

import {
  ModalOverlay,
  ModalContent,
  Modal,
  ModalContainer,
} from "../TeacherModal/TeacherModal.styles";

import { FormInfo, Heading } from "../../GlobalForm.styles";

interface ModalProps {
  src: string;
  title: string;
  info: string;
  hideModal: any;
}

const AchievementModal: React.FC<ModalProps> = ({
  src,
  title,
  info,
  hideModal,
}) => {
  return (
    <Modal className={`AchievementModal`}>
      <ModalContainer>
        <ModalContent>
          <AchievementMain>
            <img
              style={{ width: "300px", height: "300px" }}
              src={src}
              alt="badge"
            />
            <Heading style={{ marginBottom: "5px" }}>{title}</Heading>
            <FormInfo>{info}</FormInfo>
          </AchievementMain>
        </ModalContent>
        <ModalOverlay onClick={hideModal}></ModalOverlay>
      </ModalContainer>
    </Modal>
  );
};

export default AchievementModal;
