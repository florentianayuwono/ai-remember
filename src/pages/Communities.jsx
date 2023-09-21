import HomeNavbar from "../components/common/HomeNavbar";
import { community_posts } from "../constants";
import { BsFillPlusSquareFill } from "react-icons/bs";
import InputForm from "../components/common/InputForm";
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { IoMdClose } from "react-icons/io";

import { firestore } from "../firebase_setup/FirebaseConfig";
import {
  getDocs,
  addDoc,
  collection,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

const Communities = () => {

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [postList, setPostList] = useState([]);

  const postsCollectionRef = collection(firestore, "community");
  const document = postsCollectionRef.id;

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmitPost = async (e) => {
    try {
      if (title !== "" && content !== "") {
        await addDoc(postsCollectionRef, { title, content });
        // await addDoc(postsCollectionRef, {
        //   documentId: document,
        //   uid: user.uid,
        //   name: user.name,

        //   title: title,
        //   content: content,
        //   timestamp: serverTimestamp(),
        // });
        await setDoc(postsCollectionRef);
      }
    } catch (err) {
      alert(err.message);
      console.log(err.message);
    }
  };

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPosts();
  }, []);
  return (
    <div className="relative z-0 h-screen bg-primary-lightpink text-secondary-brown">
      <HomeNavbar />
      <PostModal openState={openState} />
      <div className="absolute top-[120px]">
        <div
          className="bg-white rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-32 flex flex-col items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          Have something to share?
          <BsFillPlusSquareFill />
        </div>
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
        <button
          className=" bg-purple-500 hover:bg-purple-700 text-white w-full h-10 py-2 px-4 rounded-3xl my-6"
          type="submit"
          onClick={handleSubmitPost}
        >
          Submit
        </button>
        <ul className="list-none hidden sm:flex flex-col gap-10 items-center ">
          {postList.map((post) => (
            <li key={post.id} className="">
              <CommunityPost title={post.title} content={post.content} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CommunityPost = ({ title, content }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-32 overflow-y-hidden">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600">{content}</p>
    </div>
  );
};
export default Communities;
