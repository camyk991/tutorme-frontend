import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 70px;
  max-width: 80vw;
  width: 100%;
  background-color: var(--light-bg);
  padding: 70px 15%;
  border-radius: 1rem;
  -webkit-box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);
  -moz-box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);
  box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);

  color: var(--main-font);

  p {
    display: flex;
  }
`;

export const Label = styled.p`
  width: 100%;
  font-family: Lexend;
  font-size: 18px;
  color: var(--secondary-font);
  text-align: center;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  width: 100%;
  font-family: Lexend;
  border: none;
  font-size: 14px;
  line-height: 16px;
  color: var(--secondary-font);
  font-weight: 500;
  padding: 13px 20px;
  border-radius: 10px;
  background: transparent;
  border: 2px solid var(--bg);
  outline: none;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 200px;
  font-family: Lexend;
  border: none;
  font-size: 14px;
  line-height: 16px;
  color: var(--secondary-font);
  font-weight: 500;
  padding: 13px 20px;
  border-radius: 10px;
  background: transparent;
  border: 2px solid var(--bg);
  outline: none;
  max-width: 100%;
`;

export const Submit = styled.button`
  border-radius: 60px;
  font-size: 14px;
  font-weight: 700;
  background: var(--accent);
  display: inline-block;
  padding: 13px 20px;
  width: auto;
`;

export const FormInfo = styled.div`
  text-align: center;
`;

export const Loader = styled.div`
  @keyframes spin {
    0% {
      -webkit-transform: rotate(0deg);
      tranform: rotate(0deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      tranform: rotate(360deg);
    }
  }

  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  vertical-align: middle;
  border-radius: 50px;
  border: 6px solid rgba(255, 255, 255, 0.4);
  margin: 10px auto 0;

  ::after {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    bottom: -6px;
    right: -6px;
    border-radius: 50px;
    border: 6px solid transparent;
    border-top-color: #fff;
    -webkit-animation: spin 1s linear infinite;
    animation: spin 1s linear infinite;
  }
`;

export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 50px;
  align-items: center;
`;

export const Heading = styled.h1`
  text-align: center;
`;

export const SuccessAlert = styled.div`
  color: #ffffff;
  background-color: #7ddf7c;
  font-family: "Source Sans Pro", sans-serif;
  border-radius: 0.5em;
  border: 1px solid;
  margin: auto;
  padding: 12px;
  width: 400px;
`;

export const Select = styled.input`
  width: 100%;
  font-family: Lexend;
  border: none;
  font-size: 14px;
  line-height: 16px;
  color: #999;
  font-weight: 500;
  padding: 13px 20px;
  border-radius: 60px;
  background: var(--blue);
  outline: none;

  ::placeholder {
    color: #999;
  }
`;

type Button = {
  show: boolean;
};

export const LanguagesWrapper = styled.div<Button>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: ${(e) => (e.show ? `scale(1)` : `scale(0)`)};
  height: ${(e) => (e.show ? `100%` : `0`)};

  label {
    display: flex;
    gap: 10px;
  }
`;
