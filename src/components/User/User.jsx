import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/userAction";
import { data } from "../../defaultImages";
import "./User.css";

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
    window.location.reload();
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? person.profilePicture
              : data[0].defaultProfileImage
          }
          alt=""
          className="followerImage"
        />
      </div>
      <div className="name">
        <span>
          {person.firstname} {person.lastname}
        </span>
        <span>@{person.username}</span>
      </div>
      <button
        className={following ? "button  unFollowButton" : "button followButton"}
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
