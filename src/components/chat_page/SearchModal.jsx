import Modal from "react-modal";
import { close } from "../../assets";
import { AiOutlineEnter } from "react-icons/ai";
import { useState } from "react";
import { askingForPastEvents } from "../../langchain_setup/ChatLangchainConfig";
import { canPerformSearch } from "../../firebase_setup/FirebaseConfig";

const SearchModal = ({
  openState,
  handleClosePopup,
  query,
  setQuery,
  email,
  date
}) => {
  const [isSearchOpen, setIsSearchOpen] = openState;
  const [canSubmit, setCanSubmit] = useState(true);
  const [content, setContent] = useState("paw paw will find your precious memory 🌟 (But take note that paw paw is a creative young bear that will create memories if it can't find one)");

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmitSearch = async () => {
    const canSearch = await canPerformSearch(email,date);
    setCanSubmit(false);
    if (canSearch) {
      setContent("paw paw🐻 is on a fuzzy-wuzzy quest🌟 to hunt down the memory you're beary eager to find...")
      const response = await askingForPastEvents(email, query);
      setContent(response);
    } else {
      setContent("Please upgrade to PRO to relive your memories more than once per day :(")
    }
    setQuery("");
    setCanSubmit(true);
  };

  return (
    <>
      <div
        className={`bg-opacity-75 transition-opacity ${
          !isSearchOpen && "opacity-0"
        }`}
      />
      <div>
        <Modal
          isOpen={isSearchOpen}
          shouldCloseOnOverlayClick={false}
          onRequestClose={handleClosePopup}
          contentLabel="Search Modal"
          ariaHideApp={false}
          className="relative m-5 outline-none sm:mx-auto my-20 transform rounded-lg overflow-hidden bg-search-paper bg-contain text-left shadow-xl h-4/5 transition-all sm:w-full sm:max-w-lg"
        >
          <div className="flex flex-col overflow-hidden gap-x-4 max-w-sm flex-wrap m-4 sm:mx-auto my-8">
            <img
              src={close}
              alt="menu"
              className="w-[30px] h-[30px] object-contain cursor-pointer rounded-md fixed right-5 top-5 bg-secondary-green p-2"
              onClick={handleClosePopup}
            />
            <div
              className="overflow-auto bg-white px-4 py-2 rounded-2xl bg-opacity-90 flex flex-row outline-none text-[14px] text-black italic"
            >
              {content}
            </div>

            <div className="flex flex-row justify-center w-2/3 items-center gap-x-3 my-6 absolute bottom-4 mx-6">
            <textarea
              className="bg-white bg-opacity-90 p-2 w-full rounded-2xl outline-none text-[16px] text-secondary-brown"
              value={query}
              onChange={handleQueryChange}
              placeholder="Share with me my happy memory"
            />
              <button
                className=" bg-secondary-green disabled:bg-gray-500 flex justify-center hover:bg-secondary-lightgreen text-white p-4 rounded-2xl "
                type="submit"
                disabled={!canSubmit}
                onClick={handleSubmitSearch}
              >
                <AiOutlineEnter size={20} />
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SearchModal;
