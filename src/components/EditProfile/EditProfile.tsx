import React, { RefObject, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API, { UserInfoType } from "../../API";
import ProfileHeader from "../Profile/ProfileHeader";
import "../TeacherModal/RadioBtns.css";
import "./EditProfile.css";
import {
  ButtonContainer,
  Form,
  FormInfo,
  FormWrapper,
  Heading,
  Input,
  Label,
  Loader,
  Select,
  Submit,
} from "../../GlobalForm.styles";

type Props = {
  isLoggedIn: boolean;
  loading: boolean;
  userData: UserInfoType | undefined;
  getData: any;
};

const EditProfile: React.FC<Props> = ({
  isLoggedIn,
  userData,
  loading,
  getData,
}) => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [img, setImage] = useState("");
  const [info, setInfo] = useState("");
  const [subjects, setSubjects] = useState([
    "polski",
    "angielski",
    "niemiecki",
    "matematyka",
    "biologia",
    "chemia",
    "fizyka",
    "geografia",
    "historia",
    "informatyka",
  ]);
  const [checkedSubjects, setCheckedSubjects] = useState<string[]>([]);
  const nameInput: any = useRef();
  const initial = useRef(0);

  const navigate = useNavigate();
  const profileLogos = [
    "bear.png",
    "cat.png",
    "cow.png",
    "dog.png",
    "fox.png",
    "ganesha.png",
    "koala.png",
    "panda-bear.png",
    "rabbit-pink.png",
    "rabbit.png",
  ];

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

  useEffect(() => {
    // console.log("islogged in edit page: " + isLoggedIn)

    if (!isLoggedIn) {
      console.log(isLoggedIn);
      navigate("/sign-in");
    }
    // getData();
  }, [isLoggedIn]);

  useEffect(() => {
    if (img == "") setImage(profileLogos[0]);
  }, []);

  useEffect(() => {
    if (!userData || !userData.subjects) return;

    console.log(userData.subjects);
    setCheckedSubjects(userData.subjects);

    setName(userData.name);
    setImage(userData.profileImage);
  }, [userData]);

  useEffect(() => {
    console.log(checkedSubjects);
  }, [checkedSubjects]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!userData || !userData.mail) return;

    if (name.length < 3) {
      setInfo("Nazwa powinna mieć przynajmniej 3 znaki");
      return;
    }

    const data = await API.editProfile(
      name,
      checkedSubjects,
      userData?.mail,
      img
    );
    console.log(data);

    if (data.ok) {
      setInfo("Zapisano zmiany!");
      getData();
    } else {
      setInfo("Nie zapisano zmian.");
    }
  };

  if (loading) return <>Loading...</>;

  return (
    <div className={`edit-container`}>
      <ProfileHeader userData={userData} />
      <FormWrapper>
        <>
          <Form method="post" onSubmit={handleSubmit} autoComplete="off">
            {/* <Heading>Edytuj profil</Heading> */}

            <div>
              <Label>Imię i nazwisko</Label>
              <Input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="username1"
                placeholder={userData?.name}
                autoComplete="off"
                value={name}
                ref={nameInput}
              />
            </div>

            <div className="section over-hide z-bigger">
              <Label>Przedmioty</Label>
              <div className="pb-5">
                <div className="row justify-content-center pb-5">
                  <div className="col-12 pb-5">
                    {userData &&
                      subjects.map((el: any, idx: any) => {
                        return (
                          <div className="subject-el" key={idx}>
                            <input
                              className="checkbox-tools"
                              type="checkbox"
                              name="chosenSubject"
                              defaultChecked={
                                userData?.subjects.find((e) => e == el)
                                  ? true
                                  : false
                              }
                              value={el}
                              id={"tool-" + idx}
                              onClick={(e) => {
                                if (e.currentTarget.checked)
                                  setCheckedSubjects([
                                    ...checkedSubjects,
                                    e.currentTarget.value,
                                  ]);
                                else
                                  setCheckedSubjects(
                                    checkedSubjects.filter(
                                      (el) => el !== e.currentTarget.value
                                    )
                                  );
                              }}
                            />
                            <label
                              className="for-checkbox-tools"
                              htmlFor={"tool-" + idx}
                            >
                              {el}
                            </label>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>

            <div className="section over-hide z-bigger">
              <Label>Zdjęcie profilowe</Label>
              <div className="pb-5">
                <div className="row justify-content-center pb-5">
                  <div className="col-12 pb-5">
                    {profileLogos.map((el, i) => {
                      return (
                        <img
                          onClick={() => {
                            setImage(el);
                          }}
                          key={i}
                          className={`profile-image ${
                            img == el ? "checked" : ""
                          }`}
                          src={`/assets/${el}`}
                          alt={el}
                        ></img>
                      );
                    })}
                  </div>
                </div>
              </div>
              <FormInfo>{info}</FormInfo>
              {loading ? <Loader /> : null}
            </div>

            <ButtonContainer>
              <Link to="/">
                <button type="button">Anuluj</button>
              </Link>
              <Submit
                onClick={() => {
                  setTimeout(() => {
                    navigate("/");
                  }, 1000);
                }}
              >
                Zapisz zmiany
              </Submit>
            </ButtonContainer>
          </Form>
        </>
      </FormWrapper>
    </div>
  );
};

export default EditProfile;
