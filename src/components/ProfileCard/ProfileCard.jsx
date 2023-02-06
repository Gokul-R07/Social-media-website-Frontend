import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { data } from "../../defaultImages";
import "./ProfileCard.css";

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const posts = useSelector((state) => state.postReducer.posts);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverPicture ? user.coverPicture : data[0].defaultCoverImage
          }
          alt=""
        />
        <img
          className={user.profilePicture ? "box-shadow" : ""}
          src={
            user.profilePicture
              ? user.profilePicture
              : data[0].defaultProfileImage
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.about ? user.about : "- - - -(Bio)"}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>{user.followers.length}</span>
            <span>followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>{user.following.length}</span>
            <span>following</span>
          </div>
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>post</span>
              </div>
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "homePage" ? (
        <span>
          <Link
            style={{ textDecoration: "none", color: "inherit" }}
            to={`/profile/${user._id}`}
          >
            {" "}
            My Profile
          </Link>
        </span>
      ) : (
        ""
      )}
    </div>
  );
};

export default ProfileCard;
