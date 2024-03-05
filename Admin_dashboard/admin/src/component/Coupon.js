import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Card, Form, Button } from 'react-bootstrap';

const Coupon = ({ onCouponSubmit }) => {
  const [couponCode, setCouponCode] = useState('');
  const [amount, setAmount] = useState('');
  const [timeInHours, setTimeInHours] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!couponCode || !amount || !timeInHours) {
      alert('Please fill in all fields');
      return;
    }
    if (amount>3000){
        alert('Standard coupon limit is less than 3000')
        return;
    }

    try {
     
      await axios.post('http://localhost:8080/api/coupons', {
        couponCode,
        amount: parseFloat(amount),
        timeInHours: parseInt(timeInHours, 10),
      });

 
      Swal.fire({
        icon: 'success',
        title: 'Coupon Posted Successfully!',
        text: `Coupon ${couponCode} has been posted successfully.`,
        showConfirmButton: false,
        timer: 7000, 
        toast: true,
        position: 'top-end',
        background: '#4CAF50', 
        timerProgressBar: true,
      });

  
      setCouponCode('');
      setAmount('');
      setTimeInHours('');
    } catch (error) {

      console.error('Error posting coupon:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error Posting Coupon',
        text: 'An error occurred while posting the coupon. Please try again.',
      });
    }
  };

  const cardStyle = {
    backgroundImage: "url('https://cdn.create.vista.com/api/media/medium/383365912/stock-photo-cropped-view-woman-holding-coupon-100-dollars-sign-white-background?token=')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '10px',
  };

  return (
    <Container className="mt-4">
      <Card className="shadow-sm" style={cardStyle}>
        <Card.Body>
          <Card.Title className="h2 mb-3 text-dark">Add Coupon</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="couponCode">
              <Form.Label className="text-light">Coupon Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Coupon Code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="amount">
              <Form.Label className="text-light">Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="timeInHours">
              <Form.Label className="text-light">Time in Hours</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter Time in Hours"
                value={timeInHours}
                onChange={(e) => setTimeInHours(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn-sm">
              Host Coupon
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Coupon;
