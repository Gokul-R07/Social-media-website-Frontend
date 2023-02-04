import React, { useEffect } from "react";
import "./Posts.css";
import Post from "../Post/Post";
import { useSelector, useDispatch } from "react-redux";
import { getTimelinePosts } from "../../actions/postAction";
import { useParams } from "react-router-dom";

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, []);

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }
  else {
    posts = posts.filter((post) => post.userId !== user._id);
  }
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts...."
        : posts.map((post, id) => {
            return <Post data={post} key={id} />;
          })}
      {posts.length === 0 && (
        <h4>No posts are there.Click Share button to share your moments...</h4>
      )}
    </div>
  );
};

export default Posts;
