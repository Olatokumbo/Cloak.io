import Carousel from "react-material-ui-carousel";
// import style from "./slideshow.module.css";

const Slideshow = ({ images }) => {
  return (
    <Carousel
      autoPlay={true}
      //   className={style.carouselItem}
      className="max-h-96 my-5"
      navButtonsAlwaysVisible={true}
      nav
      indicators={false}
      // animation="slide"

      timeout={500}
    >
      {/* {images.map((data, index) => ( */}
      <img key={8} className="h-full w-full" src="/wallpaper.jpg" alt="headerImages" />
      <img key={9} className="h-full w-full" src="/code.jpg" alt="headerImages" />
      {/* ))} */}
    </Carousel>
  );
};

export default Slideshow;
