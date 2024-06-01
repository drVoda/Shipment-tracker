import React, { useState } from "react";
import Dropdown from "./Dropdown";

function SearchForm({ handleSubmit }) {
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
		<form onSubmit={() => handleSubmit(currentSearch, currentInput, status)}>
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
		</form>
	);
}

export default SearchForm;
