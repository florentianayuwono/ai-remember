import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PostCard, CreatePostModal } from "../components/community/Post";
import { firestore } from "../firebase_setup/FirebaseConfig";
import { addDoc, collection, updateDoc, doc, serverTimestamp, deleteDoc, getDocs, query, orderBy } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "./Loading";

const Communities = ({ user }) => {
  const [currentPost, setCurrentPost] = useState();
  const createPostModalState = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = createPostModalState;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnon, setIsAnon] = useState(false);

  const postsCollectionRef = collection(firestore, "community");
  const [posts, loading, error] = useCollection(query(postsCollectionRef, orderBy("timestamp", "desc")));

  const handleCloseCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try {
      if (title !== "" && content !== "") {
        await addDoc(postsCollectionRef, {
          title,
          content,
          author_uid: user?.uid,
          author_name: user?.displayName,
          is_anon: isAnon,
          likes: [],
          comment_count: 0,
          timestamp: serverTimestamp(),
        });
        handleCloseCreatePostModal();
        setTitle("");
        setContent("");
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
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 h-screen bg-primary-lightpink text-secondary-brown overflow-y-scroll overflow-x-hidden">
      <HomeNavbar />
      <CreatePostModal
        user={user}
        openState={createPostModalState}
        handleClosePopup={handleCloseCreatePostModal}
        title={title}
        content={content}
        isAnon={isAnon}
        setTitle={setTitle}
        setContent={setContent}
        setIsAnon={setIsAnon}
        handleSubmitPost={handleSubmitPost}
      />

      <div className="absolute top-[120px] w-screen">
        <div
          className="bg-white rounded-lg shadow-xl p-4 mx-auto max-w-screen-sm max-h-64 flex flex-col items-center justify-center mb-10 cursor-pointer"
          onClick={() => setIsCreatePostModalOpen(true)}
        >
          Have something to share?
          <BsFillPlusSquareFill className="w-8 h-8 m-12" />
        </div>
        <div>
          {posts?.docs.map((post, index) => {
            return <PostCard key={index} user={user} post={post}></PostCard>;
          })}
        </div>
      </div>
    </div>
  );
};

export default Communities;
