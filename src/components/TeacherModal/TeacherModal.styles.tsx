import styled from "styled-components";

export const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

export const ModalContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

export const ModalContent = styled.div`
  min-width: 45vw;
  position: absolute;
  top: 20vh;
  left: 50%;
  transform: translate(-50%);
  z-index: 10;
  background-color: var(--light-bg);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: var(--main-font);

  /* max-height: 600px;
  overflow: auto; */

  @media (max-width: 840px) {
    min-width: 65vw;
  }

  @media (max-width: 540px) {
    min-width: 80vw;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  border-bottom: 2px solid var(--bg);
`;

export const ModalMain = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1.8rem;
  text-align: center;
  padding: 0 1.2rem;
`;

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: var(--bg);
  padding: 1.2rem;
  border-radius: 0 0 2rem 2rem;
`;

export const ModalOverlay = styled.div`
  z-index: -1;
  width: auto;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.404);
`;

export const ModalSubHeaders = styled.h3`
  font-weight: 600;
  margin-bottom: 0.6rem;
`;
