import React, { useEffect, useState } from "react";
import {
  SignForm,
  Input,
  Submit,
  Loader,
  FormWrapper,
  SignHeading,
  FormInfo,
  Label,
  SignAside,
} from "../../GlobalForm.styles";

import { Link, useNavigate } from "react-router-dom";
import API from "../../API";

type Props = {
  isLoggedIn: boolean;
};

const Register: React.FC<Props> = ({ isLoggedIn }) => {
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState<JSX.Element[]>();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!mail || !password) {
      setInfo([<>Uzupełnij dane</>]);
      setLoading(false);
      return;
    }

    setInfo([<></>]);

    const data = await API.signUpFetch(name, mail, password);

    console.log(data);

    if (data.ok) {
      setLoading(false);
      setInfo([<>Zarejestrowano</>]);
    } else {
      console.log(data.errors);
      if (data.errors.length) {
        console.log("test");
        let messages: JSX.Element[] = [];
        data.errors.forEach((el: any) => {
          messages.push(el.msg);
        });

        console.log(messages);
        setInfo(messages);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    //add a page to choose subjects
    if (isLoggedIn) navigate("/");
  }, []);

  return (
    <div className="sign-container light">
      <FormWrapper>
        <SignForm method="POST" onSubmit={handleSubmit}>
          <SignHeading>Dołącz już teraz!</SignHeading>
          <p>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              placeholder="Imię i nazwisko"
              required
              autoComplete="off"
            />
          </p>

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
              name="subject"
              placeholder="Hasło"
              required
              autoComplete="new-password"
            />
          </p>

          <p className="sign-label additional-info">
            Masz już konto?&nbsp;
            <Link to="/sign-in" style={{ color: "#000" }}>
              <b>Zaloguj się!</b>
            </Link>
          </p>

          {loading ? <Loader /> : null}
          <FormInfo>
            {info &&
              info.map((e, i) => {
                return <div key={i}>{e}</div>;
              })}
          </FormInfo>

          <p>
            <Submit style={{ margin: "auto" }} type="submit">
              Zarejestruj się
            </Submit>
          </p>
        </SignForm>

        <SignAside>
          <SignHeading>Masz już konto?</SignHeading>
          <p>Zaloguj się i ucz się razem z nami</p>
          <Link to="/sign-in">
            <button className="negative">Zaloguj się</button>
          </Link>
        </SignAside>
      </FormWrapper>
    </div>
  );
};

export default Register;
function signUpFetch(name: string, mail: string, password: string) {
  throw new Error("Function not implemented.");
}
