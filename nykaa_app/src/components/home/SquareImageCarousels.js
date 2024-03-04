import Carousel from "react-bootstrap/Carousel";

function SquareImageCarousel() {
  return (
    <Carousel
      data-bs-theme="dark"
      style={{
        marginBottom: "10px",
        backgroundColor: "rgb(243, 243, 243)", // Set your desired background color here
      }}
    >
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="https://images-static.nykaa.com/creatives/0100e1c9-cd7d-4ab7-bb4d-ce098935f135/default.jpg?tr=w-1200,cm-pad_resize"
          alt="Second slide"
          style={{ width: "300px", height: "300px" }}
        />
        <Carousel.Caption>{/* Your caption content */}</Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="https://images-static.nykaa.com/creatives/83054bd1-82ba-47b1-8745-26860c5530ce/default.png?tr=w-1200,cm-pad_resize"
          alt="Third slide"
          style={{ width: "300px", height: "300px" }}
        />
        <Carousel.Caption>{/* Your caption content */}</Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto"
          src="https://images-static.nykaa.com/creatives/d32fc330-f45b-4f07-9e54-d48f4e7149cf/default.jpg?tr=w-1200,cm-pad_resize"
          alt="Fourth slide"
          style={{ width: "300px", height: "300px" }}
        />
        <Carousel.Caption>{/* Your caption content */}</Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SquareImageCarousel;
