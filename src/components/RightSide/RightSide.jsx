import React, { useState } from "react";
import HomeNotChecked from "../../image/homeNotChecked.png";
import HomeChecked from "../../image/homeChecked.png";
import Noti from "../../image/ringing.png";
import Chat from "../../image/chat.png";
import Settings from "../../image/gear.png";
import TrendCard from "../TrendCard/TrendCard";
import ShareModal from "../ShareModal/ShareModal";
import { Link } from "react-router-dom";
import "./RightSide.css";

const RightSide = ({ page }) => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="RightSide">
      <div className="navIcons">
        <Link  to="../home">
          {page === "Home" ? (
            <img title="Home" src={HomeChecked} alt="" />
          ) : (
            <img title="Home" src={HomeNotChecked} alt="" />
          )}
        </Link>
        <img title="Chat" src={Chat} alt="" />
        <img title="Notification" src={Noti} alt="" />
        <img title="Notification" src={Settings} alt="" />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
