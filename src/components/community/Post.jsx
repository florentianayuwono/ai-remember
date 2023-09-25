import InputForm from "../common/InputForm";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { AiFillDelete, AiOutlineDelete } from "react-icons/ai";
import { BiPencil } from "react-icons/bi";
import { firestore } from "../../firebase_setup/FirebaseConfig";

const PostCard = ({ post, user, title, content, id, handleDeletePost }) => {
  return (
    <div className="mb-4 bg-white hover:bg-gray-100 rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-32 overflow-y-hidden flex justify-between">
      <div>
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{content}</p>
      </div>
      {user.uid === post.data().author_uid ? (
        <AiFillDelete className="cursor-pointer w-6 h-6" onClick={() => handleDeletePost(post.id)} />
      ) : null}
    </div>
  );
};

const PostModal = ({ openState, handleClosePopup, title, content, setTitle, setContent, handleSubmitPost }) => {
  const [isOpen, setIsOpen] = openState;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className={`fixed inset-0 bg-opacity-75 transition-opacity ${!isOpen && "opacity-0"}`} />
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={handleClosePopup}
          contentLabel="Post Modal"
          ariaHideApp={false}
          className="relative mx-auto transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div className="flex flex-col gap-x-4 max-w-sm sm:flex-wrap mx-auto my-10">
            <InputForm title="Title" value={title} htmlValue="title" handleChange={handleTitleChange} placeholder="Title for your post" />
            <InputForm
              title="Content"
              value={content}
              htmlValue="content"
              handleChange={handleContentChange}
              placeholder="Content for your post"
            />

            <div className="flex flex-wrap gap-x-10 my-6 ">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white w-24 h-10 py-2 px-4 rounded-3xl "
                type="submit"
                onClick={handleSubmitPost}
              >
                Post
              </button>
              <button
                className="border border-purple-500 bg-white text-purple-700 hover:bg-purple-400 hover:text-white w-24 h-10 py-2 px-4 rounded-3xl "
                type="submit"
                onClick={handleClosePopup}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
export { PostCard, PostModal };
