import { useEffect, useState } from "react";

const useDisplayPhoto = (photos) => {
  const [display, setDisplay] = useState([]);
  
  useEffect(() => {
    setDisplay(photos.map((photo) => URL.createObjectURL(photo)));
  }, [photos]);


  return display;
};

export default useDisplayPhoto;
