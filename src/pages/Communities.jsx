import HomeNavbar from "../components/common/HomeNavbar";
import ReactGA from "react-ga4";
import { BsFillPlusSquareFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { PostCard, CreatePostModal, EditPostModal } from "../components/community/Post";
import { firestore } from "../firebase_setup/FirebaseConfig";
import { addDoc, collection, updateDoc, doc, serverTimestamp, deleteDoc } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import Loading from "./Loading";

const Communities = ({ user }) => {
  const [currentPost, setCurrentPost] = useState();
  const createPostModalState = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = createPostModalState;
  const editPostModalState = useState(false);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = editPostModalState;
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postsCollectionRef = collection(firestore, "community");
  const [posts, loading, error] = useCollection(postsCollectionRef);

  const openEditPost = (post) => {
    setCurrentPost(post);
    setIsEditPostModalOpen(true);
  };

  const handleCloseCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  const handleCloseEditPostModal = () => {
    setIsEditPostModalOpen(false);
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

  const handleEditPost = async (id, newTitle, newContent) => {
    await updateDoc(doc(firestore, "community", id), { title: newTitle, content: newContent });
  };

  useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: "/communities", title: "Communities Page" });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <div className="relative z-0 h-screen bg-primary-lightpink text-secondary-brown overflow-y-scroll">
      <HomeNavbar />
      <CreatePostModal
        openState={createPostModalState}
        handleClosePopup={handleCloseCreatePostModal}
        title={title}
        content={content}
        handleSubmitPost={handleSubmitPost}
        setTitle={setTitle}
        setContent={setContent}
      />
      {/* <EditPostModal
        openState={editPostModalState}
        post={currentPost}
        handleClosePopup={handleCloseEditPostModal}
        handleEditPost={handleEditPost}
      /> */}
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
            return (
              <PostCard
                key={index}
                user={user}
                post={post}
                // openEditPost={() => setIsEditPostModalOpen(true)}
                handleEditPost={handleEditPost}
              ></PostCard>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Communities;
