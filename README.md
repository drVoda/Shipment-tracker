# Shipment Tracking System

## Overview

This project is a Shipment Tracking System built with React. It allows users to manage shipments, view shipment details, and create new shipments.

## Features

- Display a list of shipments
- Search shipments by ID, customer ID, or order ID
- Filter shipments by status
- Sort shipments by various parameters
- View detailed information about each shipment
- Create new shipments

## Technologies Used

- React
- Axios
- PropTypes

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/shipment-tracking-system.git
   ```
2. Install dependencies:
   ```bash
   cd shipment-tracking-system
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Components

- **CreateForm:** Component for creating a new shipment.
- **Dropdown:** Dropdown component for selecting options.
- **ExpandedRow:** Component for displaying detailed information about a shipment.
- **Header:** Header component displaying the title and user information.
- **SearchForm:** Form component for searching and filtering shipments.
- **Table:** Component for displaying the list of shipments.
- **UserIcon:** Component for displaying user information with an icon.

## APIFunctions

- **fetchShipments:** Function for fetching shipments from the server.
- **findTotalSize:** Function for finding the total number of shipments.
