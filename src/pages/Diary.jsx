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

        const diariesByMonth = Array.from({ length: 12 }, (_, monthKey) => ({
          month: monthNames[monthKey],
          diaries: [],
        }));

        diaries.forEach((diary) => {
          const dateObject = new Date(diary.id);
          const monthKey = dateObject.getMonth();
          diariesByMonth[monthKey].diaries.push(diary);
        });

        const processedDiaries = Object.values(diariesByMonth);

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
      {diaryList.map((entry) => {
        const { month, diaries } = entry;
        return <Calendar key={month} month={month} diaries={diaries} />;
      })}
    </div>
  );
};

export default Diary;
