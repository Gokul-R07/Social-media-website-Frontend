import React, { useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { uploadImage } from "../../actions/uploadAction";
import { updateUser } from "../../actions/userAction";
import { storage } from "../../firebase.js";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "./ProfileModal.css";

const ProfileModal = ({ modalOpened, setModalOpened, data }) => {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  //handleChange function
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //imageChange function
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === "profileImage"
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  //submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const filename = v4() + profileImage.name;
      const imageRef = ref(storage, `images/${filename}`);
      uploadBytes(imageRef, profileImage).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          UserData.profilePicture = url;
          await dispatch(updateUser(param.id, UserData));
        });
      });
    }
    if (coverImage) {
      const filename = v4() + coverImage.name;
      const imageRef = ref(storage, `images/${filename}`);
      uploadBytes(imageRef, coverImage).then(async (snapshot) => {
        await getDownloadURL(snapshot.ref).then(async (url) => {
          UserData.coverPicture = url;
          await dispatch(updateUser(param.id, UserData));
        });
      });
    }
    await dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      centered
      className="editSection"
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="auto"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="editForm" onSubmit={handleSubmit}>
        <h3>Your Info</h3>
        <div className="nameContainer">
          <input
            value={formData.firstname}
            onChange={handleChange}
            type="text"
            placeholder="First Name"
            name="firstname"
            className="infoInputs"
          />
          <input
            value={formData.lastname}
            onChange={handleChange}
            type="text"
            placeholder="Last Name"
            name="lastname"
            className="infoInputs"
          />
        </div>
        <div>
          <input
            data-autofocus
            value={formData.about}
            onChange={handleChange}
            type="text"
            placeholder="Introduce yourself"
            name="about"
            className="infoInputs"
          />
        </div>
        <div>
          <input
            value={formData.worksAt}
            onChange={handleChange}
            type="text"
            placeholder="Works at"
            name="worksAt"
            className="infoInputs"
          />
        </div>

        <div className="locationContainer">
          <input
            value={formData.livesin}
            onChange={handleChange}
            type="text"
            placeholder="Lives in"
            name="livesin"
            className="infoInputs"
          />
          <input
            value={formData.country}
            onChange={handleChange}
            type="text"
            placeholder="Country"
            name="country"
            className="infoInputs"
          />
        </div>

        <div>
          <input
            value={formData.relationship}
            onChange={handleChange}
            type="text"
            className="infoInputs"
            placeholder="Relationship status"
            name="relationship"
          />
        </div>

        <div className="uploadContainer">
          Profile image
          <input type="file" name="profileImage" onChange={onImageChange} />
          Cover image
          <input type="file" name="coverImage" onChange={onImageChange} />
        </div>

        <button className="button infoButton" type="submit">
          Update
        </button>
      </form>
    </Modal>
  );
};

export default ProfileModal;
