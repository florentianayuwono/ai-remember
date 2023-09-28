import { addDoc, collection, deleteDoc, doc, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { firestore } from "../../firebase_setup/FirebaseConfig";
import { useCollection } from "react-firebase-hooks/firestore";
import toast from "react-hot-toast";
import { Loading } from "../../pages";
import InputForm from "../common/InputForm";
import { AiFillDelete } from "react-icons/ai";

const Comment = ({ user, post }) => {
  const [comment, setComment] = useState("");
  const postDocRef = doc(firestore, "community", post.id);
  const commentCollectionRef = collection(firestore, "community", post.id, "comments");
  const [comments, loading, error] = useCollection(query(commentCollectionRef, orderBy("timestamp")));

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = async () => {
    try {
      if (comment) {
        const curr_count = post.data().comment_count ?? 0;
        await addDoc(commentCollectionRef, {
          author_uid: user?.uid,
          author_name: user?.displayName,
          content: comment,
          timestamp: serverTimestamp(),
        });
        await updateDoc(postDocRef, { comment_count: curr_count + 1 });
        setComment("");
        toast.success("Successfully created comment!");
      } else {
        toast.error("Comment can't be empty!");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // delete comment function
  const handleDeleteComment = async (id) => {
    const docRef = doc(firestore, "community", post.id, "comments", id);
    try {
      const curr_count = post.data().comment_count ?? 0;
      await deleteDoc(docRef);
      await updateDoc(postDocRef, { comment_count: curr_count - 1 });
      toast.success("Successfully deleted comment!");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return loading ? (
    <Loading />
  ) : (
    <div className="w-screen max-w-screen-sm mx-auto">
      Comments
      <div>
        {comments?.docs.map((cmt, index) => {
          return (
            <>
              <CommentCard key={index} user={user} comment={cmt} handleDeleteComment={handleDeleteComment}></CommentCard>
            </>
          );
        })}
      </div>
      <InputForm title="" value={comment} htmlValue="comment" handleChange={handleCommentChange} placeholder="Leave a comment..." />
      <div className="flex justify-end">
        <button
          className="bg-purple-500 hover:bg-purple-700 text-white w-24 h-10 py-2 px-4 rounded-3xl "
          type="submit"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>
    </div>
  );
};

const CommentCard = ({ user, comment, handleDeleteComment }) => {
  return (
    <>
      <div className="mb-4 bg-white hover:bg-gray-100 rounded-xl shadow-xl p-4 mx-auto w-screen max-w-screen-sm max-h-40 overflow-y-auto flex justify-between">
        <div className="">
          <h1>{comment.data().author_name}</h1>
          <p className="text-xs">{new Date(comment.data().timestamp?.toDate())?.toLocaleString()}</p>
          <p className="text-gray-600">{comment.data().content}</p>
        </div>
        <div>
          {user?.uid === comment.data().author_uid ? (
            <AiFillDelete className="cursor-pointer w-6 h-6" onClick={() => handleDeleteComment(comment.id)} />
          ) : null}
        </div>
      </div>
    </>
  );
};

export { Comment, CommentCard };
