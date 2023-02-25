type friendType = {
  id: string;
  name: string;
  avatar: string;
}

export type UserInfoType = {
  id: string;
  name: string;
  mail: string;
  token: string;
  profileImage: string;
  subjects: string[];
  points: number;
  theme: string;
  friends: friendType[]
};

export default {
  signUpFetch: async (name: string, mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/register`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        mail: mail,
        password: password,
        theme: "light",
      }),
    });

    return await res.json();
  },

  signInFetch: async (mail: string, password: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/login`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        password: password,
      }),
    });

    return await res.json();
  },

  getUserDataFetch: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getData`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  getUserThemeFetch: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getTheme`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  postOfferFetch: async (
    title: string,
    subject: string,
    info: string,
    price: string,
    email: string,
    dateItems: string[]
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/postoffer`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        subject: subject,
        info: info || "brak",
        price: price,
        email: email,
        dates: dateItems,
      }),
    });

    return await res.json();
  },

  putTheme: async (theme: string, email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/updatetheme`;

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        theme: theme,
      }),
    });

    return await res.json();
  },

  editProfile: async (
    username: string,
    subjects: string[],
    email: string,
    img: string
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/editProfile`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: email,
        username: username,
        subjects: subjects,
        profileImage: img,
      }),
    });

    return await res.json();
  },

  //getting users subjects depending on their email
  getSubjects: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getSubjects`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  //getting featured offers for user
  getChosenOffers: async (subject: string, mail: string | undefined) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getChosenOffers`;

    if (!mail) return;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subject: subject,
        mail: mail,
      }),
    });

    return await res.json();
  },

  getPoints: async (mail: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getPoints`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
      }),
    });

    return await res.json();
  },

  updatePoints: async (points: number, email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/updatePoints`;

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        points: points,
      }),
    });

    return await res.json();
  },

  getUserOffers: async (email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getUserOffers`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: email,
      }),
    });

    return await res.json();
  },

  sendOfferRequest: async (
    mail: string,
    date: string,
    id: string,
    points: number
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/sendOfferRequest`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: mail,
        date: date,
        id: id,
        points: points,
      }),
    });

    return await res.json();
  },

  planLesson: async (
    teacherMail: string,
    date: string,
    studentMail: string,
    offerId: string,
    lessonUrl: string,
    points: number
  ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/planLesson`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        teacherMail: teacherMail,
        date: date,
        studentMail: studentMail,
        offerId: offerId,
        lessonUrl: lessonUrl,
        points: points,
        completed: false,
      }),
    });

    return await res.json();
  },

  getLessons: async (email: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/getLessons`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        mail: email,
      }),
    });

    return await res.json();
  },

  updateCompletedLesson: async (email: string, url: string) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/updateCompletedLesson`;

    const res = await fetch(endpoint, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        url: url,
      }),
    });

    return await res.json();
  },

  addFriend: async (inviterId: string, friendId: string ) => {
    const endpoint = `${process.env.REACT_APP_API_URL}/api/addFriend`;

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        inviterId: inviterId,
        friendId: friendId,
      }),
    });

    return await res.json();
  },
};
