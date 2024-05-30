import React from "react";
import PropTypes from "prop-types";
import UserIcon from "./UserIcon";

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
