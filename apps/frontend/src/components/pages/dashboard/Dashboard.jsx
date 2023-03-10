import "./Dashboard.css";
import {
  FaUser,
  FaCreditCard,
  FaEdit,
  FaGripLines,
  FaTasks,
  FaWallet,
  FaAddressCard,
} from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { AiFillLock, AiTwotoneBank } from "react-icons/ai";
import { BiMessageDetail } from "react-icons/bi";

const ProfileNavItem = ({ name, icon }) => {
  return (
    <div className="profile-nav-item">
      <div className="profile-nav-item-content">
        {icon}
        <span>{name}</span>
      </div>
      <div className="profile-nested-menu">
        <div className="profile-nested-menu-icon">
          <GoTriangleDown />
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
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
        <ProfileNavItem name={"Orders"} icon={<FaTasks />} />
        <ProfileNavItem name={"Wallet"} icon={<FaWallet />} />
        <ProfileNavItem name={"Bank Card"} icon={<AiTwotoneBank />} />
        <ProfileNavItem name={"Address"} icon={<FaAddressCard />} />
        <ProfileNavItem name={"Account Security"} icon={<AiFillLock />} />
        <ProfileNavItem
          name={"Complaints & Suggestions"}
          icon={<BiMessageDetail />}
        />
        <ProfileNavItem name={"About"} icon={<BiMessageDetail />} />
      </div>
    </div>
  );
};

export default Dashboard;
