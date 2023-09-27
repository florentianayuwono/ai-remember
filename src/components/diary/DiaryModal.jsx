import Modal from "react-modal";
import { close } from "../../assets";
import { updateDiaryContent } from "../../firebase_setup/FirebaseConfig";
import { auth, getHumanMsg } from "../../firebase_setup/FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { diaryGenerator } from "../../langchain_setup/DiaryLangChainConfig";

const DiaryModal = ({ openState, handleClosePopup, title, content, setTitle, setContent, email, handleRegenerateDiary }) => {
  const [isDiaryOpen, setIsDiaryOpen] = openState;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitDiary = async () => {
    let newDate = new Date();
    let displayDate = newDate.toLocaleDateString("en-En", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    await updateDiaryContent(email, displayDate, content);
    handleClosePopup();
  }

  return (
    <>
      <div className={`bg-opacity-75 transition-opacity ${!isDiaryOpen && "opacity-0"}`} />
      <div>
        <Modal
          isOpen={isDiaryOpen}
          onRequestClose={handleClosePopup}
          contentLabel="Diary Modal"
          ariaHideApp={false}
          className="relative m-5 sm:mx-auto my-20 transform overflow-y-auto rounded-lg bg-diary-paper bg-cover text-left shadow-xl h-4/5 transition-all sm:w-full sm:max-w-lg"
        >
          <div className="flex flex-col gap-x-4 max-w-sm flex-wrap m-5 sm:mx-auto my-10">
          <img src={close} alt="menu" className="w-[30px] h-[30px] object-contain cursor-pointer fixed right-5 top-5 bg-pink-500 p-1" onClick={handleClosePopup} />
            <textarea className="bg-transparent sm:text-[20px] text-[16px] text-red-600 placeholder:text-red-600 italic" value={title} onChange={handleTitleChange} placeholder="A day in my 🌟life🌟!">{title}</textarea>
            <textarea className="bg-transparent sm:text-[18px] text-[14px] text-black italic" rows="10" value={content} onChange={handleContentChange} placeholder="Dear diary, today I spilled the tea hehe.">{content}</textarea>

            <div className="flex flex-wrap gap-x-10 my-6 justify-start absolute bottom-10">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white w-24 h-10 py-2 px-4 rounded-3xl "
                type="submit"
                onClick={handleSubmitDiary}
              >
                Save
              </button>
              <button
                className="border border-purple-500 bg-white text-purple-700 hover:bg-purple-500 hover:text-white w-auto h-10 py-2 px-4 rounded-3xl "
                type="submit"
                onClick={handleRegenerateDiary}
              >
                Regenerate diary
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DiaryModal;