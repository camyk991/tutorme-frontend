import React, { useEffect, useState } from "react";
import {
  SignForm,
  Input,
  Submit,
  Loader,
  FormWrapper,
  SignHeading,
  SignAside,
  Label,
  FormInfo,
} from "../../GlobalForm.styles";

import { Link, useNavigate } from "react-router-dom";
import API, { UserInfoType } from "../../API";

type Props = {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUserData: React.Dispatch<React.SetStateAction<UserInfoType | undefined>>;
};

const Login: React.FC<Props> = ({ isLoggedIn, setLoggedIn, setUserData }) => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!mail || !password) {
      setInfo("Uzupełnij dane");
      setLoading(false);
      return;
    }

    setInfo("");

    const data = await API.signInFetch(mail, password);

    console.log(data);

    if (data.ok) {
      setLoading(false);
      setInfo("Zalogowano!");
      setLoggedIn(true);
      setUserData(data.user);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } else {
      setInfo(data.error);
      setLoggedIn(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
    // console.log("isloggedin login page: " + isLoggedIn)
  }, []);

  return (
    <div className="sign-container light">
      <FormWrapper>
        <SignForm method="POST" onSubmit={handleSubmit}>
          <SignHeading>Witaj ponownie!</SignHeading>
          <p>
            <Input
              onChange={(e) => setMail(e.target.value)}
              value={mail}
              type="email"
              name="mail"
              placeholder="E-mail"
              required
              autoComplete="off"
            />
          </p>

          <p>
            <Input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              name="password"
              placeholder="Hasło"
              required
              autoComplete="new-password"
            />
          </p>
          <p className="additional-info">
            Nie masz konta?
            <Link to="/sign-up" style={{ color: "#000" }}>
              <b>&nbsp;Zarejestruj się!</b>
            </Link>
          </p>

          <FormInfo>
            {info}
            {loading ? <Loader /> : null}
          </FormInfo>

          <p>
            <Submit style={{ margin: "auto" }} type="submit">
              Zaloguj się
            </Submit>
          </p>
        </SignForm>

        <SignAside>
          <SignHeading>Pierwszy raz?</SignHeading>
          <p>Zarejestruj się i zacznij się uczyć razem z nami</p>
          <Link to="/sign-up">
            <button className="negative">Zarejestruj się</button>
          </Link>
        </SignAside>
      </FormWrapper>
    </div>
  );
};

export default Login;
