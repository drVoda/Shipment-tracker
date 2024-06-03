import React from "react";
import PropTypes from "prop-types";
import userImage from "../images/user.png";

/**
 * UserIcon component for displaying user information.
 *
 * @param {Object} props - The component props.
 * @param {string} props.username - The username to display.
 * @param {string} props.role - The role of the user.
 * @returns {JSX.Element} The rendered component.
 */
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
