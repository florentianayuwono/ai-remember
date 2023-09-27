import Modal from "react-modal";
import { close } from "../../assets";
import { TypeAnimation } from "react-type-animation";

const DiaryStaticModal = ({
  openState,
  handleClosePopup,
  title,
  content,
  handleEditDiary,
}) => {
  const [isDiaryOpen, setIsDiaryOpen] = openState;

  // Function to handle closing the modal and hiding VaraText
  const closeDiaryModal = () => {
    setIsDiaryOpen(false);
  };

  return (
    <>
      <div
        className={`bg-opacity-75 transition-opacity ${
          !isDiaryOpen && "opacity-0"
        }`}
      />
      <div>
        <Modal
          id={content}
          isOpen={isDiaryOpen}
          onRequestClose={handleClosePopup}
          contentLabel={content}
          ariaHideApp={false}
          className="relative m-5 sm:mx-auto my-20 transform overflow-y-auto rounded-lg bg-diary-paper bg-cover text-left shadow-xl h-4/5 transition-all sm:w-full sm:max-w-lg"
        >
          <div className="flex flex-col gap-x-4 max-w-sm flex-wrap m-5 sm:mx-auto my-10">
            <img
              src={close}
              alt="menu"
              className="w-[30px] h-[30px] object-contain cursor-pointer fixed right-5 top-5 bg-pink-500 p-1"
              onClick={closeDiaryModal}
            />
            <div className="bg-transparent sm:text-[30px] text-[20px] text-fuchsia-700 font-extralight">
              <TypeAnimation
                sequence={[title, 2000]}
                speed={50}
                repeat={0}
                cursor={false}
                className="font-handwriting-diary"
              />
            </div>
            <div className="bg-transparent sm:text-[26px] text-[16px] text-black italic text-ellipsis">
              <TypeAnimation
                sequence={[content, 2000]}
                speed={50}
                repeat={0}
                cursor={false}
                className="font-handwriting-user"
              />
            </div>

            <div className="flex flex-wrap gap-x-10 my-6 justify-start absolute bottom-10">
              <button
                className="bg-pink-500 hover:bg-pink-700 text-white w-24 h-10 py-2 px-4 rounded-3xl "
                type="submit"
                onClick={handleEditDiary}
              >
                Edit
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DiaryStaticModal;
