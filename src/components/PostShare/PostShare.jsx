import React, { useState, useRef } from "react";
import { UilScenery } from "@iconscout/react-unicons";
import { UilPlayCircle } from "@iconscout/react-unicons";
import { UilLocationPoint } from "@iconscout/react-unicons";
import { UilSchedule } from "@iconscout/react-unicons";
import { UilTimes } from "@iconscout/react-unicons";
import { useDispatch, useSelector } from "react-redux";
import { uploadPost } from "../../actions/uploadAction";
import { storage } from "../../firebase.js";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { data } from "../../defaultImages";
import "./PostShare.css";

const PostShare = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const imageRef = useRef();
  const { user } = useSelector((state) => state.authReducer.authData);
  const desc = useRef();
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (desc.current.value === "" || imageRef.current.value === "") {
      return;
    }
    if (image) {
      const description = desc.current.value;
      const filename = v4() + image.name;
      const imageRef = ref(storage, `images/${filename}`);
      uploadBytes(imageRef, image).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then((url) => {
          const newPost = {
            userId: user._id,
            image: url,
            username: user.username,
            desc: description,
          };
          dispatch(uploadPost(newPost));
        });
      });
    }

    reset();
  };
  return (
    <div className="PostShare">
      <img
        src={
          user.profilePicture
            ? user.profilePicture
            : data[0].defaultProfileImage
        }
        alt=""
      />
      <form>
        <input required type="text" placeholder="What's happening" ref={desc} />
        <div className="postOptions">
          <div
            className="option"
            style={{ color: "var(--photo)" }}
            onClick={() => imageRef.current.click()}
          >
            <UilScenery />
            Photos
          </div>
          <div className="option" style={{ color: "var(--video)" }}>
            <UilPlayCircle />
            Videos
          </div>
          <div className="option" style={{ color: "var(--location)" }}>
            <UilLocationPoint />
            Location
          </div>
          <div className="option" style={{ color: "var(--schedule)" }}>
            <UilSchedule />
            Schedule
          </div>
          <div></div>
          <button
            className="button ps-button"
            onClick={handleSubmit}
            type="submit"
          >
            Share
          </button>

          <div style={{ display: "none" }}>
            <input
              type="file"
              name="myImage"
              ref={imageRef}
              onChange={onImageChange}
            />
          </div>
        </div>
        {image && (
          <div className="previewImage">
            <UilTimes onClick={() => setImage(null)} />
            <img src={URL.createObjectURL(image)} alt="" />
          </div>
        )}
      </form>
    </div>
  );
};

export default PostShare;
