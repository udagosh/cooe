import "./Dashboard.css";
import {
  FaUser,
  FaCreditCard,
  FaEdit,
  FaGripLines,
  FaTasks,
  FaWallet,
  FaAddressCard
} from "react-icons/fa";
import { AiFillLock, AiTwotoneBank } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";
import FaqAccordion from "../../layout/elements/Accordion/accordion";
import React, { useState } from "react";

const ProfileNavItem = ({ name, icon, toggleId, setToggleId, accordionId }) => {
  const title = (
    <div className="profile-nav-item">
      <div className="profile-nav-item-content">
        {icon}
        <span>{name}</span>
      </div>
    </div>
  );
  return (
    <FaqAccordion
      accordionId={accordionId}
      setToggleId={setToggleId}
      toggleId={toggleId}
      title={title}
    >
      {" "}
      this is a accordion content
    </FaqAccordion>
  );
};

const Dashboard = () => {
  const [toggleId, setToggleId] = useState("");
  return (
    <div className="dashboard">
      <div className="profile-upper-sectiion">
        <div className="profile-top">
          <div className="profile-img">
            <FaUser />
          </div>
          <div className="profile-actions">
            <div className="profile-action">
              <FaCreditCard />
            </div>
            <div className="profile-action">
              <FaEdit />
            </div>
            <div className="profile-action">
              <FaGripLines />
            </div>
          </div>
        </div>
        <div className="profile">
          <div className="profile-details">
            <div className="profile-details-fields">
              <span className="field">Nickname</span>
              <span className="field">Mobile</span>
              <span className="field">Available balance</span>
            </div>
            <div className="profile-details-values">
              <span className="Value">91+ 7293930201</span>
              <span className="Value">James Bond</span>
              <span className="Value">$88</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-navigation-section">
        <ProfileNavItem
          name={"Orders"}
          icon={<FaTasks />}
          toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc1"
        />
        <ProfileNavItem
          name={"Wallet"}
          icon={<FaWallet />}
          toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc2"
        />
        <ProfileNavItem
          name={"Bank Card"}
          icon={<AiTwotoneBank />}
          toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc3"
        />
        <ProfileNavItem
          name={"Address"}
          icon={<FaAddressCard />}
          toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc4"
        />
        <ProfileNavItem
          name={"Account Security"}
          icon={<AiFillLock />}
          toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc5"
        />
        <ProfileNavItem
          name={"Complaints & Suggestions"}
          icon={<BiMessageDetail />}
          toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc5"
        />
        <ProfileNavItem name={"About"} icon={<BiMessageDetail />} toggleId={toggleId}
          setToggleId={setToggleId}
          accordionId="Acc5"/>
      </div>
    </div>
  );
};

export default Dashboard;
