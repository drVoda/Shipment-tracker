import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

function Table() {
	const [shipments, setShipments] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(10);
	const [sort, setSort] = useState("trackingCode"); // Example sort parameter
	const [totalSize, setTotalSize] = useState(1000);

	const accessToken = "your-mock-access-token"; // Replace with your actual token

	const fetchShipments = async () => {
		const response = await fetch(
			`http://localhost:8017/shipmentTracking/v1/shipmentTracking?page=${page}&size=${size}&sort=${sort}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			}
		);
		const data = await response.json();
		setShipments(data);
	};

	useEffect(() => {
		async () => {
			const response = await fetch(
				`http://localhost:8017/shipmentTracking/v1/shipmentTracking`,
				{
					method: "GET",
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			const data = await response.json();
			setTotalSize(data.length);
		};
	}, []);

	useEffect(() => {
		fetchShipments();
	}, [page, size, sort]);

	const dropDownItems = ["5", "10", "20", "50", "100", "1000", "2000"];

	return (
		<div>
			<label>Size: </label>
			<Dropdown title={size} items={dropDownItems} onSelect={setSize} />
			<table>
				<tr>
					<th>Shipment ID</th>
					<th>Customer ID</th>
					<th>Status</th>
					<th>Carrier</th>
					<th>Tracking Code</th>
					<th>Estimated Delivery Date</th>
					<th>Address From</th>
					<th>Address To</th>
				</tr>
				{shipments.map((shipment) => (
					<tr key={shipment.id}>
						<td>{shipment.id}</td>
						<td>{shipment.relatedCustomer.id}</td>
						<td>{shipment.status}</td>
						<td>{shipment.carrier}</td>
						<td>{shipment.trackingCode}</td>
						<td>{shipment.estimatedDeliveryDate}</td>
						<td>
							{shipment.addressFrom.streetNr} {shipment.addressFrom.streetName}
							{", "}
							{shipment.addressFrom.city}
						</td>
						<td>
							{" "}
							{shipment.addressTo.streetNr} {shipment.addressTo.streetName}
							{", "}
							{shipment.addressTo.city}
						</td>
					</tr>
				))}
			</table>
			<div>
				<label>Page: {page + 1}</label>
				<button disabled={page === 0} onClick={() => setPage(0)}>
					|&lt;
				</button>
				<button disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
					&lt;
				</button>
				<button
					disabled={page + 1 === totalSize / size}
					onClick={() => setPage((p) => p + 1)}>
					&gt;
				</button>
				<button
					disabled={page + 1 === totalSize / size}
					onClick={() => setPage(totalSize / size - 1)}>
					&gt;|
				</button>
			</div>
		</div>
	);
}

export default Table;
