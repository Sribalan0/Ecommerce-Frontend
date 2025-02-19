import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CustomerDetails = () => {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({
    customerName: "",
    email: "",
    phone: "",
    address: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!customer.customerName || !customer.email || !customer.phone || !customer.address) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/customers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (!response.ok) {
        throw new Error("Failed to place order.");
      }

      alert("Order placed successfully!");
      navigate("/home");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while placing the order.");
    }
  };

  return (
    <div className="customer-details">
      <h2>Enter Your Details</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Customer Name</Form.Label>
          <Form.Control
            type="text"
            name="customerName"
            value={customer.customerName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={customer.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Phone</Form.Label>
          <Form.Control
            type="tel"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label style={{ color: "black", fontWeight: "bold" }}>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={customer.address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Place Order
        </Button>
      </Form>
    </div>
  );
};

export default CustomerDetails;
