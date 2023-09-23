import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { useState, useEffect } from "react";
import Calendar from "../components/diary/Calendar";
import { auth } from "../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";
import { getDocs, collection } from "firebase/firestore";
import { firestore } from "../firebase_setup/FirebaseConfig";

const Diary = () => {
  const [user, loading] = useAuthState(auth);
  const [diaryList, setDiaryList] = useState([]);

  const diaryCollectionRef = collection(
    firestore,
    "users",
    user.email,
    "dates"
  );

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/diary", title: "Diary Page" });

    const getDiaryList = async () => {
      try {
        const data = await getDocs(diaryCollectionRef);
        const diaries = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

        const diariesByMonth = diaries.reduce((acc, diary) => {
          const dateObject = new Date(diary.id);
          const monthKey = `${dateObject.getMonth()}`;

          const month = [monthNames[monthKey]];

          if (!acc[month]) {
            acc[month] = [];
          }

          acc[month].push(diary);

          return acc;
        }, {});

        const processedDiaries = Object.keys(diariesByMonth).map((monthKey) => ({
          month: monthKey,
          diaries: diariesByMonth[monthKey],
        }));

        setDiaryList(processedDiaries);
        console.log(processedDiaries);
      } catch (error) {
        console.error(error);
      }
    };

    getDiaryList();
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 bg-primary-lightpink">
      <HomeNavbar />
      <Calendar diaries={diaryList} />
    </div>
  );
};

export default Diary;
