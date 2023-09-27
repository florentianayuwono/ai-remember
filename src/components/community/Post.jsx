import InputForm from "../common/InputForm";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove, deleteDoc } from "firebase/firestore";
import { AiFillDelete, AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BiPencil, BiArrowBack, BiComment } from "react-icons/bi";
import { firestore } from "../../firebase_setup/FirebaseConfig";
import { Loading } from "../../pages";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDocument } from "react-firebase-hooks/firestore";

import HomeNavbar from "../common/HomeNavbar";
import { Comment } from "./Comment";

const Post = ({ user }) => {
  const { id } = useParams();
  const docRef = doc(firestore, "community", id);
  const [post, loading, error] = useDocument(docRef);

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
            <h1 className="text-sm">{post.data().author_name}</h1>
            <h2 className="text-xl font-semibold mb-2">{post.data().title}</h2>
            <p className="text-gray-600">{post.data().content}</p>
            <div className="flex gap-x-2">
              <LikePost post={post} user={user} />
              <CommentPost post={post} />
            </div>
          </div>
          <div>
            <DeletePost user={user} post={post} />
          </div>
        </div>
        <Comment user={user} post={post} />
      </div>
    </div>
  );
};

const PostCard = ({ post, user }) => {
  const editPostModalState = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = editPostModalState;
  const [title, setTitle] = useState(post.data().title);
  const [content, setContent] = useState(post.data().content);

  // const handleEditPost = async (id, newTitle, newContent) => {
  //   await updateDoc(postDoc, { title: newTitle, content: newContent });
  // };

  return (
    <>
      {/* <EditPostModal
        openState={editPostModalState}
        id={post.id}
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        handleClosePopup={() => setIsEditPostModalOpen(false)}
        handleEditPost={handleEditPost}
      /> */}
      <div className="mb-4 bg-white hover:bg-gray-100 rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm h-40 overflow-y-hidden flex justify-between">
        <div>
          <div className="flex flex-row gap-x-2 items-center text-sm">
            <h1>{post.data().author_name ?? "Anon"}</h1>
          </div>
          <Link to={`/post/${post.id}`}>
            <div className="w-full overflow-y-hidden text-ellipsis">
              <h2 className="text-xl h-8 font-semibold mb-1 ">{title}</h2>
              <p className="text-gray-600 h-12 overflow-y-hidden text-ellipsis ">{content}</p>
            </div>
          </Link>
          <div className="flex gap-x-2">
            <LikePost post={post} user={user} />
            <Link to={`/post/${post.id}`}>
              <CommentPost post={post} />
            </Link>
          </div>
        </div>
        <div>
          <DeletePost post={post} user={user} />
          {/* <BiPencil className="cursor-pointer w-6 h-6" onClick={() => setIsEditPostModalOpen(true)} /> */}
        </div>
      </div>
    </>
  );
};

const CreatePostModal = ({ openState, handleClosePopup, title, content, setTitle, setContent, handleSubmitPost }) => {
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

const GoBack = () => {
  return (
    <button className="mx-auto bg-white rounded-2xl">
      <BiArrowBack className="w-8 h-8 text-background group-hover:text-text" />
    </button>
  );
};
export { CommentPost, DeletePost, LikePost, Post, PostCard, CreatePostModal, EditPostModal };
