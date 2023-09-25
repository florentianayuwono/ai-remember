import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PostCard, PostModal } from "../components/community/Post";
import { firestore } from "../firebase_setup/FirebaseConfig";
import { addDoc, collection, query, onSnapshot, doc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

const Communities = ({ user }) => {
  const openState = useState(false);
  const [isOpen, setIsOpen] = openState;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postsCollectionRef = collection(firestore, "community");
  const [posts, loading, error] = useCollection(postsCollectionRef);

  const handleClosePopup = () => {
    setIsOpen(false);
  };

  const handleSubmitPost = async (e) => {
    e.preventDefault();

    try {
      if (title !== "" && content !== "") {
        await addDoc(postsCollectionRef, {
          title,
          content,
          author_uid: user?.uid,
          // logo: user?.photoURL,
          // name: user?.displayName || userData?.name,
          // email: user?.email || userData?.email,
          timestamp: serverTimestamp(),
        });
        handleClosePopup();
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

  const handleDeletePost = async (id) => {
    const postDocRef = doc(firestore, "community", id);

    try {
      await deleteDoc(postDocRef);
      toast.success("Successfully deleted post!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/communities", title: "Communities Page" });
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
          className="bg-white rounded-lg shadow-xl p-4 mx-auto max-w-screen-md max-h-64 flex flex-col items-center justify-center mb-10 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          Have something to share?
          <BsFillPlusSquareFill className="w-8 h-8 m-12" />
        </div>

        <div>
          {posts?.docs.map((post, index) => {
            return (
              <PostCard
                key={index}
                user={user}
                title={post.data().title}
                content={post.data().content}
                post={post}
                id={post.data().id}
                handleDeletePost={handleDeletePost}
              ></PostCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Communities;
