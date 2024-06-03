import React from "react";
import PropTypes from "prop-types";
import UserIcon from "./UserIcon";

/**
 * Header component for displaying the page title and user information.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title to display in the header.
 * @returns {JSX.Element} The rendered component.
 */
function Header({ title }) {
	return (
		<div className="header">
			<h1 className="header-title">{title}</h1>
			<UserIcon username="John Smith" role="Administrator" />
		</div>
	);
}

Header.propTypes = {
	title: PropTypes.string.isRequired,
};

export default Header;
