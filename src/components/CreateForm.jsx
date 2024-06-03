import React, { useState } from "react";
import { createShipment } from "./APIFunctions";
import PropTypes from "prop-types";

/**
 * CreateForm component for creating a new shipment.
 *
 * @param {Object} props - The component props.
 * @param {function} props.afterSubmit - Callback function to execute after form submission.
 * @returns {JSX.Element} The rendered component.
 */
function CreateForm({ afterSubmit }) {
	const [trackingCode, setTrackingCode] = useState("");
	const [weight, setWeight] = useState("");
	const [carrier, setCarrier] = useState("");
	const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(
		new Date().toISOString().substring(0, 10)
	);
	const [relatedCustomerId, setRelatedCustomerId] = useState("");
	const [relatedCustomerName, setRelatedCustomerName] = useState("");
	const [associatedOrderIDs, setAssociatedOrderIDs] = useState("");

	const [addressFromStreetNr, setAddressFromStreetNr] = useState("");
	const [addressFromStreetName, setAddressFromStreetName] = useState("");
	const [addressFromPostcode, setAddressFromPostcode] = useState("");
	const [addressFromCity, setAddressFromCity] = useState("");
	const [addressFromCountry, setAddressFromCountry] = useState("");

	const [addressToStreetNr, setAddressToStreetNr] = useState("");
	const [addressToStreetName, setAddressToStreetName] = useState("");
	const [addressToPostcode, setAddressToPostcode] = useState("");
	const [addressToCity, setAddressToCity] = useState("");
	const [addressToCountry, setAddressToCountry] = useState("");

	/**
	 * Handles parsing and formatting of order IDs.
	 *
	 * @returns {Object[]} An array of order objects.
	 */
	const handleOrders = () => {
		let orderIDs;
		if (associatedOrderIDs.search(",") < 0) {
			orderIDs = associatedOrderIDs.split(" ");
		} else {
			orderIDs = associatedOrderIDs.split(",");
		}
		let orders = [];
		for (let id of orderIDs) {
			let order = {};
			order.id = id;
			order.href = null;
			order.name = null;
			order.referredType = null;
			orders.push(order);
		}
		return orders;
	};

	/**
	 * Handles form submission and creates a new shipment.
	 * Fields which make sense to be filled on the backend are initialized to null.
	 *
	 * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
	 */
	const handleSubmit = (e) => {
		e.preventDefault();
		const addressFrom = {};
		const addressTo = {};
		const order = handleOrders();
		const relatedCustomer = {};
		const shipmentTracking = {};

		addressFrom.id = null;
		addressFrom.streetNr = addressFromStreetNr;
		addressFrom.streetName = addressFromStreetName;
		addressFrom.postcode = addressFromPostcode;
		addressFrom.city = addressFromCity;
		addressFrom.country = addressFromCountry;

		addressTo.id = null;
		addressTo.streetNr = addressToStreetNr;
		addressTo.streetName = addressToStreetName;
		addressTo.postcode = addressToPostcode;
		addressTo.city = addressToCity;
		addressTo.country = addressToCountry;

		relatedCustomer.id = relatedCustomerId;
		relatedCustomer.href =
			relatedCustomer.name =
			relatedCustomer.referredType =
				null;

		shipmentTracking.id = null;
		shipmentTracking.carrier = carrier;
		shipmentTracking.trackingCode = trackingCode;
		shipmentTracking.carrierTrackingUrl = null;
		shipmentTracking.trackingDate = new Date().toISOString().substring(0, 10);
		shipmentTracking.status = "initialized";
		shipmentTracking.statusChangeDate = new Date()
			.toISOString()
			.substring(0, 10);
		shipmentTracking.statusChangeReason = "Shipment created";
		shipmentTracking.weight = parseFloat(weight);
		shipmentTracking.estimatedDeliveryDate = estimatedDeliveryDate;
		shipmentTracking.addressFrom = addressFrom;
		shipmentTracking.addressTo = addressTo;
		shipmentTracking.order = order;
		shipmentTracking.relatedCustomer = relatedCustomer;
		shipmentTracking.createDate = new Date().toISOString().substring(0, 10);

		createShipment("mock-token", shipmentTracking);
		afterSubmit(0);
	};

	return (
		<form onSubmit={handleSubmit} id="create-form">
			<h2>General shipment information</h2>
			<div className="container">
				<div className="input-field">
					<h4>Customer name</h4>
					<input
						type="text"
						value={relatedCustomerName}
						onChange={(e) => setRelatedCustomerName(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Customer ID</h4>
					<input
						type="text"
						value={relatedCustomerId}
						onChange={(e) => setRelatedCustomerId(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Associated order IDs</h4>
					<input
						type="text"
						value={associatedOrderIDs}
						onChange={(e) => setAssociatedOrderIDs(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Carrier</h4>
					<input
						type="text"
						value={carrier}
						onChange={(e) => setCarrier(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Tracking Code</h4>
					<input
						type="text"
						value={trackingCode}
						onChange={(e) => setTrackingCode(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Weight</h4>
					<input
						type="number"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Estimated delivery date</h4>
					<input
						type="date"
						value={estimatedDeliveryDate}
						onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
						required
					/>
				</div>
			</div>
			<h2>Origin address</h2>
			<div className="container">
				<div className="input-field">
					<h4>Street number</h4>
					<input
						type="number"
						value={addressFromStreetNr}
						onChange={(e) => setAddressFromStreetNr(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Street name</h4>
					<input
						type="text"
						value={addressFromStreetName}
						onChange={(e) => setAddressFromStreetName(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Postcode</h4>
					<input
						type="number"
						value={addressFromPostcode}
						onChange={(e) => setAddressFromPostcode(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>City</h4>
					<input
						type="text"
						value={addressFromCity}
						onChange={(e) => setAddressFromCity(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Country</h4>
					<input
						type="text"
						value={addressFromCountry}
						onChange={(e) => setAddressFromCountry(e.target.value)}
						required
					/>
				</div>
			</div>
			<h2>Delivery address</h2>
			<div className="container">
				<div className="input-field">
					<h4>Street number</h4>
					<input
						type="number"
						value={addressToStreetNr}
						onChange={(e) => setAddressToStreetNr(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Street name</h4>
					<input
						type="text"
						value={addressToStreetName}
						onChange={(e) => setAddressToStreetName(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Postcode</h4>
					<input
						type="number"
						value={addressToPostcode}
						onChange={(e) => setAddressToPostcode(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>City</h4>
					<input
						type="text"
						value={addressToCity}
						onChange={(e) => setAddressToCity(e.target.value)}
						required
					/>
				</div>
				<div className="input-field">
					<h4>Country</h4>
					<input
						type="text"
						value={addressToCountry}
						onChange={(e) => setAddressToCountry(e.target.value)}
						required
					/>
				</div>
			</div>
			<button type="submit" className="submit-button">
				Submit
			</button>
		</form>
	);
}

export default CreateForm;

CreateForm.PropTypes = {
	handleOrders: PropTypes.func.isRequired,
};
