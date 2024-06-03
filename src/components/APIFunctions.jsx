import axios from "axios";

let url = `http://localhost:8017/shipmentTracking/v1/shipmentTracking`;

/**
 * Fetches shipment data from the server.
 *
 * @param {string} accessToken - The access token for authorization.
 * @param {number} [page] - The page number for pagination.
 * @param {number} [size] - The number of records per page.
 * @param {string} [sortParams] - The sorting parameters.
 * @param {string} [id] - The ID of a specific shipment.
 * @param {string} [customerId] - The customer ID to filter shipments.
 * @param {string} [orderId] - The order ID to filter shipments.
 * @param {string} [status] - The status to filter shipments. Use "any" for no status filtering.
 * @returns {Promise<Object>} The shipment data.
 * @throws Will throw an error if the request fails.
 */
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

/**
 * Finds the total size of shipments based on the provided filters.
 *
 * @param {string} accessToken - The access token for authorization.
 * @param {string} [id] - The ID of a specific shipment.
 * @param {string} [customerId] - The customer ID to filter shipments.
 * @param {string} [orderId] - The order ID to filter shipments.
 * @param {string} [status] - The status to filter shipments.
 * @returns {Promise<number>} The total number of shipments.
 * @throws Will throw an error if the request fails.
 */
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

/**
 * Creates a new shipment.
 *
 * @param {string} accessToken - The access token for authorization.
 * @param {Object} shipment - The shipment data to be created.
 * @throws Will throw an error if the request fails.
 */
const createShipment = async (accessToken, shipment) => {
	try {
		const response = await axios.post(url, shipment, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				"Content-Type": "application/json",
			},
		});
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

export { fetchShipments, findTotalSize, createShipment };
