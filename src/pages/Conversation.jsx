import ReactGA from "react-ga4";
import { GiFairyWand } from "react-icons/gi";
import { FaRadio} from "react-icons/fa6";
import { useState, useEffect, useRef } from "react";
import {
  auth,
  firestore,
  getHumanMsg,
  updateDiaryCount,
} from "../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, getDocs } from "firebase/firestore";
import Loading from "./Loading";
import { Chat, ChatInput, DiaryModal, HomeNavbar,SearchModal } from "../components";
import {
  continueChat,
  startChat,
} from "../langchain_setup/ChatLangchainConfig";
import { diaryGenerator } from "../langchain_setup/DiaryLangChainConfig";

const Conversation = () => {
  const [user, loading] = useAuthState(auth);
  const bottomRef = useRef(null);
  let newDate = new Date();
  let displayDate = newDate.toLocaleDateString("en-En", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const [chats, loadingc, error] = useCollection(
    collection(firestore, "users", user.email, "dates", displayDate, "chats")
  );

  useEffect(() => {
    ReactGA.send({
      hitType: "pageview",
      page: "/conversation",
      title: "Conversation Page",
    });
  }, []);

  useEffect(() => {
    //create message for today
    const getNewContent = async () => {
      await startChat(user.email, displayDate);
    };

    //get old chat content
    const getOldContent = async () => {
      await continueChat(user.email, displayDate);
    };

    if (!loadingc && !loading) {
      if (chats?.docs.length == 0) {
        getNewContent();
      } else {
        getOldContent();
      }
    }
  }, [loading, loadingc]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  const DisplayDate = () => {
    return (
      <div className="mt-24 flex flex-col items-end mr-12">
        <div className=" font-handwriting-user text-2xl">{displayDate}</div>
      </div>
    );
  };

  return loading || loadingc ? (
    <Loading />
  ) : (
    <>
      <div className="relative z-0 h-screen justify-between flex flex-col bg-contain bg-note-paper text-secondary-brown overflow-hidden">
        <HomeNavbar />
        <DisplayDate />

        <div className=" overflow-auto">
          <Chat chats={chats} />
          <div ref={bottomRef} />
        </div>
        <div className="flex flex-col">
          <DiaryButton />
          <ChatInput email={user?.email} date={displayDate} />
        </div>
      </div>
    </>
  );
};

const DiaryButton = () => {
  const [user, loading] = useAuthState(auth);
  const openState = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = openState;
  const searchOpenState = useState(false);
  const [isSeachModalOpen, setIsSearchModalOpen] = searchOpenState;

  let newDate = new Date();
  let displayDate = newDate.toLocaleDateString("en-En", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [generateCount, setGenerateCount] = useState(0);

  const [query, setQuery] = useState("");

  const diaryCollectionRef = collection(
    firestore,
    "users",
    user.email,
    "dates"
  );

  const getDiary = async () => {
    try {
      const data = await getDocs(diaryCollectionRef);
      const diaries = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const foundDiary = diaries.find((diary) => diary.id === displayDate);

      if (foundDiary && foundDiary.diary !== "") {
        setContent(foundDiary.diary);
        setGenerateCount(foundDiary.generateDiaryCount);
      } else {
        fetchDiaryContent();
        setGenerateCount(async (prevCount) => {
          const updatedCount = prevCount + 1;
          await updateDiaryCount(user.email, displayDate, updatedCount);
          return updatedCount;
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Perform the asynchronous operation and update the state when it's done
  const fetchDiaryContent = async () => {
    try {
      const userChats = await getHumanMsg(user.email, displayDate);
      const content = await diaryGenerator(userChats);
      setContent(content);
    } catch (error) {
      // Handle errors if needed
      console.error("An error occurred:", error);
    }
  };

  const handleClosePopup = () => {
    setIsDiaryModalOpen(false);
  };

  const handleCloseSearchPopup = () => {
    setIsSearchModalOpen(false);
  };

  const openDiaryModal = () => {
    setIsDiaryModalOpen(true);
    getDiary();
  };

  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const handleRegenerateDiary = async () => {
    try {
      const data = await getDocs(diaryCollectionRef);
      const diaries = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      const foundDiary = diaries.find((diary) => diary.id === displayDate);

      if (foundDiary) {
        setGenerateCount(foundDiary.generateDiaryCount);
        console.log(generateCount);
        if (foundDiary.generateDiaryCount >= 5) {
          console.error("You can only generate diaries 5 times a day.");
          setTitle(
            "Sorry, but your current plan can only generate diaries 5 times a day😥. Uprade to pro for unlimited diaries!"
          );
        } else {
          try {
            const userChats = await getHumanMsg(user.email, displayDate);
            const newContent = await diaryGenerator(userChats);
            setGenerateCount(async (prevCount) => {
              const updatedCount = prevCount + 1;
              await updateDiaryCount(user.email, displayDate, updatedCount);
              return updatedCount;
            });
            setContent(newContent);
          } catch (error) {
            // Handle errors if needed
            console.error(
              "An error occurred while regenerating the diary:",
              error
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center cursor-pointer">
      { isSeachModalOpen && <SearchModal
          openState={searchOpenState}
          handleClosePopup={handleCloseSearchPopup}
          query={query}
          setQuery={setQuery}
          email={user.email}
          date={displayDate}
        /> }
      {isDiaryModalOpen ? (
        // Step 2: Use the imported DiaryModal component
        <DiaryModal
          openState={openState}
          handleClosePopup={handleClosePopup}
          title={title}
          content={content}
          setTitle={setTitle}
          setContent={setContent}
          email={user.email}
          handleRegenerateDiary={handleRegenerateDiary}
        />
      ) : (
        <div className="flex">
          <div
            className="flex items-center justify-center mb-2 mx-2 py-2 px-4 rounded-2xl bg-primary-pink bg-opacity-50 text-secondary-purple select-none"
            onClick={openDiaryModal}
          >
            <GiFairyWand />
            <div className="ml-2">
            Generate Diary
            </div>
          </div>
          <div
            className="flex items-center justify-center mb-2 mx-2 py-2 px-4 rounded-2xl bg-primary-purple bg-opacity-50 text-secondary-purple select-none"
            onClick={openSearchModal}
          >
            <FaRadio />
            <div className="ml-2">
            I'm feeling nostalgic
            </div>
            
          </div>

        </div>
      )}
    </div>
  );
};

export default Conversation;
