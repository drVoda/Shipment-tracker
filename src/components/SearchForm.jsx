import React, { useState } from "react";
import Dropdown from "./Dropdown";
import PropTypes from "prop-types";

/**
 * SearchForm component for searching shipments and adding new ones.
 *
 * @param {Object} props - The component props.
 * @param {function} props.handleSubmit - The function to call when the form is submitted.
 * @param {function} props.createHandle - The function to call when the add new shipment button is clicked.
 * @returns {JSX.Element} The rendered component.
 */
function SearchForm({ handleSubmit, createHandle }) {
	const [status, setStatus] = useState("any");
	const [currentSearch, setCurrentSearch] = useState("id");
	const [currentInput, setCurrentInput] = useState("");

	const searchDropDownItems = ["id", "customerId", "orderId"];
	const statusDropDownItems = [
		"any",
		"initialized",
		"inProcess",
		"processed",
		"shipped",
		"inCustoms",
		"delivered",
		"returned",
		"error",
	];

	return (
		<form
			onSubmit={() => handleSubmit(currentSearch, currentInput, status)}
			id="search-form">
			<div className="container">
				<div>
					<h4>What are you looking for?</h4>
					<input
						type="text"
						placeholder={"🔍 Enter " + currentSearch + "..."}
						value={currentInput}
						onChange={(e) => setCurrentInput(e.target.value)}
						className="search-field"
					/>
				</div>
				<div>
					<h4>Category</h4>
					<Dropdown
						title={currentSearch + " ▾"}
						items={searchDropDownItems}
						onSelect={setCurrentSearch}
					/>
				</div>
				<div>
					<h4>Status</h4>
					<Dropdown
						title={status + " ▾"}
						items={statusDropDownItems}
						onSelect={setStatus}
					/>
				</div>

				<button className="submit-button" type="submit">
					Search
				</button>
			</div>
			<div>
				<button className="submit-button" onClick={() => createHandle(1)}>
					Add new shipment
				</button>
			</div>
		</form>
	);
}

export default SearchForm;

SearchForm.PropTypes = {
	handleSubmit: PropTypes.func.isRequired,
	createHandle: PropTypes.func.isRequired,
};
