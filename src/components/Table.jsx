import React, { useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import ExpandedRow from "./ExpandedRow";
import SearchForm from "./SearchForm";
import { fetchShipments, findTotalSize } from "./APIFunctions";

function Table() {
	const [shipments, setShipments] = useState([]);
	const [page, setPage] = useState(0);
	const [size, setSize] = useState(20);
	const [sort, setSort] = useState([]);

	const [status, setStatus] = useState("any");
	const [id, setId] = useState();
	const [customerId, setCustomerId] = useState();
	const [orderId, setOrderId] = useState();

	const [totalSize, setTotalSize] = useState(1000);
	const [expandedRows, setExpandedRows] = useState([]);

	const accessToken = "your-mock-access-token"; // Replace with your actual token

	useEffect(() => {
		const getContent = async () => {
			const sortParams = sort.join(",") ? sort.join(",") : "id";
			let response = await fetchShipments(
				accessToken,
				page,
				size,
				sortParams,
				id,
				customerId,
				orderId,
				status === "any" ? null : status
			);
			if (!Array.isArray(response)) {
				response = [response];
			}

			setShipments(response); // problem s async!!
		};
		const getLength = async () => {
			const length = await findTotalSize(
				accessToken,
				id,
				customerId,
				orderId,
				status
			);
			setTotalSize(length);
		};

		getContent();
		getLength();
	}, [page, size, sort, status, id, orderId, customerId]);

	const sizeDropDownItems = ["10", "20", "50", "100", "1000", "2000"];

	const toggleRow = (shipmentId) => {
		setExpandedRows((prev) =>
			prev.includes(shipmentId)
				? prev.filter((id) => id !== shipmentId)
				: [...prev, shipmentId]
		);
	};

	const updateSorting = (sortParam) => {
		setSort((prevSort) => {
			const existingIndex = prevSort.findIndex((s) => s.slice(1) === sortParam);

			if (existingIndex === -1) {
				// Parameter not in sort, add as ascending
				return [...prevSort, `+${sortParam}`];
			} else {
				const currentSort = prevSort[existingIndex];
				if (currentSort[0] === "+") {
					// If currently ascending, change to descending
					return [
						...prevSort.slice(0, existingIndex),
						`-${sortParam}`,
						...prevSort.slice(existingIndex + 1),
					];
				} else {
					// If currently descending, remove the parameter
					return [
						...prevSort.slice(0, existingIndex),
						...prevSort.slice(existingIndex + 1),
					];
				}
			}
		});
	};

	const renderSortingIndicator = (field) => {
		if (sort.includes(`+${field}`)) {
			return <span>&#9650;</span>; // Ascending indicator (up arrow)
		} else if (sort.includes(`-${field}`)) {
			return <span>&#9660;</span>; // Descending indicator (down arrow)
		} else {
			return null; // No sorting indicator
		}
	};

	const handleSubmit = (currentSearch, currentInput, currentStatus) => {
		setStatus(currentStatus);
		setId(null);
		setOrderId(null);
		setCustomerId(null);
		switch (currentSearch) {
			case "id":
				setId(currentInput);
				break;
			case "customerId":
				setCustomerId(currentInput);
				break;
			case "orderId":
				setOrderId(currentInput);
				break;
		}
		setPage(0);
	};

	return (
		<div>
			<SearchForm handleSubmit={handleSubmit} />
			<div className="size-filter-selector">
				<label>Show </label>
				<Dropdown
					title={size + " ▾"}
					items={sizeDropDownItems}
					onSelect={setSize}
				/>
				<label> results per page</label>
			</div>
			<table>
				<thead>
					<tr>
						<th colSpan={2} onClick={() => updateSorting("id")}>
							Shipment ID {renderSortingIndicator("id")}
						</th>
						<th onClick={() => updateSorting("orderId")}>
							Order ID {renderSortingIndicator("orderId")}
						</th>
						<th onClick={() => updateSorting("relatedCustomer.id")}>
							Customer ID {renderSortingIndicator("relatedCustomer.id")}
						</th>
						<th onClick={() => updateSorting("status")}>
							Status {renderSortingIndicator("status")}
						</th>
						<th onClick={() => updateSorting("carrier")}>
							Carrier {renderSortingIndicator("carrier")}
						</th>
						<th onClick={() => updateSorting("trackingCode")}>
							Tracking Code {renderSortingIndicator("trackingCode")}
						</th>
						<th onClick={() => updateSorting("estimatedDeliveryDate")}>
							Estimated Delivery Date{" "}
							{renderSortingIndicator("estimatedDeliveryDate")}
						</th>
						<th onClick={() => updateSorting("addressFrom.id")}>
							Address From {renderSortingIndicator("addressFrom.id")}
						</th>
						<th onClick={() => updateSorting("addressTo.id")}>
							Address To {renderSortingIndicator("addressTo.id")}
						</th>
					</tr>
				</thead>
				<tbody>
					{shipments[0] && !shipments[0].error ? (
						shipments.map((shipment) => {
							return (
								<>
									<tr key={shipment.id} onClick={() => toggleRow(shipment.id)}>
										{!expandedRows.includes(shipment.id) ? (
											<td className="col-icon">&#9656;</td>
										) : (
											<td className="col-icon">&#9662;</td>
										)}
										<td>{shipment.id}</td>
										<td>{shipment.order[0].id}</td>
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
						})
					) : (
						<p>No shipments</p>
					)}
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
					disabled={
						page + 1 === Math.ceil(totalSize / size) ||
						Math.ceil(totalSize / size) === 0
					}
					onClick={() => setPage((p) => p + 1)}>
					&gt;
				</button>
				<button
					disabled={
						page + 1 === Math.ceil(totalSize / size) ||
						Math.ceil(totalSize / size) === 0
					}
					onClick={() => setPage(Math.ceil(totalSize / size) - 1)}>
					&gt;|
				</button>
			</div>
		</div>
	);
}

export default Table;
