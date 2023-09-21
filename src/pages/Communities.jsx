import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { BsFillPlusSquareFill } from "react-icons/bs";
import InputForm from "../components/common/InputForm";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import toast from "react-hot-toast";
import { firestore } from "../firebase_setup/FirebaseConfig";
import { getDocs, addDoc, collection } from "firebase/firestore";

const Communities = () => {
  const openState = useState(false);
  const [isOpen, setIsOpen] = openState;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [postList, setPostList] = useState([]);

  const postsCollectionRef = collection(firestore, "community");

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleSubmitPost = async () => {
    try {
      if (title !== "" && content !== "") {
        await addDoc(postsCollectionRef, { title, content });
        handleClosePopup();
        toast.success("Successful created post!");
      } else {
        toast.error("Title and content can't be empty!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/communities", title: "Communities Page" });
  }, [])

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);

  return (
    <div className="relative z-0 h-screen bg-primary-lightpink text-secondary-brown overflow-y-scroll">
      <HomeNavbar />
      <PostModal
        openState={openState}
        handleClosePopup={handleClosePopup}
        title={title}
        content={content}
        handleSubmitPost={handleSubmitPost}
        setTitle={setTitle}
        setContent={setContent}
      />
      <div className="absolute top-[120px] w-screen">
        <div
          className="bg-white rounded-lg shadow-xl p-4 mx-auto max-w-screen-md max-h-64 flex flex-col items-center justify-center mb-10"
          onClick={() => setIsOpen(true)}
        >
          Have something to share?
          <BsFillPlusSquareFill className="w-12 h-12" />
        </div>

        <div>
          {postList.map((post, index) => {
            return <PostCard key={index} title={post.title} content={post.content}></PostCard>;
          })}
        </div>
      </div>
    </div>
  );
};

const PostCard = ({ title, content }) => {
  return (
    // <></>
    <div className="mb-4 bg-white rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-32 overflow-y-hidden">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};

const PostModal = ({ openState, handleClosePopup, title, content, handleSubmitPost, setTitle, setContent }) => {
  const [isOpen, setIsOpen] = openState;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ${!isOpen && "opacity-0"}`} />
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={handleClosePopup}
          contentLabel="Post Modal"
          ariaHideApp={false}
          className="relative mx-auto transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div className="flex flex-col gap-x-4 max-w-sm sm:flex-wrap mx-auto my-10">
            <InputForm
              title="Title"
              value={title}
              htmlValue="title"
              handleChange={handleTitleChange}
              placeholder="Title for your post"
            />
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
export default Communities;
