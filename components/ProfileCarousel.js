import Carousel from "react-material-ui-carousel";
// import style from "./slideshow.module.css";

const Slideshow = ({ images }) => {
  return (
    <Carousel
      autoPlay={true}
      //   className={style.carouselItem}
      className="max-h-screen my-5 relative"
      navButtonsAlwaysVisible={true}
      nav
      indicators={false}
      // animation="slide"

      timeout={500}
    >
      {images.map((data, index) => (
        <img
          key={index}
          className="h-full w-full"
          src={data}
          alt="headerImages"
        />
      ))}
    </Carousel>
  );
};

export default Slideshow;
