import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import ExpandedRow from "./ExpandedRow";

function Table() {
	const [shipments, setShipments] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(20);
	const [sort, setSort] = useState("trackingCode"); // Example sort parameter
	const [totalSize, setTotalSize] = useState(1000);
	const [expandedRows, setExpandedRows] = useState([]);

	const accessToken = "your-mock-access-token"; // Replace with your actual token

	const fetchShipments = async () => {
		try {
			const response = await axios.get(
				`http://localhost:8017/shipmentTracking/v1/shipmentTracking`,
				{
					params: {
						page: page,
						size: size,
						sort: sort,
					},
					headers: {
						Authorization: `Bearer ${accessToken}`,
						"Content-Type": "application/json",
					},
				}
			);
			const data = response.data;
			setShipments(data);
		} catch (error) {
			console.error("Error fetching shipments:", error);
		}
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

	const dropDownItems = ["10", "20", "50", "100", "1000", "2000"];

	const toggleRow = (shipmentId) => {
		setExpandedRows((prev) =>
			prev.includes(shipmentId)
				? prev.filter((id) => id !== shipmentId)
				: [...prev, shipmentId]
		);
	};

	return (
		<div>
			<div className="size-filter-selector">
				<label>Show </label>
				<Dropdown title={size} items={dropDownItems} onSelect={setSize} />
				<label> results per page</label>
			</div>
			<table>
				<thead>
					<tr>
						<th colSpan={2}>Shipment ID</th>
						<th>Customer ID</th>
						<th>Status</th>
						<th>Carrier</th>
						<th>Tracking Code</th>
						<th>Estimated Delivery Date</th>
						<th>Address From</th>
						<th>Address To</th>
					</tr>
				</thead>
				<tbody>
					{shipments.map((shipment) => {
						return (
							<>
								<tr key={shipment.id} onClick={() => toggleRow(shipment.id)}>
									{!expandedRows.includes(shipment.id) ? (
										<td className="col-icon">&#9656;</td>
									) : (
										<td className="col-icon">&#9662;</td>
									)}
									<td>{shipment.id}</td>
									<td>{shipment.relatedCustomer.id}</td>
									<td>{shipment.status}</td>
									<td>{shipment.carrier}</td>
									<td>{shipment.trackingCode}</td>
									<td>
										{new Date(
											shipment.estimatedDeliveryDate
										).toLocaleDateString()}
									</td>
									<td>
										{shipment.addressFrom.streetNr}{" "}
										{shipment.addressFrom.streetName}
										{", "}
										{shipment.addressFrom.city}
									</td>
									<td>
										{" "}
										{shipment.addressTo.streetNr}{" "}
										{shipment.addressTo.streetName}
										{", "}
										{shipment.addressTo.city}
									</td>
								</tr>
								{expandedRows.includes(shipment.id) ? (
									<ExpandedRow shipment={shipment} />
								) : null}
							</>
						);
					})}
				</tbody>
			</table>
			<div className="page-selector">
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
