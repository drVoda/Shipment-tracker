import React from "react";

/**
 * ExpandedRow component for displaying detailed information about a shipment.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.shipment - The shipment data.
 * @param {string} props.shipment.carrierTrackingUrl - The URL for tracking the shipment with the carrier.
 * @param {string} props.shipment.trackingDate - The date when the shipment was tracked.
 * @param {string} props.shipment.statusChangeDate - The date when the shipment status was last changed.
 * @param {string} props.shipment.statusChangeReason - The reason for the last status change.
 * @param {number} props.shipment.weight - The weight of the shipment.
 * @param {Array} props.shipment.order - The order associated with the shipment.
 * @param {string} props.shipment.order[].name - The name of the order.
 * @param {string} props.shipment.order[].href - The link to the order details.
 * @param {Object} props.shipment.relatedCustomer - The related customer information.
 * @param {string} props.shipment.relatedCustomer.name - The name of the related customer.
 * @param {string} props.shipment.relatedCustomer.description - The description of the related customer.
 * @param {string} props.shipment.createDate - The date when the shipment was created.
 * @param {function} props.editHandle - The function to call when the edit button is clicked.
 * @returns {JSX.Element} The rendered component.
 */
function ExpandedRow({ shipment, editHandle }) {
	return (
		<tr className="expanded-row">
			<td colSpan="10">
				<div className="expanded-content">
					<div className="expanded-column">
						<p>
							<strong>Carrier Tracking URL:</strong>{" "}
							<a
								href={shipment.carrierTrackingUrl}
								target="_blank"
								rel="noopener noreferrer">
								{shipment.carrierTrackingUrl}
							</a>
						</p>
						<p>
							<strong>Tracking Date:</strong>{" "}
							{new Date(shipment.trackingDate).toLocaleDateString()}
						</p>
						<p>
							<strong>Status Change Date:</strong>{" "}
							{new Date(shipment.statusChangeDate).toLocaleDateString()}
						</p>
						<p>
							<strong>Status Change Reason:</strong>{" "}
							{shipment.statusChangeReason}
						</p>
						<p>
							<strong>Weight:</strong> {shipment.weight} kg
						</p>
					</div>
					<div className="expanded-column">
						<p>
							<strong>Order Name:</strong> {shipment.order[0].name}
						</p>
						<p>
							<strong>Order Link:</strong>{" "}
							<a
								href={shipment.order[0].href}
								target="_blank"
								rel="noopener noreferrer">
								{shipment.order[0].href}
							</a>
						</p>
						<p>
							<strong>Related Customer Name:</strong>{" "}
							{shipment.relatedCustomer.name}
						</p>
						<p>
							<strong>Customer Description:</strong>{" "}
							{shipment.relatedCustomer.description}
						</p>
						<p>
							<strong>Create Date:</strong>{" "}
							{new Date(shipment.createDate).toLocaleDateString()}
						</p>
					</div>
					<div className="expanded-column">
						<button className="submit-button" onClick={() => editHandle(1)}>
							Edit order
						</button>
					</div>
				</div>
			</td>
		</tr>
	);
}

export default ExpandedRow;
