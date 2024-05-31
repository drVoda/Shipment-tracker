import React, { useState } from "react";
import PropTypes from "prop-types";

function Dropdown({ title, items, onSelect }) {
	const [isOpen, setIsOpen] = useState(false);

	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	const handleSelect = (item) => {
		onSelect(item);
		setIsOpen(false); // Close the dropdown after selection
	};

	return (
		<div className="dropdown">
			<button onClick={toggleDropdown} className="dropbtn" type="button">
				{title}
			</button>
			{isOpen && (
				<div className="dropdown-content">
					{items.map((item, index) => (
						<a href="#" key={index} onClick={() => handleSelect(item)}>
							{item}
						</a>
					))}
				</div>
			)}
		</div>
	);
}

Dropdown.propTypes = {
	title: PropTypes.string.isRequired,
	items: PropTypes.arrayOf(PropTypes.string).isRequired,
	onSelect: PropTypes.func.isRequired,
};

export default Dropdown;
