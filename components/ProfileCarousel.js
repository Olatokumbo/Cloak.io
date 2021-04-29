import Carousel from "react-material-ui-carousel";
// import style from "./slideshow.module.css";

const Slideshow = ({ images }) => {
  return (
    <Carousel
      autoPlay={true}
      //   className={style.carouselItem}
      navButtonsAlwaysVisible={true}
      nav
      indicators={true}
      // animation="slide"

      timeout={500}
    >
      {/* {images.map((data, index) => ( */}
      <img
        key={8}
        /*className={style.photo}*/ src="/wallpaper.jpg"
        alt="headerImages"
      />
      <img key={9} src="/code.jpg" alt="headerImages" />
      {/* ))} */}
    </Carousel>
  );
};

export default Slideshow;
