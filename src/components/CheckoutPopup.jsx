import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const CheckoutPopup = ({ show, handleClose, cartItems, totalPrice }) => {
  const navigate = useNavigate();

  const handleConfirmPurchase = () => {
   

 navigate("/customerdetails");
 handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Checkout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="checkout-items">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="checkout-item d-flex align-items-center mb-3"
              style={{ borderBottom: "1px solid #ddd", paddingBottom: "10px" }}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="cart-item-image"
                style={{ width: "100px", height: "80px", objectFit: "cover", marginRight: "10px", borderRadius: "5px" }}
              />
              <div>
                <p style={{ fontWeight: "bold", marginBottom: "5px" }}>{item.name}</p>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>Quantity: {item.quantity}</p>
                <p style={{ margin: "0", fontSize: "0.9rem" }}>
                  Discount Price: <s>Rs {item.quantity * item.price * 1.5}</s>
                </p>
                <p style={{ fontSize: "1rem", fontWeight: "bold", color: "#d9534f" }}>
                  Total Price: Rs {item.price * item.quantity}
                </p>
              </div>
            </div>
          ))}
          <h5 className="text-center mt-3" style={{ fontSize: "1.4rem", fontWeight: "bold" }}>
            Grand Total: Rs {totalPrice}
          </h5>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="success" onClick={handleConfirmPurchase}>
          Confirm Purchase
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutPopup;
