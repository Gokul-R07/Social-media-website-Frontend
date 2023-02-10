import React, { useEffect } from "react";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";
import "./Posts.css";

const Posts = ({ pageName }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [user.following]);

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  } else {
    posts = posts.filter((post) => post.userId !== user._id);
  }
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
      {posts.length === 0 && pageName === "Home" && (
        <h4>
          No posts are there.Click <i>Follow</i> button to view your friends
          posts...
        </h4>
      )}
      {posts.length === 0 && pageName === "Profile" && (
        <h4>
          No posts are there.Click <i>Share</i> button to share your moments...
        </h4>
      )}
    </div>
  );
};

export default Posts;
