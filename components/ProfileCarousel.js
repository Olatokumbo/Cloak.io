import Carousel from "react-material-ui-carousel";
const Slideshow = ({ images }) => {
  return (
    <Carousel
      autoPlay={true}
      //   className={style.carouselItem}
      className="h-96 max-h-96 my-5 relative"
      navButtonsAlwaysVisible={true}
      nav
      indicators={false}
      // animation="slide"

      timeout={100}
    >
      {images.map((data, index) => (
        <img
          key={index}
          className="h-full w-full absolute object-cover"
          src={data}
          alt="headerImages"
        />
      ))}
    </Carousel>
  );
};

export default Slideshow;
