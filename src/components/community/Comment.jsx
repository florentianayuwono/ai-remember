import { arrayRemove, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../firebase_setup/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { useDocument } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { Loading } from "../../pages";
import { useEffect } from "react";
import InputForm from "../common/InputForm";

const Comment = ({ user, post }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const docRef = doc(firestore, "community", post.id);
  useEffect(() => {
    setComments(post.data().comments);
    console.log(comments);
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async (e) => {
    try {
      await updateDoc(docRef, {
        comments: arrayUnion({
          author_uid: user?.uid,
          author_name: user?.displayName,
          comment: comment,
          id: uuidv4(),
        }),
      });
      setComment("");
    } catch (err) {
      toast.error(err.message);
    }
  };

  // delete comment function
  const handleDeleteComment = (comment) => {
    console.log(comment);
    updateDoc(docRef, {
      comments: arrayRemove(comment),
    })
      .then((e) => {
        console.log(e);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-screen max-w-screen-sm mx-auto">
      Comments
      <div className="container">
        {comments?.map((cmt, index) => {
          console.log(cmt);
          return <CommentCard key={index} comment={cmt.comment} author_name={cmt.author_name} id={cmt.id}></CommentCard>;
        })}
      </div>
      <InputForm title="" value={comment} htmlValue="comment" handleChange={handleCommentChange} placeholder="Leave a comment" />
      <button
        className="bg-purple-500 hover:bg-purple-700 text-white w-24 h-10 py-2 px-4 rounded-3xl "
        type="submit"
        onClick={handleAddComment}
      >
        Post
      </button>
    </div>
  );
};

const CommentCard = ({ comment, author_name }) => {
  return (
    <>
      <div className="mb-4 bg-white hover:bg-gray-100 rounded-lg shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-32 overflow-y-hidden flex justify-between">
        <div>
          <div className="flex flex-row gap-x-2 items-center text-sm">
            <h1>{author_name}</h1>
          </div>
          <p className="text-gray-600">{comment}</p>
          {/* <LikePost post={post} user={user} /> */}
        </div>
        <div>
          {/* <DeletePost post={post} user={user} />
          <BiPencil className="cursor-pointer w-6 h-6" onClick={() => setIsEditPostModalOpen(true)} /> */}
        </div>
      </div>
    </>
  );
};

export { Comment, CommentCard };
