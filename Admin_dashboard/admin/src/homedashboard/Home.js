import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Home = () => {
  const headerStyle = {
    background: `linear-gradient(to right, #903233, #b43b48, #d84354)`,
    backgroundImage: "url('https://www.freewebheaders.com/wp-content/gallery/other-backgrounds/cache/pink-lonely-chair-website-header-design.jpg-nggid043968-ngg0dyn-1280x375x100-00f0w010c010r110f110r010t010.jpg')",
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Saans', sans-serif", 
  };

  const buttonStyle = {
    height: '150px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Saans', sans-serif", 
    transition: 'transform 0.3s ease', 
  };

  const footerStyle = {
    background: `linear-gradient(to right, #903233, #b43b48, #d84354)`,
    backgroundImage: "url('https://www.bates.edu/wordpress/files/2016/07/texture-23.jpg')",
    color: '#fff',
    textAlign: 'center',
    padding: '20px',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    fontFamily: "'Saans', sans-serif", 
  };

  const productDashboardImage = 'https://img.freepik.com/free-vector/futuristic-technology-infographic_23-2148462819.jpg';
  const couponsHostImage = 'https://img.freepik.com/premium-vector/gift-voucher-template-with-red-bow_95404-156.jpg?w=1060';

  return (
    <Container fluid>
     
      <Row>
        <Col style={headerStyle}>
          <h1>Nykaa Dashboard</h1>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Link to={"productdashboard"}>
          <Button
            variant="primary"
            className="w-100 btn-lg custom-button"
            style={{
              ...buttonStyle,
              backgroundImage: `url(${productDashboardImage})`,
            }}
          >
            Product Dashboard
          </Button>
          </Link>
        </Col>
        <Col md={6}>
          <Link to={"couponhost"}>
          <Button
            variant="primary"
            className="w-100 btn-lg custom-button"
            style={{
              ...buttonStyle,
              backgroundImage: `url(${couponsHostImage})`,
            }}
          >
            Coupons Host
          </Button>
          </Link>
        </Col>
      </Row>


      <Row className="mt-4">
      <Col style={footerStyle}>
          <p>Thank You..!</p>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
