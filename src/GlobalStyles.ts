import { createGlobalStyle } from "styled-components";
import styled from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
  --bg: #F4F4F7;
  --light-bg: #fff;
  --main-font: #000;
  --secondary-font: #606060;
  --accent: #4386e6;
  --accent-alpha: #4386e6;
  --secondary-accent: #ffa34e;
  --reverse-font: #000;
  --hover:#eef5f7;
  --border: #fff;
}

.light {
  --bg: #F4F4F7;
  --light-bg: #fff;
  --main-font: #000;
  --secondary-font: #606060;
  --accent: #ff69b4;
  --accent-alpha: #ff69b499;
  --secondary-accent: #ffa34e;
  --reverse-font: #fff;
  --hover:#eef5f7;
  --border: #fff;
}

.dark {
  --bg: #1a1a1a;
  --light-bg: #262625;
  --main-font: #fff;
  --secondary-font: rgb(218, 218, 218);
  --accent: #845695;
  --accent-alpha: #84569580;
  --secondary-accent: #ffa34e;
  --reverse-font: #fff;
  --hover:#353636;
  --border: #111;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap");

  * {
    font-family: "Poppins", sans-serif;
  }

  html {
    background-color: var(--bg);
  }

  /* width */
  ::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #797a79;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #845695;
  }

  body {
    background-color: var(--bg);
    color: var(--main-font);

    font-size: 14px;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  p,
  a {
    font-weight: 300;
  }

  a {
    text-decoration: none;
    color: var(--main-font);
  }

  .sign-container{
    background-color: var(--bg);
    margin-top: 7vh;
  }

  .edit-container{
    background-color: var(--bg);
    min-height: 100vh;

  }

  button {
    /* margin-top: 32px; */
    cursor: pointer;
    background-color: var(--accent);
    border: 2px solid var(--accent);
    color: #fff;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    border-radius: 60px;
    gap: 10px;
    transition: all 0.2s ease;

    :hover{
      background-color: transparent;
      border: 2px solid var(--accent);
      color: var(--accent);
    }
  }

  button.negative{
    background-color: transparent;
    border: 2px solid #fff;
    padding: 12px 24px;

    :hover{
      background-color: #fff;
      border: 2px solid #fff;
      color: var(--accent);
    }
  }


  #nav {
    position: fixed;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--light-bg);
    background-color: var(--bg);
    text-decoration: none;
    padding: 16px 5%;
    z-index: 999;
  }

  #logo {
    display: flex;
    align-items: center;
    gap: 16px;
    font-size: 22px;
    font-weight: 700;
    line-height: 0;
    margin: 0;
    color: var(--main-font);
  }

  .sign-label{
      display: none;
    }

  @media (max-width: 640px) {
    #logo span {
      display: none;
    }

    .sign-label{
      display: flex;
    }
  }

  #logo img {
    height: 42px;
  }

  #nav a {
    text-decoration: none;
  }

  #nav__links {
    display: flex;
    align-items: center;
    column-gap: 2em;
  }

  .nav__link {
    color: #fff;
    text-decoration: none;
    transition: 1s;
    border-bottom: 2px solid transparent;
    transition: all 0.3s ease-in-out;
    padding-bottom: 1px;
  }

  @media (max-width: 520px) {
    #nav__links {
      column-gap: 3em;
    }
  }

  .nav__link:hover {
    color: rgb(230, 228, 228);
    text-decoration: none;
    border-color: #845695;
  }

  #create__room__btn {
    display: block;
    background-color: #845695;
    padding: 8px 24px;
    font-size: 14px;
    font-weight: 500;
    border-radius: 5px;
  }

  #create__room__btn:hover {
    background-color: #845695;
  }

  .nav--list {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  #members__button,
  #chat__button {
    display: none;
    cursor: pointer;
    background: transparent;
    border: none;
  }

  #members__button:hover svg > path,
  #chat__button:hover svg,
  .nav__link:hover svg {
    fill: #845695;
  }

  .nav__link svg {
    width: 0;
    height: 0;
  }

  @media (max-width: 640px) {
    #members__button {
      display: block;
    }

    .nav__link svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    .nav__link,
    #create__room__btn {
      font-size: 0;
      border: none;
    }

    #create__room__btn {
      padding: 0;
      background-color: transparent;
      border-radius: 50%;
    }

    #create__room__btn:hover {
      background-color: transparent;
    }
  }


`;

export const SignForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
  max-width: 40vw;
  width: 100%;
  height: 75vh;
  background-color: var(--light-bg);
  padding: 70px 5%;
  border-radius: 1rem 0rem 0rem 1rem;
  -webkit-box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);
  -moz-box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);
  box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);

  p:not(.additional-info) {
    display: flex;
  }

  p.additional-info {
    display: none;
    width: 100%;
    font-family: Lexend;
    font-size: 18px;
    color: var(--secondary-font);
    text-align: center;
    margin-bottom: 10px;
  }

  @media (max-width: 860px) {
    p.additional-info {
      display: flex;
    }
  }

  @media (max-width: 640px) {
    p.additional-info {
      font-size: 14px;
    }
  }

  @media (max-width: 860px) {
    max-width: 60vw;
    border-radius: 1rem;
  }

  @media (max-width: 540px) {
    max-width: 80vw;
  }
`;

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

export const SignAside = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 25vw;
  height: 75vh;
  background-color: var(--accent);
  padding: 40px 2%;
  text-align: center;
  border-radius: 0rem 1rem 1rem 0rem;
  -webkit-box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);
  -moz-box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);
  box-shadow: 8px 8px 28px -15px rgba(66, 87, 90, 0.85);

  p {
    display: flex;
    color: var(--light-bg);
  }

  h1 {
    color: var(--light-bg);
  }

  @media (max-width: 860px) {
    max-width: 30vw;
    display: none;
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
  font-size: 16px;
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
  color: red;
  padding: 40px 10px;
  flex-wrap: wrap;
  align-items: center;
  font-size: 16px;
  background-color: var(--bg);
  color: var(--main-font);
`;

export const SignHeading = styled.h1`
  text-align: center;
  color: var(--accent);
  font-weight: 600;
  font-size: 34px;
  margin-bottom: 20px;
`;

export const FormHeading = styled.div`
  text-align: center;
  color: var(--accent);
  font-weight: 600;
  font-size: 34px;
  margin-bottom: 20px;
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

// export const LanguagesWrapper = styled.div<Button>`
//   display: flex;
//   flex-direction: column;
//   gap: 10px;
//   transform: ${(e) => (e.show ? `scale(1)` : `scale(0)`)};
//   height: ${(e) => (e.show ? `100%` : `0`)};

//   label {
//     display: flex;
//     gap: 10px;
//   }
// `;

export const FormWrapper2 = styled.div`
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
  color: var(--main-font);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  gap: 20px;
  align-items: center;
`;
