import React, { useState } from "react";
import PropTypes from "prop-types";

/**
 * Dropdown component for selecting an item from a list.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the dropdown.
 * @param {string[]} props.items - The list of items to display in the dropdown.
 * @param {function} props.onSelect - Callback function to execute when an item is selected.
 * @returns {JSX.Element} The rendered component.
 */
function Dropdown({ title, items, onSelect }) {
	const [isOpen, setIsOpen] = useState(false);

	/**
	 * Toggles the dropdown open or closed.
	 */
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	/**
	 * Handles the selection of an item.
	 *
	 * @param {string} item - The selected item.
	 */
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
