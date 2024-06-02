import React from "react";

function ExpandedRow({ shipment }) {
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
						</p>
					</div>
					<div className="expanded-column">
						<button className="submit-button">Edit order</button>
					</div>
				</div>
			</td>
		</tr>
	);
}
export default ExpandedRow;
