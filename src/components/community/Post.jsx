import InputForm from "../common/InputForm";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc, collection } from "firebase/firestore";
import { AiFillDelete, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiPencil, BiArrowBack, BiComment } from "react-icons/bi";
import { firestore } from "../../firebase_setup/FirebaseConfig";
import { Loading } from "../../pages";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import HomeNavbar from "../common/HomeNavbar";
import { Comment } from "./Comment";
import DiaryStaticModal from "../diary/DiaryStaticModal";

const Post = ({ user }) => {
  const { id } = useParams();
  const docRef = doc(firestore, "community", id);
  const [post, loading, error] = useDocument(docRef);
  const openState = useState(false);
  const [isDiaryModalOpen, setIsDiaryModalOpen] = openState;

  if (error) {
    toast.error("Error occured: " + error);
  }

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 h-screen bg-primary-lightpink text-secondary-brown overflow-y-scroll">
      <HomeNavbar />
      <div className="absolute top-[120px] w-screen">
        <div className="mb-4 bg-white hover:bg-gray-100 rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-fit overflow-y-hidden flex justify-between">
          <div>
            <GoBack />
            <div className="flex flex-row gap-x-10 items-center text-sm justify-between">
              <h1>{post.data().is_anon ? "Anon" : post.data().author_name}</h1>
              <p>{new Date(post?.data().timestamp?.toDate())?.toLocaleString()}</p>
            </div>

            <h2 className="text-xl font-semibold mb-2">{post.data().title}</h2>
            <p className="text-gray-600">{post.data().content}</p>
            <div className="flex justify-between">
              <div className="flex gap-x-2">
                <LikePost post={post} user={user} />
                <CommentPost post={post} />
              </div>
              <DeletePost post={post} user={user} />
            </div>
            <div className="w-full flex justify-center">
              <button
                className="bg-purple-500 hover:bg-purple-700 text-white w-fit h-10 py-2 px-4 rounded-3xl "
                type="submit"
                onClick={() => setIsDiaryModalOpen(true)}
              >
                View as Diary
              </button>
            </div>
          </div>
        </div>
        <Comment user={user} post={post} />
      </div>
      <DiaryStaticModal
        openState={openState}
        handleClosePopup={() => setIsDiaryModalOpen(false)}
        title={post.data().title}
        content={post.data().content} // You can pass the content corresponding to the selected day here
        handleEditDiary={() => {}}
      />
    </div>
  );
};

const PostCard = ({ post, user }) => {
  const [title, setTitle] = useState(post.data().title);
  const [content, setContent] = useState(post.data().content);

  return (
    <>
      <div className="mb-4 bg-white hover:bg-gray-100 rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm h-40 overflow-y-hidden ">
        <div>
          <div className="flex flex-row gap-x-10 items-center text-sm justify-between">
            <h1>{post.data().is_anon ? "Anon" : post.data().author_name}</h1>
            <p>{new Date(post?.data().timestamp?.toDate())?.toLocaleString()}</p>
          </div>
          <Link to={`/post/${post.id}`}>
            <div className="w-full overflow-y-hidden text-ellipsis">
              <h2 className="text-xl h-8 font-semibold mb-1 text-ellipsis line-clamp-1">{title}</h2>
              <p className="text-gray-600 h-12 text-ellipsis line-clamp-2">{content}</p>
            </div>
          </Link>
          <div className="flex justify-between">
            <div className="flex gap-x-2">
              <LikePost post={post} user={user} />
              <Link to={`/post/${post.id}`}>
                <CommentPost post={post} />
              </Link>
            </div>
            <DeletePost post={post} user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

const CreatePostModal = ({
  user,
  openState,
  handleClosePopup,
  title,
  content,
  isAnon,
  setTitle,
  setContent,
  setIsAnon,
  handleSubmitPost,
}) => {
  const [isOpen, setIsOpen] = openState;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleCheckboxChange = () => {
    setIsAnon(!isAnon);
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
            <ChooseDiary user={user} setTitle={setTitle} setContent={setContent} />
            <InputForm
              title="Title"
              value={title || ""}
              htmlValue="title"
              handleChange={handleTitleChange}
              placeholder="Title for your post"
            />
            <InputForm
              title="Content"
              value={content || ""}
              htmlValue="content"
              handleChange={handleContentChange}
              placeholder="Content for your post"
            />
            <div className="flex items-center mb-4 bg-white">
              <input
                id="default-checkbox"
                type="checkbox"
                value={isAnon}
                className=" h-6 w-6 accent-gray-700  bg-grey-700 text-red-500  rounded cursor-pointer"
                onChange={handleCheckboxChange}
              />
              <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Post anonymously?</label>
            </div>
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

const EditPostModal = ({ openState, id, title, content, setTitle, setContent, handleClosePopup, handleEditPost }) => {
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
                onClick={() => handleEditPost(id, title, content)}
              >
                Edit
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

const DeletePost = ({ user, post }) => {
  const postDocRef = doc(firestore, "community", post.id);

  const handleDeletePost = async (id) => {
    try {
      await deleteDoc(postDocRef);
      toast.success("Successfully deleted post!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div>
      {user?.uid === post.data().author_uid ? (
        <AiFillDelete className="cursor-pointer w-6 h-6" onClick={() => handleDeletePost(post.id)} />
      ) : null}
    </div>
  );
};

const LikePost = ({ user, post }) => {
  const postDocRef = doc(firestore, "community", post.id);
  const likes = post.data().likes;
  const userLiked = likes.includes(user?.uid);

  const handleLike = async () => {
    try {
      if (userLiked) {
        await updateDoc(postDocRef, { likes: arrayRemove(user?.uid) });
      } else {
        await updateDoc(postDocRef, { likes: arrayUnion(user?.uid) });
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-row items-center gap-x-1">
      {!userLiked && <AiOutlineLike className="cursor-pointer" onClick={handleLike} />}
      {userLiked && <AiFillLike className="cursor-pointer" onClick={handleLike} />}
      {likes.length}
    </div>
  );
};

const CommentPost = ({ post }) => {
  return (
    <div className="flex flex-row items-center gap-x-1">
      <BiComment />
      {post.data().comment_count ?? 0}
    </div>
  );
};

const ChooseDiary = ({ user, setTitle, setContent }) => {
  const [selectedTitle, setSelectedTitle] = useState("");
  const [selectedContent, setSelectedContent] = useState("");

  const diaryCollectionRef = collection(firestore, "users", user?.email, "dates");
  const [diaries, loading, error] = useCollection(diaryCollectionRef);

  const handleSelectChange = (option) => {
    const selectedIndex = option.target.options.selectedIndex;
    const id = option.target.options[selectedIndex].getAttribute("data-key");

    setSelectedTitle(id);
    setSelectedContent(option.target.value);
  };

  const handleImportDiary = () => {
    setTitle(selectedTitle);
    setContent(selectedContent);
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="text-gray-900 flex flex-col gap-y-2 mb-4">
      Select a diary to import the content!
      <select className="w-full px-4 py-2 border bg-white rounded-xl focus:ring-1 focus:ring-black" onChange={handleSelectChange}>
        <option value="none" selected disabled hidden>
          Select an Option
        </option>

        {diaries?.docs.map((x, index) => {
          return (
            <option value={x.data().diary || ""} key={index} data-key={x.id} onClick={() => handleSelectChange(x)}>
              {x.id}
            </option>
          );
        })}
      </select>
      <button
        className="border border-purple-500 bg-white text-purple-700 hover:bg-purple-400 hover:text-white w-24 h-10 py-2 px-4 rounded-3xl "
        type="submit"
        onClick={handleImportDiary}
      >
        Import
      </button>
    </div>
  );
};

const GoBack = () => {
  return (
    <Link to="/communities">
      <button className="mx-auto bg-white rounded-2xl hover:bg-gray-100">
        <BiArrowBack className="w-8 h-8 text-background" />
      </button>
    </Link>
  );
};
export { ChooseDiary, CommentPost, DeletePost, LikePost, Post, PostCard, CreatePostModal };
