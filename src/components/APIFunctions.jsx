import axios from "axios";

const fetchShipments = async (
	accessToken,
	page,
	size,
	sortParams,
	id,
	customerId,
	orderId,
	status
) => {
	try {
		let url = `http://localhost:8017/shipmentTracking/v1/shipmentTracking`;
		if (id) {
			url = `http://localhost:8017/shipmentTracking/v1/shipmentTracking/${id}`;
		}

		const response = await axios.get(url, {
			params: {
				page: page,
				size: size,
				sort: sortParams,
				id: id,
				customerId: customerId,
				orderId: orderId,
				status: status === "any" ? null : status,
			},
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});

		const data = response.data;
		return data;
	} catch (error) {
		console.error("Error fetching shipments:", error);
	}
};

const findTotalSize = async (accessToken, id, customerId, orderId, status) => {
	const response = await fetchShipments(
		accessToken,
		null,
		null,
		null,
		id,
		customerId,
		orderId,
		status
	);
	return response.length;
};

export { fetchShipments, findTotalSize };
