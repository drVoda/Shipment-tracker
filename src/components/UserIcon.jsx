import React from "react";
import PropTypes from "prop-types";
import userImage from "../images/user.png";

function UserIcon({ username, role }) {
	return (
		<div className="user-icon">
			<img src={userImage} alt="User" className="user-image" />
			<div className="user-info">
				<h3 className="user-name">{username}</h3>
				<p className="user-role">{role}</p>
			</div>
		</div>
	);
}

UserIcon.propTypes = {
	username: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
};

export default UserIcon;
