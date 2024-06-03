import React, { useState } from "react";
import Table from "./components/Table";
import Header from "./components/Header";
import CreateForm from "./components/CreateForm";

const App = () => {
	const [content, setContent] = useState(0);
	return (
		<>
			<Header title={content == 0 ? "Shipments" : "Create order"} />
			{content == 0 ? (
				<Table editCreateHandle={setContent} />
			) : (
				<CreateForm afterSubmit={setContent} />
			)}
		</>
	);
};

export default App;
