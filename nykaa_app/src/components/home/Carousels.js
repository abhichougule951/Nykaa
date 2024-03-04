import Carousel from 'react-bootstrap/Carousel';

function DarkVariantExample() {
  return (
   
    <Carousel data-bs-theme="dark" style={{marginBottom:'10px'}}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images-static.nykaa.com/uploads/e3f4098d-efd4-4595-a82b-3a3d28ddcaf7.jpg?tr=w-2400,cm-pad_resize"
          alt="First slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images-static.nykaa.com/uploads/553e1280-3a04-4302-b7ef-85efc3c914dd.jpg?tr=w-2400,cm-pad_resize"
          alt="Second slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images-static.nykaa.com/uploads/251f2229-ffc1-4d1a-b3cc-3979c12eb9f0.jpg?tr=w-2400,cm-pad_resize"
          alt="Third slide"
        />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default DarkVariantExample;